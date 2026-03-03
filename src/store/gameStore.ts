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
  removeFloatingText: (id: number) => void;
  dismissToast: (id: string) => void;
  newGame: () => void;
}

let floatingTextId = 0;

// Event probability per tick (100ms interval)
// Average 1 event every 60s = 1/600 per tick
const EVENT_CHANCE_PER_TICK = 1 / 600;
const MIN_EVENT_INTERVAL = 30; // seconds
let lastEventTime = 0;

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
  floatingTexts: [],
  toastQueue: [],
  pendingClickLoc: 0,
  displayedLOCps: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      click: (x?: number, y?: number) => {
        const state = get();
        const { clickDisabled, click: clickMult } = getEventMultiplier(state.activeEvent);
        if (clickDisabled) return;

        const clickVal = calculateClickValue(state) * clickMult;
        const newLoc = state.loc + clickVal;
        const newTotalLoc = state.totalLoc + clickVal;

        const floatingText: FloatingText = {
          id: floatingTextId++,
          value: `+${Math.floor(clickVal)}`,
          x: x ?? 50,
          y: y ?? 50,
        };

        set({
          loc: newLoc,
          totalLoc: newTotalLoc,
          totalClicks: state.totalClicks + 1,
          floatingTexts: [...state.floatingTexts, floatingText],
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

        // Calculate LOC production
        const { locps: locpsMult } = getEventMultiplier(activeEvent);
        const baseLOCps = calculateLOCps(state);

        // Legacy token auto-bonus (5% per token held) × purchased production bonuses
        const legacyUpgradeMult = LEGACY_UPGRADES.reduce((acc, u) => {
          if (u.effect.type === 'production_bonus' && state.legacyUpgrades.includes(u.id)) {
            return acc * u.effect.multiplier;
          }
          return acc;
        }, 1);
        const legacyMult = (1 + state.legacyTokens * 0.05) * legacyUpgradeMult;

        const locGained = baseLOCps * locpsMult * legacyMult * dt;
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
        });
      },

      buyProducer: (id: string) => {
        const state = get();
        const producer = PRODUCERS.find((p) => p.id === id);
        if (!producer) return;

        const owned = state.producers[id] ?? 0;
        const cost = producerCost(producer, owned);

        if (state.loc < cost) return;

        set({
          loc: state.loc - cost,
          producers: {
            ...state.producers,
            [id]: owned + 1,
          },
        });
      },

      buyUpgrade: (id: string) => {
        const state = get();
        const upgrade = UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.upgrades.includes(id)) return;
        if (state.loc < upgrade.cost) return;

        set({
          loc: state.loc - upgrade.cost,
          upgrades: [...state.upgrades, id],
        });
      },

      buyLegacyUpgrade: (id: string) => {
        const state = get();
        const upgrade = LEGACY_UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.legacyUpgrades.includes(id)) return;
        if (state.legacyTokens < upgrade.cost) return;

        set({
          legacyTokens: state.legacyTokens - upgrade.cost,
          legacyUpgrades: [...state.legacyUpgrades, id],
        });
      },

      prestige: () => {
        const state = get();
        if (state.totalLoc < 1000000) return;

        const tokensEarned = Math.max(0, Math.floor(Math.log10(state.totalLoc)) - 5);

        // Apply legacy upgrade effects to the new run's starting state
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

        set({
          ...DEFAULT_STATE,
          loc: startLoc,
          producers: startProducers,
          upgrades: keptUpgrades,
          legacyTokens: state.legacyTokens + tokensEarned,
          legacyUpgrades: state.legacyUpgrades,
          prestigeCount: state.prestigeCount + 1,
          productName: state.productName,
          achievements: state.achievements,
          activeEventTriggered: state.activeEventTriggered,
          negativeEventssurvived: state.negativeEventssurvived,
          lastSaveTime: Date.now(),
          floatingTexts: [],
          toastQueue: [],
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

      removeFloatingText: (id: number) => {
        set((state) => ({
          floatingTexts: state.floatingTexts.filter((f) => f.id !== id),
        }));
      },

      dismissToast: (id: string) => {
        set((state) => ({
          toastQueue: state.toastQueue.filter((t) => t.id !== id),
        }));
      },

      newGame: () => {
        set({ ...DEFAULT_STATE, productName: generateProductName(), lastSaveTime: Date.now() });
      },
    }),
    {
      name: 'push-to-prod-v1',
      // Don't persist UI-only state
      partialize: (state) => {
        const {
          floatingTexts: _ft,
          toastQueue: _tq,
          pendingClickLoc: _pc,
          displayedLOCps: _dl,
          ...rest
        } = state;
        return rest;
      },
    },
  ),
);
