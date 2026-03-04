import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENTS } from '@/data/achievements';
import { EVENTS, type GameEvent } from '@/data/events';
import { LEGACY_UPGRADES } from '@/data/legacyUpgrades';
import { PRODUCERS } from '@/data/producers';
import { generateProductName } from '@/data/socialPosts';
import { UPGRADES } from '@/data/upgrades';
import { producerCost } from '@/utils/costs';
import { calculateClickValue, calculateLOCps } from '@/utils/production';

export interface FloatingText {
  id: number;
  value: string;
  x: number;
  y: number;
  createdAt: number;
}

export interface ToastNotification {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface GameState {
  // Resources
  loc: number;
  totalLoc: number;
  locPerClick: number;
  legacyTokens: number;

  // Producers
  producers: Record<string, number>;

  // Upgrades (purchased IDs)
  upgrades: string[];

  // Legacy upgrades (purchased IDs — survive all resets)
  legacyUpgrades: string[];

  // Achievements (earned IDs)
  achievements: string[];

  // Events
  activeEvent: GameEvent | null;
  eventEndTime: number | null;
  activeEventTriggered: boolean;
  negativeEventssurvived: number;

  // Meta
  lastSaveTime: number;
  prestigeCount: number;
  totalClicks: number;
  productName: string;

  // Cached derived values — recomputed only when producers/upgrades/legacyUpgrades change
  cachedLOCps: number;
  cachedClickValue: number;
  cachedLegacyMult: number;

  // UI state (not persisted)
  floatingTexts: FloatingText[];
  toastQueue: ToastNotification[];
  pendingClickLoc: number; // click LOC accumulated since last tick
  displayedLOCps: number; // EMA-smoothed actual rate (passive + clicks)

  // Actions
  click: (x?: number, y?: number) => void;
  tick: (dt: number) => void;
  buyProducer: (id: string) => void;
  buyUpgrade: (id: string) => void;
  buyLegacyUpgrade: (id: string) => void;
  prestige: () => void;
  dismissEvent: () => void;
  addOfflineProgress: (loc: number) => void;
  dismissToast: (id: string) => void;
  newGame: () => void;
}

// ── Cache helpers ────────────────────────────────────────────────────────────

interface CacheInput {
  producers: Record<string, number>;
  upgrades: string[];
  locPerClick: number;
  legacyUpgrades: string[];
  legacyTokens: number;
}

function computeLegacyMult(legacyUpgrades: string[], legacyTokens: number): number {
  const upgradeMult = LEGACY_UPGRADES.reduce((acc, u) => {
    if (u.effect.type === 'production_bonus' && legacyUpgrades.includes(u.id)) {
      return acc * u.effect.multiplier;
    }
    return acc;
  }, 1);
  return (1 + legacyTokens * 0.05) * upgradeMult;
}

function computeCaches(s: CacheInput) {
  return {
    cachedLOCps: calculateLOCps(s),
    cachedClickValue: calculateClickValue(s),
    cachedLegacyMult: computeLegacyMult(s.legacyUpgrades, s.legacyTokens),
  };
}

// ── Module-level singletons ───────────────────────────────────────────────────

let floatingTextId = 0;
let lastFloatingTextTime = 0;
const FLOAT_THROTTLE_MS = 150; // max ~6 floating texts/sec during spam

// Event probability per tick (100ms interval)
// Average 1 event every 60s = 1/600 per tick
const EVENT_CHANCE_PER_TICK = 1 / 600;
const MIN_EVENT_INTERVAL = 30; // seconds
let lastEventTime = 0;

// ── Event multiplier ────────────────────────────────────────────────────────

function getEventMultiplier(event: GameEvent | null): {
  locps: number;
  click: number;
  clickDisabled: boolean;
} {
  if (!event) return { locps: 1, click: 1, clickDisabled: false };

  switch (event.effectType) {
    case 'locps_multiplier':
      return { locps: event.effectValue, click: 1, clickDisabled: false };
    case 'halt':
      return { locps: 0, click: 1, clickDisabled: false };
    case 'click_multiplier':
      return { locps: 1, click: event.effectValue, clickDisabled: false };
    case 'click_disabled':
      return { locps: 1, click: 0, clickDisabled: true };
    case 'loc_burst':
      return { locps: 1, click: 1, clickDisabled: false };
    default:
      return { locps: 1, click: 1, clickDisabled: false };
  }
}

// ── Default state ─────────────────────────────────────────────────────────────

const DEFAULT_STATE = {
  loc: 0,
  totalLoc: 0,
  locPerClick: 1,
  legacyTokens: 0,
  producers: {},
  upgrades: [],
  legacyUpgrades: [],
  achievements: [],
  activeEvent: null,
  eventEndTime: null,
  activeEventTriggered: false,
  negativeEventssurvived: 0,
  lastSaveTime: Date.now(),
  prestigeCount: 0,
  totalClicks: 0,
  productName: generateProductName(),
  cachedLOCps: 0,
  cachedClickValue: 1,
  cachedLegacyMult: 1,
  floatingTexts: [],
  toastQueue: [],
  pendingClickLoc: 0,
  displayedLOCps: 0,
};

// ── Store ─────────────────────────────────────────────────────────────────────

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      click: (x?: number, y?: number) => {
        const state = get();
        const { clickDisabled, click: clickMult } = getEventMultiplier(state.activeEvent);
        if (clickDisabled) return;

        const clickVal = state.cachedClickValue * clickMult;
        const newLoc = state.loc + clickVal;
        const newTotalLoc = state.totalLoc + clickVal;

        // Throttle visible floating texts — still count every click for LOC
        const now = Date.now();
        let floatingTexts = state.floatingTexts;
        if (now - lastFloatingTextTime >= FLOAT_THROTTLE_MS) {
          lastFloatingTextTime = now;
          floatingTexts = [
            ...floatingTexts,
            {
              id: floatingTextId++,
              value: `+${Math.floor(clickVal)}`,
              x: x ?? 50,
              y: y ?? 50,
              createdAt: now,
            },
          ];
        }

        set({
          loc: newLoc,
          totalLoc: newTotalLoc,
          totalClicks: state.totalClicks + 1,
          floatingTexts,
          pendingClickLoc: state.pendingClickLoc + clickVal,
        });
      },

      tick: (dt: number) => {
        const state = get();
        const now = Date.now();

        // Check event expiry
        let activeEvent = state.activeEvent;
        let eventEndTime = state.eventEndTime;
        let negativeEventssurvived = state.negativeEventssurvived;

        if (activeEvent && eventEndTime && now >= eventEndTime) {
          if (activeEvent.isNegative) {
            negativeEventssurvived += 1;
          }
          activeEvent = null;
          eventEndTime = null;
        }

        // Calculate LOC production using cached values
        const { locps: locpsMult } = getEventMultiplier(activeEvent);
        const locGained = state.cachedLOCps * locpsMult * state.cachedLegacyMult * dt;
        const newLoc = state.loc + locGained;
        const newTotalLoc = state.totalLoc + locGained;

        // Roll for new event
        let newActiveEvent = activeEvent;
        let newEventEndTime = eventEndTime;
        let activeEventTriggered = state.activeEventTriggered;

        const timeSinceLastEvent = (now - lastEventTime) / 1000;
        if (
          !activeEvent &&
          timeSinceLastEvent >= MIN_EVENT_INTERVAL &&
          Math.random() < EVENT_CHANCE_PER_TICK
        ) {
          newActiveEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
          newEventEndTime = now + newActiveEvent.duration * 1000;
          lastEventTime = now;
          activeEventTriggered = true;
        }

        // Check achievements
        const checkState = {
          totalLoc: newTotalLoc,
          loc: newLoc,
          producers: state.producers,
          upgrades: state.upgrades,
          totalClicks: state.totalClicks,
          negativeEventssurvived,
          prestigeCount: state.prestigeCount,
          activeEventTriggered,
        };

        const newAchievements = [...state.achievements];
        const newToasts = [...state.toastQueue];

        for (const achievement of ACHIEVEMENTS) {
          if (!newAchievements.includes(achievement.id) && achievement.condition(checkState)) {
            newAchievements.push(achievement.id);
            newToasts.push({
              id: achievement.id,
              name: achievement.name,
              description: achievement.description,
              icon: achievement.icon,
            });
          }
        }

        // EMA of actual LOC/s (passive + clicks this tick)
        const actualRate = (locGained + state.pendingClickLoc) / dt;
        const alpha = 0.85;
        const displayedLOCps = state.displayedLOCps * alpha + actualRate * (1 - alpha);

        // Clean up expired floating texts (avoids individual setTimeout per text)
        const floatingTexts =
          state.floatingTexts.length > 0
            ? state.floatingTexts.filter((f) => now - f.createdAt < 1000)
            : state.floatingTexts;

        set({
          loc: newLoc,
          totalLoc: newTotalLoc,
          activeEvent: newActiveEvent,
          eventEndTime: newEventEndTime,
          negativeEventssurvived,
          activeEventTriggered,
          achievements: newAchievements,
          toastQueue: newToasts,
          lastSaveTime: now,
          pendingClickLoc: 0,
          displayedLOCps,
          floatingTexts,
        });
      },

      buyProducer: (id: string) => {
        const state = get();
        const producer = PRODUCERS.find((p) => p.id === id);
        if (!producer) return;

        const owned = state.producers[id] ?? 0;
        const cost = producerCost(producer, owned);
        if (state.loc < cost) return;

        const newProducers = { ...state.producers, [id]: owned + 1 };
        const { cachedLOCps } = computeCaches({ ...state, producers: newProducers });

        set({ loc: state.loc - cost, producers: newProducers, cachedLOCps });
      },

      buyUpgrade: (id: string) => {
        const state = get();
        const upgrade = UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.upgrades.includes(id)) return;
        if (state.loc < upgrade.cost) return;

        const newUpgrades = [...state.upgrades, id];
        const { cachedLOCps, cachedClickValue } = computeCaches({ ...state, upgrades: newUpgrades });

        set({ loc: state.loc - upgrade.cost, upgrades: newUpgrades, cachedLOCps, cachedClickValue });
      },

      buyLegacyUpgrade: (id: string) => {
        const state = get();
        const upgrade = LEGACY_UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.legacyUpgrades.includes(id)) return;
        if (state.legacyTokens < upgrade.cost) return;

        const newLegacyTokens = state.legacyTokens - upgrade.cost;
        const newLegacyUpgrades = [...state.legacyUpgrades, id];
        const cachedLegacyMult = computeLegacyMult(newLegacyUpgrades, newLegacyTokens);

        set({ legacyTokens: newLegacyTokens, legacyUpgrades: newLegacyUpgrades, cachedLegacyMult });
      },

      prestige: () => {
        const state = get();
        if (state.totalLoc < 1000000) return;

        const tokensEarned = Math.max(0, Math.floor(Math.log10(state.totalLoc)) - 5);

        const startProducers: Record<string, number> = {};
        const keptUpgrades: string[] = [];
        let startLoc = 0;

        for (const legacyId of state.legacyUpgrades) {
          const lu = LEGACY_UPGRADES.find((u) => u.id === legacyId);
          if (!lu) continue;

          if (lu.effect.type === 'start_producer') {
            for (const { id, count } of lu.effect.producers) {
              startProducers[id] = (startProducers[id] ?? 0) + count;
            }
          } else if (lu.effect.type === 'start_loc') {
            startLoc += lu.effect.amount;
          } else if (lu.effect.type === 'keep_upgrade') {
            if (lu.effect.upgradeId === 'all-click') {
              for (const u of UPGRADES) {
                if (u.target === 'click' && state.upgrades.includes(u.id)) {
                  keptUpgrades.push(u.id);
                }
              }
            } else if (state.upgrades.includes(lu.effect.upgradeId)) {
              keptUpgrades.push(lu.effect.upgradeId);
            }
          }
        }

        const newLegacyTokens = state.legacyTokens + tokensEarned;
        const cacheInput: CacheInput = {
          producers: startProducers,
          upgrades: keptUpgrades,
          locPerClick: 1,
          legacyUpgrades: state.legacyUpgrades,
          legacyTokens: newLegacyTokens,
        };

        set({
          ...DEFAULT_STATE,
          loc: startLoc,
          producers: startProducers,
          upgrades: keptUpgrades,
          legacyTokens: newLegacyTokens,
          legacyUpgrades: state.legacyUpgrades,
          prestigeCount: state.prestigeCount + 1,
          productName: state.productName,
          achievements: state.achievements,
          activeEventTriggered: state.activeEventTriggered,
          negativeEventssurvived: state.negativeEventssurvived,
          lastSaveTime: Date.now(),
          floatingTexts: [],
          toastQueue: [],
          ...computeCaches(cacheInput),
        });
      },

      dismissEvent: () => {
        const state = get();
        const wasNegative = state.activeEvent?.isNegative ?? false;
        set({
          activeEvent: null,
          eventEndTime: null,
          negativeEventssurvived: wasNegative
            ? state.negativeEventssurvived + 1
            : state.negativeEventssurvived,
        });
      },

      addOfflineProgress: (loc: number) => {
        set((state) => ({
          loc: state.loc + loc,
          totalLoc: state.totalLoc + loc,
        }));
      },

      dismissToast: (id: string) => {
        set((state) => ({
          toastQueue: state.toastQueue.filter((t) => t.id !== id),
        }));
      },

      newGame: () => {
        set({
          ...DEFAULT_STATE,
          ...computeCaches(DEFAULT_STATE),
          productName: generateProductName(),
          lastSaveTime: Date.now(),
        });
      },
    }),
    {
      name: 'push-to-prod-v1',
      partialize: (state) => {
        const {
          floatingTexts: _ft,
          toastQueue: _tq,
          pendingClickLoc: _pc,
          displayedLOCps: _dl,
          cachedLOCps: _cl,
          cachedClickValue: _ccv,
          cachedLegacyMult: _clm,
          ...rest
        } = state;
        return rest;
      },
      // Recompute derived caches after loading from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          const caches = computeCaches(state);
          state.cachedLOCps = caches.cachedLOCps;
          state.cachedClickValue = caches.cachedClickValue;
          state.cachedLegacyMult = caches.cachedLegacyMult;
        }
      },
    },
  ),
);
