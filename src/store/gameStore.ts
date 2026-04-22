import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENTS } from '@/data/achievements';
import { ARCHITECTURE_UPGRADES } from '@/data/architectureUpgrades';
import { EVENTS, type GameEvent } from '@/data/events';
import { LEGACY_UPGRADES } from '@/data/legacyUpgrades';
import { PRODUCERS } from '@/data/producers';
import { generateProductName } from '@/data/socialPosts';
import { computeSynergyMult } from '@/data/synergies';
import { UPGRADES } from '@/data/upgrades';
import { producerBulkCost, producerCost } from '@/utils/costs';
import { formatLOC } from '@/utils/format';
import {
  calculateClickValue,
  calculateLOCps,
  calculateSingleProducerLOCps,
} from '@/utils/production';

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

export interface NestedDuck {
  id: string;
  producerId: string;
  storedLoc: number;
}

export type TechStack = 'typescript' | 'rust' | 'php' | 'blockchain';

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

  // Tech Stack prestige
  techStack: TechStack | null;
  pivotCount: number;

  // Great Refactor system
  greatRefactorCount: number;
  architecturePoints: number;
  architectureUpgrades: string[];
  totalLegacyTokensEverSpent: number;

  // Recursive Memory: peak LOC of the just-completed run (set before reset)
  lastRunPeakLoc: number;

  // Event-Driven: accumulated permanent production bonus (fraction, e.g. 0.05 = +5%)
  eventSurvivalProductionBonus: number;

  // Infinite Feedback Loop: permanent bonus accumulated from Great Refactors (+5% each)
  greatRefactorProductionBonus: number;

  // Duck nesting (unlocked by Nest Protocol architecture upgrade)
  nestedDucks: NestedDuck[];

  // Meta
  lastSaveTime: number;
  prestigeCount: number;
  clicksThisRun: number; // resets on prestige; gates re-prestige spamming
  totalClicks: number;
  productName: string;

  // Cached derived values — recomputed only when producers/upgrades/legacyUpgrades change
  cachedLOCps: number;
  cachedClickValue: number;
  cachedLegacyMult: number;

  // UI state (not persisted)
  floatingTexts: FloatingText[];
  toastQueue: ToastNotification[];
  pendingClickLoc: number;
  displayedLOCps: number;

  // Actions
  click: (x?: number, y?: number) => void;
  tick: (dt: number) => void;
  buyProducer: (id: string) => void;
  buyProducerBulk: (id: string, count: number) => void;
  buyUpgrade: (id: string) => void;
  buyLegacyUpgrade: (id: string) => void;
  buyArchitectureUpgrade: (id: string) => void;
  prestige: () => void;
  greatRefactor: () => void;
  pivot: (stack: TechStack) => void;
  dismissEvent: () => void;
  addOfflineProgress: (loc: number) => void;
  dismissToast: (id: string) => void;
  popNestedDuck: (id: string) => void;
  newGame: () => void;
  setLoc: (loc: number) => void;
  loadSave: (state: import('@/utils/save').PersistedState) => void;
}

// ── Cache helpers ────────────────────────────────────────────────────────────

interface CacheInput {
  producers: Record<string, number>;
  upgrades: string[];
  locPerClick: number;
  legacyUpgrades: string[];
  legacyTokens: number;
  architectureUpgrades?: string[];
  prestigeCount?: number;
  eventSurvivalProductionBonus?: number;
  greatRefactorProductionBonus?: number;
  greatRefactorCount?: number;
}

function computeLegacyMult(
  legacyUpgrades: string[],
  legacyTokens: number,
  architectureUpgrades: string[],
  prestigeCount: number,
  eventSurvivalProductionBonus: number,
  _greatRefactorProductionBonus: number, // kept for signature compat, no longer used
  greatRefactorCount: number,
  producers: Record<string, number> = {},
): number {
  const legacyUpgradeMult = LEGACY_UPGRADES.reduce((acc, u) => {
    if (u.effect.type === 'production_bonus' && legacyUpgrades.includes(u.id)) {
      return acc * u.effect.multiplier;
    }
    return acc;
  }, 1);

  const archUpgradeMult = ARCHITECTURE_UPGRADES.reduce((acc, u) => {
    if (u.effect.type === 'production_bonus' && architectureUpgrades.includes(u.id)) {
      return acc * u.effect.multiplier;
    }
    return acc;
  }, 1);

  // Compounding Interest: +2% per regular prestige
  const compoundingMult = architectureUpgrades.includes('compounding-interest')
    ? 1 + prestigeCount * 0.02
    : 1;

  // Event-Driven: permanent accumulated bonus
  const eventDrivenMult = 1 + eventSurvivalProductionBonus;

  // Built-in GR scaling: ×1.5 per GR by default, ×2 per GR with Infinite Feedback Loop
  // GR1=×1.5, GR2=×2.25, GR3=×3.375 — or ×2, ×4, ×8 with IFL
  const grPerMult = architectureUpgrades.includes('infinite-feedback-loop') ? 2.0 : 1.5;
  const grScaling = greatRefactorCount > 0 ? Math.pow(grPerMult, greatRefactorCount) : 1;

  // Synergy multiplier: activated by Synergy Protocol architecture upgrade
  const synergyMult = architectureUpgrades.includes('synergy-protocol')
    ? computeSynergyMult(producers, architectureUpgrades.includes('enhanced-synergies'))
    : 1;

  return (
    (1 + legacyTokens * 0.05) *
    legacyUpgradeMult *
    archUpgradeMult *
    compoundingMult *
    eventDrivenMult *
    grScaling *
    synergyMult
  );
}

function computeCaches(s: CacheInput) {
  const archUpgrades = s.architectureUpgrades ?? [];
  const prestige = s.prestigeCount ?? 0;
  const eventBonus = s.eventSurvivalProductionBonus ?? 0;
  const grBonus = s.greatRefactorProductionBonus ?? 0;
  const grCount = s.greatRefactorCount ?? 0;
  return {
    cachedLOCps: calculateLOCps(s),
    cachedClickValue: calculateClickValue(s),
    cachedLegacyMult: computeLegacyMult(
      s.legacyUpgrades,
      s.legacyTokens,
      archUpgrades,
      prestige,
      eventBonus,
      grBonus,
      grCount,
      s.producers,
    ),
  };
}

// ── Tech Stack helpers ────────────────────────────────────────────────────────

export function getStackMult(techStack: TechStack | null): { production: number; click: number } {
  switch (techStack) {
    case 'typescript':
      return { production: 1.3, click: 1.0 };
    case 'rust':
      return { production: 2.0, click: 1.0 };
    case 'php':
      return { production: 1.2, click: 3.0 };
    case 'blockchain':
      return { production: 1.5, click: 1.0 };
    default:
      return { production: 1.0, click: 1.0 };
  }
}

// ── Great Refactor helper ─────────────────────────────────────────────────────

function allLegacyBought(legacyUpgrades: string[]): boolean {
  return LEGACY_UPGRADES.filter((u) => !u.requiresSecondSystem).every((u) =>
    legacyUpgrades.includes(u.id),
  );
}

// ── Weighted event selection ──────────────────────────────────────────────────

function pickWeightedEvent(events: GameEvent[]): GameEvent {
  const totalWeight = events.reduce((sum, e) => sum + (e.weight ?? 1), 0);
  let r = Math.random() * totalWeight;
  for (const event of events) {
    r -= event.weight ?? 1;
    if (r <= 0) return event;
  }
  return events[events.length - 1];
}

// ── Module-level singletons ───────────────────────────────────────────────────

let floatingTextId = 0;
let lastFloatingTextTime = 0;
const FLOAT_THROTTLE_MS = 150;

const EVENT_CHANCE_PER_TICK = 1 / 600;
const MIN_EVENT_INTERVAL = 30;
let lastEventTime = 0;

// Autobuyer timers
let lastAutobuyProducerTime = 0;
let lastAutobuyUpgradeTime = 0;

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
    case 'ap_burst':
      return { locps: 1, click: 1, clickDisabled: false };
    default:
      return { locps: 1, click: 1, clickDisabled: false };
  }
}

// ── Prestige helpers ──────────────────────────────────────────────────────────

export function calcPrestigeThreshold(prestigeCount: number): number {
  return Math.round(10_000_000 * Math.pow(5, prestigeCount));
}

function calcPrestigeTokens(totalLoc: number, prestigeCount: number): number {
  return Math.max(0, Math.floor(Math.log10(totalLoc)) - 5) + Math.floor(prestigeCount / 2);
}

const LOOP_ERA_PRODUCER_IDS = [
  'the-process',
  'sentient-codebase',
  'duck-collective-llc',
  'recursive-self',
];
const BEYOND_ERA_PRODUCER_IDS = [
  'multiverse-compiler',
  'the-boardroom',
  'reality-engine',
  'the-final-push',
];

function buildStartState(
  legacyUpgrades: string[],
  upgrades: string[],
  architectureUpgrades: string[],
  lastRunPeakLoc: number,
  currentProducers: Record<string, number> = {},
) {
  const startProducers: Record<string, number> = {};
  const keptUpgrades: string[] = [];
  let startLoc = 0;

  for (const legacyId of legacyUpgrades) {
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
          if (u.target === 'click' && upgrades.includes(u.id)) {
            keptUpgrades.push(u.id);
          }
        }
      } else if (lu.effect.upgradeId === 'all-producer') {
        for (const u of UPGRADES) {
          if (u.target !== 'click' && u.target !== 'all' && upgrades.includes(u.id)) {
            keptUpgrades.push(u.id);
          }
        }
      } else if (upgrades.includes(lu.effect.upgradeId)) {
        keptUpgrades.push(lu.effect.upgradeId);
      }
    }
  }

  // Loop Inheritance (GR3): carry over Loop era producers on regular prestige
  if (architectureUpgrades.includes('loop-producer-inheritance')) {
    for (const id of LOOP_ERA_PRODUCER_IDS) {
      const count = currentProducers[id] ?? 0;
      if (count > 0) {
        startProducers[id] = (startProducers[id] ?? 0) + count;
      }
    }
  }

  // Beyond Inheritance (GR7): carry over Beyond era producers on regular prestige
  if (architectureUpgrades.includes('beyond-producer-inheritance')) {
    for (const id of BEYOND_ERA_PRODUCER_IDS) {
      const count = currentProducers[id] ?? 0;
      if (count > 0) {
        startProducers[id] = (startProducers[id] ?? 0) + count;
      }
    }
  }

  // Deep Recursion (GR2): start with 30% of previous run's peak LOC — supersedes Recursive Memory
  // Recursive Memory (base): start with 10% of previous run's peak LOC
  const memFraction = architectureUpgrades.includes('deep-recursion')
    ? 0.3
    : architectureUpgrades.includes('recursive-memory')
      ? 0.1
      : 0;
  if (memFraction > 0 && lastRunPeakLoc > 0) {
    startLoc += Math.floor(lastRunPeakLoc * memFraction);
  }

  return { startProducers, keptUpgrades, startLoc };
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
  techStack: null as TechStack | null,
  pivotCount: 0,
  greatRefactorCount: 0,
  architecturePoints: 0,
  architectureUpgrades: [] as string[],
  totalLegacyTokensEverSpent: 0,
  lastRunPeakLoc: 0,
  eventSurvivalProductionBonus: 0,
  greatRefactorProductionBonus: 0,
  nestedDucks: [] as NestedDuck[],
  lastSaveTime: Date.now(),
  prestigeCount: 0,
  clicksThisRun: 0,
  totalClicks: 0,
  productName: generateProductName(),
  cachedLOCps: 0,
  cachedClickValue: 1,
  cachedLegacyMult: 1,
  floatingTexts: [] as FloatingText[],
  toastQueue: [] as ToastNotification[],
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

        const { click: stackClickMult } = getStackMult(state.techStack);
        const clickVal = state.cachedClickValue * clickMult * stackClickMult;
        const newLoc = state.loc + clickVal;
        const newTotalLoc = state.totalLoc + clickVal;

        const now = Date.now();
        let floatingTexts = state.floatingTexts;
        if (now - lastFloatingTextTime >= FLOAT_THROTTLE_MS) {
          lastFloatingTextTime = now;
          floatingTexts = [
            ...floatingTexts,
            {
              id: floatingTextId++,
              value: `+${formatLOC(clickVal)}`,
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
          clicksThisRun: state.clicksThisRun + 1,
          floatingTexts,
          pendingClickLoc: state.pendingClickLoc + clickVal,
        });
      },

      tick: (dt: number) => {
        const state = get();
        const now = Date.now();

        // ── Event expiry ────────────────────────────────────────────────────────
        let activeEvent = state.activeEvent;
        let eventEndTime = state.eventEndTime;
        let negativeEventssurvived = state.negativeEventssurvived;
        let eventSurvivalProductionBonus = state.eventSurvivalProductionBonus;

        if (activeEvent && eventEndTime && now >= eventEndTime) {
          if (activeEvent.isNegative) {
            negativeEventssurvived += 1;
            // Event-Driven: accumulate +0.5% per survived negative event (cap at +200%)
            if (state.architectureUpgrades.includes('event-driven')) {
              eventSurvivalProductionBonus = Math.min(eventSurvivalProductionBonus + 0.005, 2.0);
            }
          }
          activeEvent = null;
          eventEndTime = null;
        }

        // ── LOC production ──────────────────────────────────────────────────────
        const { locps: locpsMult } = getEventMultiplier(activeEvent);
        const { production: stackProductionMult } = getStackMult(state.techStack);

        // Recompute legacy mult if eventSurvivalProductionBonus changed this tick
        const legacyMult =
          eventSurvivalProductionBonus !== state.eventSurvivalProductionBonus
            ? computeLegacyMult(
                state.legacyUpgrades,
                state.legacyTokens,
                state.architectureUpgrades,
                state.prestigeCount,
                eventSurvivalProductionBonus,
                state.greatRefactorProductionBonus,
                state.greatRefactorCount,
                state.producers,
              )
            : state.cachedLegacyMult;

        const locGained = state.cachedLOCps * locpsMult * legacyMult * stackProductionMult * dt;

        let newLoc = state.loc + locGained;
        let newTotalLoc = state.totalLoc + locGained;
        const newLastRunPeakLoc = Math.max(state.lastRunPeakLoc, newTotalLoc);

        // ── Duck nesting ────────────────────────────────────────────────────────
        let nestedDucks = state.nestedDucks;
        let nestedStolenTotal = 0;

        if (state.architectureUpgrades.includes('nest-protocol')) {
          const duckCount = state.producers['rubber-duck'] ?? 0;
          const maxNests = Math.min(5, Math.floor(duckCount / 50));

          // Spawn a new nested duck randomly (~1 per 8 minutes on average)
          if (nestedDucks.length < maxNests && duckCount >= 50 && Math.random() < 0.002) {
            const ownedIds = Object.entries(state.producers)
              .filter(([, count]) => count > 0)
              .map(([id]) => id);
            if (ownedIds.length > 0) {
              const targetId = ownedIds[Math.floor(Math.random() * ownedIds.length)];
              nestedDucks = [
                ...nestedDucks,
                {
                  id: `nd-${now}-${Math.random().toString(36).slice(2)}`,
                  producerId: targetId,
                  storedLoc: 0,
                },
              ];
            }
          }

          // Accumulate stolen LOC per nested duck
          if (nestedDucks.length > 0) {
            nestedDucks = nestedDucks.map((duck) => {
              const singleLOCps = calculateSingleProducerLOCps(duck.producerId, state);
              const stolen = singleLOCps * 0.08 * locpsMult * legacyMult * stackProductionMult * dt;
              nestedStolenTotal += stolen;
              return { ...duck, storedLoc: duck.storedLoc + stolen };
            });
            // Stolen LOC is removed from the player's gain
            newLoc -= nestedStolenTotal;
            newTotalLoc -= nestedStolenTotal;
            if (newLoc < state.loc) newLoc = state.loc;
            if (newTotalLoc < state.totalLoc) newTotalLoc = state.totalLoc;
          }
        }

        // ── Roll for new event ──────────────────────────────────────────────────
        let newActiveEvent = activeEvent;
        let newEventEndTime = eventEndTime;
        let activeEventTriggered = state.activeEventTriggered;
        let newArchitecturePoints = state.architecturePoints;

        const timeSinceLastEvent = (now - lastEventTime) / 1000;
        if (
          !activeEvent &&
          newTotalLoc >= 1000 &&
          timeSinceLastEvent >= MIN_EVENT_INTERVAL &&
          Math.random() < EVENT_CHANCE_PER_TICK
        ) {
          const hasProtocolBreach = state.architectureUpgrades.includes('protocol-breach');
          const eligibleEvents = EVENTS.filter((e) => {
            if (e.minLoc && newTotalLoc < e.minLoc) return false;
            if (e.requiresProtocolBreach && !hasProtocolBreach) return false;
            return true;
          });
          newActiveEvent = pickWeightedEvent(eligibleEvents);
          lastEventTime = now;
          activeEventTriggered = true;

          // Event Horizon: positive events last 2× longer
          const durationMult =
            !newActiveEvent.isNegative && state.architectureUpgrades.includes('event-horizon')
              ? 2
              : 1;
          newEventEndTime = now + newActiveEvent.duration * 1000 * durationMult;

          // Instant effects on fire
          if (newActiveEvent.effectType === 'loc_burst') {
            // Scale burst to 30s of current production (minimum the base effectValue)
            const burstAmount = Math.max(
              newActiveEvent.effectValue,
              Math.floor(state.cachedLOCps * legacyMult * stackProductionMult * 30),
            );
            newLoc += burstAmount;
            newTotalLoc += burstAmount;
          } else if (newActiveEvent.effectType === 'ap_burst') {
            newArchitecturePoints += newActiveEvent.effectValue;
          }
        }

        // ── Achievements ────────────────────────────────────────────────────────
        const checkState = {
          totalLoc: newTotalLoc,
          loc: newLoc,
          producers: state.producers,
          upgrades: state.upgrades,
          totalClicks: state.totalClicks,
          negativeEventssurvived,
          prestigeCount: state.prestigeCount,
          greatRefactorCount: state.greatRefactorCount,
          activeEventTriggered,
          techStack: state.techStack,
          pivotCount: state.pivotCount,
          architectureUpgrades: state.architectureUpgrades,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
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

        // ── EMA display rate ────────────────────────────────────────────────────
        const actualRate = (locGained - nestedStolenTotal + state.pendingClickLoc) / dt;
        const alpha = 0.85;
        const displayedLOCps = state.displayedLOCps * alpha + actualRate * (1 - alpha);

        const floatingTexts =
          state.floatingTexts.length > 0
            ? state.floatingTexts.filter((f) => now - f.createdAt < 1000)
            : state.floatingTexts;

        // ── Recache if event survival bonus changed ─────────────────────────────
        let updatedCachedLegacyMult =
          eventSurvivalProductionBonus !== state.eventSurvivalProductionBonus
            ? computeLegacyMult(
                state.legacyUpgrades,
                state.legacyTokens,
                state.architectureUpgrades,
                state.prestigeCount,
                eventSurvivalProductionBonus,
                state.greatRefactorProductionBonus,
                state.greatRefactorCount,
                state.producers,
              )
            : state.cachedLegacyMult;

        // ── Autobuyer: producers ────────────────────────────────────────────────
        let autobuyProducers = state.producers;
        let autobuyUpgrades = state.upgrades;
        let autobuyLoc = newLoc;
        let autobuyerBought = false;

        if (state.architectureUpgrades.includes('autobuyer-producers')) {
          const elapsed = (now - lastAutobuyProducerTime) / 1000;
          if (elapsed >= 2) {
            lastAutobuyProducerTime = now;
            let cheapestCost = Number.POSITIVE_INFINITY;
            let cheapestId = '';
            for (const producer of PRODUCERS) {
              if ((producer.unlockLoc ?? 0) > newTotalLoc) continue;
              if ((producer.unlockGreatRefactor ?? 0) > state.greatRefactorCount) continue;
              const owned = autobuyProducers[producer.id] ?? 0;
              const cost = producerCost(producer, owned);
              if (cost <= autobuyLoc && cost < cheapestCost) {
                cheapestCost = cost;
                cheapestId = producer.id;
              }
            }
            if (cheapestId) {
              const owned = autobuyProducers[cheapestId] ?? 0;
              autobuyProducers = { ...autobuyProducers, [cheapestId]: owned + 1 };
              autobuyLoc -= cheapestCost;
              autobuyerBought = true;
            }
          }
        }

        // ── Autobuyer: upgrades ─────────────────────────────────────────────────
        if (state.architectureUpgrades.includes('autobuyer-upgrades')) {
          const elapsed = (now - lastAutobuyUpgradeTime) / 1000;
          if (elapsed >= 5) {
            lastAutobuyUpgradeTime = now;
            let cheapestCost = Number.POSITIVE_INFINITY;
            let cheapestId = '';
            for (const upgrade of UPGRADES) {
              if (autobuyUpgrades.includes(upgrade.id)) continue;
              if (
                !upgrade.unlockCondition({
                  totalLoc: newTotalLoc,
                  producers: autobuyProducers,
                  upgrades: autobuyUpgrades,
                })
              )
                continue;
              if (upgrade.cost <= autobuyLoc && upgrade.cost < cheapestCost) {
                cheapestCost = upgrade.cost;
                cheapestId = upgrade.id;
              }
            }
            if (cheapestId) {
              autobuyUpgrades = [...autobuyUpgrades, cheapestId];
              autobuyLoc -= cheapestCost;
              autobuyerBought = true;
            }
          }
        }

        // ── Recompute caches if autobuyer changed state ─────────────────────────
        let finalCachedLOCps = state.cachedLOCps;
        let finalCachedClickValue = state.cachedClickValue;
        if (autobuyerBought) {
          const caches = computeCaches({
            ...state,
            producers: autobuyProducers,
            upgrades: autobuyUpgrades,
          });
          finalCachedLOCps = caches.cachedLOCps;
          finalCachedClickValue = caches.cachedClickValue;
          updatedCachedLegacyMult = caches.cachedLegacyMult;
        }

        set({
          loc: autobuyLoc,
          totalLoc: newTotalLoc,
          lastRunPeakLoc: newLastRunPeakLoc,
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
          nestedDucks,
          eventSurvivalProductionBonus,
          architecturePoints: newArchitecturePoints,
          cachedLegacyMult: updatedCachedLegacyMult,
          ...(autobuyerBought
            ? {
                producers: autobuyProducers,
                upgrades: autobuyUpgrades,
                cachedLOCps: finalCachedLOCps,
                cachedClickValue: finalCachedClickValue,
              }
            : {}),
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

      buyProducerBulk: (id: string, count: number) => {
        const state = get();
        const producer = PRODUCERS.find((p) => p.id === id);
        if (!producer) return;

        const owned = state.producers[id] ?? 0;
        const totalCost = producerBulkCost(producer, owned, count);
        if (state.loc < totalCost) return;

        const newProducers = { ...state.producers, [id]: owned + count };
        const { cachedLOCps } = computeCaches({ ...state, producers: newProducers });

        set({ loc: state.loc - totalCost, producers: newProducers, cachedLOCps });
      },

      buyUpgrade: (id: string) => {
        const state = get();
        const upgrade = UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.upgrades.includes(id)) return;
        if (state.loc < upgrade.cost) return;

        const newUpgrades = [...state.upgrades, id];
        const { cachedLOCps, cachedClickValue } = computeCaches({
          ...state,
          upgrades: newUpgrades,
        });

        set({
          loc: state.loc - upgrade.cost,
          upgrades: newUpgrades,
          cachedLOCps,
          cachedClickValue,
        });
      },

      buyLegacyUpgrade: (id: string) => {
        const state = get();
        const upgrade = LEGACY_UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.legacyUpgrades.includes(id)) return;

        // Fast Learner: 20% token discount (minimum 1)
        const discount = state.architectureUpgrades.includes('fast-learner') ? 0.8 : 1.0;
        const effectiveCost = Math.max(1, Math.floor(upgrade.cost * discount));
        if (state.legacyTokens < effectiveCost) return;

        const newLegacyTokens = state.legacyTokens - effectiveCost;
        const newLegacyUpgrades = [...state.legacyUpgrades, id];
        const newTotalSpent = state.totalLegacyTokensEverSpent + effectiveCost;
        const cachedLegacyMult = computeLegacyMult(
          newLegacyUpgrades,
          newLegacyTokens,
          state.architectureUpgrades,
          state.prestigeCount,
          state.eventSurvivalProductionBonus,
          state.greatRefactorProductionBonus,
          state.greatRefactorCount,
          state.producers,
        );

        set({
          legacyTokens: newLegacyTokens,
          legacyUpgrades: newLegacyUpgrades,
          totalLegacyTokensEverSpent: newTotalSpent,
          cachedLegacyMult,
        });
      },

      buyArchitectureUpgrade: (id: string) => {
        const state = get();
        const upgrade = ARCHITECTURE_UPGRADES.find((u) => u.id === id);
        if (!upgrade) return;
        if (state.architectureUpgrades.includes(id)) return;
        if (state.architecturePoints < upgrade.cost) return;
        if ((upgrade.requiresGreatRefactor ?? 0) > state.greatRefactorCount) return;

        const newArchUpgrades = [...state.architectureUpgrades, id];
        const newArchPoints = state.architecturePoints - upgrade.cost;
        const caches = computeCaches({
          ...state,
          architectureUpgrades: newArchUpgrades,
        });

        set({
          architecturePoints: newArchPoints,
          architectureUpgrades: newArchUpgrades,
          ...caches,
        });
      },

      prestige: () => {
        const state = get();
        if (state.totalLoc < calcPrestigeThreshold(state.prestigeCount)) return;

        const baseTokens = calcPrestigeTokens(state.totalLoc, state.prestigeCount);
        const bonusTokens = state.architectureUpgrades.includes('token-proliferation') ? 1 : 0;
        const tokensEarned = baseTokens + bonusTokens;
        const { startProducers, keptUpgrades, startLoc } = buildStartState(
          state.legacyUpgrades,
          state.upgrades,
          state.architectureUpgrades,
          state.lastRunPeakLoc,
          state.producers,
        );

        const newLegacyTokens = state.legacyTokens + tokensEarned;
        const newPrestigeCount = state.prestigeCount + 1;
        // Prestige AP Dividend (GR2): each regular prestige grants +1 AP
        const apGain = state.architectureUpgrades.includes('prestige-ap-dividend') ? 1 : 0;
        const cacheInput: CacheInput = {
          producers: startProducers,
          upgrades: keptUpgrades,
          locPerClick: 1,
          legacyUpgrades: state.legacyUpgrades,
          legacyTokens: newLegacyTokens,
          architectureUpgrades: state.architectureUpgrades,
          prestigeCount: newPrestigeCount,
          eventSurvivalProductionBonus: state.eventSurvivalProductionBonus,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
          greatRefactorCount: state.greatRefactorCount,
        };

        set({
          ...DEFAULT_STATE,
          loc: startLoc,
          producers: startProducers,
          upgrades: keptUpgrades,
          legacyTokens: newLegacyTokens,
          legacyUpgrades: state.legacyUpgrades,
          prestigeCount: newPrestigeCount,
          clicksThisRun: 0,
          productName: state.productName,
          achievements: state.achievements,
          totalClicks: state.totalClicks,
          activeEventTriggered: state.activeEventTriggered,
          negativeEventssurvived: state.negativeEventssurvived,
          techStack: state.techStack,
          pivotCount: state.pivotCount,
          greatRefactorCount: state.greatRefactorCount,
          architecturePoints: state.architecturePoints + apGain,
          architectureUpgrades: state.architectureUpgrades,
          totalLegacyTokensEverSpent: state.totalLegacyTokensEverSpent,
          lastRunPeakLoc: state.lastRunPeakLoc,
          eventSurvivalProductionBonus: state.eventSurvivalProductionBonus,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
          nestedDucks: [],
          lastSaveTime: Date.now(),
          floatingTexts: [],
          toastQueue: [],
          ...computeCaches(cacheInput),
        });
      },

      greatRefactor: () => {
        const state = get();
        if (!allLegacyBought(state.legacyUpgrades)) return;
        // After the first Great Refactor, prestige requirements decrease
        const requiredPrestiges = Math.max(1, 3 - state.greatRefactorCount);
        if (state.prestigeCount < requiredPrestiges) return;

        const apGainMult = state.architectureUpgrades.includes('ap-multiplier') ? 2 : 1;
        const apEarned = Math.max(2, 3 + state.greatRefactorCount * 2) * apGainMult;
        const newGreatRefactorCount = state.greatRefactorCount + 1;
        const newArchitecturePoints = state.architecturePoints + apEarned;

        // Legacy token carry-over: 0% on first GR, +10% per subsequent GR (max 50%)
        // GR1→2: 10%, GR2→3: 20%, GR3→4: 30%, GR4→5+: 40-50%
        const carryFraction = Math.min(0.5, state.greatRefactorCount * 0.1);
        const carriedTokens = Math.floor(state.legacyTokens * carryFraction);

        const cacheInput: CacheInput = {
          producers: {},
          upgrades: [],
          locPerClick: 1,
          legacyUpgrades: [],
          legacyTokens: carriedTokens,
          architectureUpgrades: state.architectureUpgrades,
          prestigeCount: 0,
          eventSurvivalProductionBonus: state.eventSurvivalProductionBonus,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
          greatRefactorCount: newGreatRefactorCount,
        };

        set({
          ...DEFAULT_STATE,
          legacyTokens: carriedTokens,
          greatRefactorCount: newGreatRefactorCount,
          architecturePoints: newArchitecturePoints,
          architectureUpgrades: state.architectureUpgrades,
          totalLegacyTokensEverSpent: state.totalLegacyTokensEverSpent,
          achievements: state.achievements,
          totalClicks: state.totalClicks,
          clicksThisRun: 0,
          negativeEventssurvived: state.negativeEventssurvived,
          activeEventTriggered: state.activeEventTriggered,
          eventSurvivalProductionBonus: state.eventSurvivalProductionBonus,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
          techStack: state.techStack,
          pivotCount: state.pivotCount,
          productName: state.productName,
          lastRunPeakLoc: 0,
          nestedDucks: [],
          lastSaveTime: Date.now(),
          floatingTexts: [],
          toastQueue: [],
          ...computeCaches(cacheInput),
        });
      },

      pivot: (stack: TechStack) => {
        const state = get();
        if (state.prestigeCount < 5) return;

        const baseTokens = Math.max(
          0,
          Math.floor(Math.log10(Math.max(state.totalLoc, 1000000))) - 5,
        );
        const bonusTokens = state.architectureUpgrades.includes('token-proliferation') ? 1 : 0;
        const tokensEarned = baseTokens + bonusTokens;

        const { startProducers, keptUpgrades, startLoc } = buildStartState(
          state.legacyUpgrades,
          state.upgrades,
          state.architectureUpgrades,
          state.lastRunPeakLoc,
          state.producers,
        );

        const newLegacyTokens = state.legacyTokens + tokensEarned;
        const newPrestigeCount = state.prestigeCount + 1;
        // Prestige AP Dividend (GR2): pivot counts as a prestige for AP purposes
        const apGain = state.architectureUpgrades.includes('prestige-ap-dividend') ? 1 : 0;
        const cacheInput: CacheInput = {
          producers: startProducers,
          upgrades: keptUpgrades,
          locPerClick: 1,
          legacyUpgrades: state.legacyUpgrades,
          legacyTokens: newLegacyTokens,
          architectureUpgrades: state.architectureUpgrades,
          prestigeCount: newPrestigeCount,
          eventSurvivalProductionBonus: state.eventSurvivalProductionBonus,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
          greatRefactorCount: state.greatRefactorCount,
        };

        set({
          ...DEFAULT_STATE,
          loc: startLoc,
          producers: startProducers,
          upgrades: keptUpgrades,
          legacyTokens: newLegacyTokens,
          legacyUpgrades: state.legacyUpgrades,
          prestigeCount: newPrestigeCount,
          clicksThisRun: 0,
          productName: state.productName,
          achievements: state.achievements,
          totalClicks: state.totalClicks,
          activeEventTriggered: state.activeEventTriggered,
          negativeEventssurvived: state.negativeEventssurvived,
          techStack: stack,
          pivotCount: state.pivotCount + 1,
          greatRefactorCount: state.greatRefactorCount,
          architecturePoints: state.architecturePoints + apGain,
          architectureUpgrades: state.architectureUpgrades,
          totalLegacyTokensEverSpent: state.totalLegacyTokensEverSpent,
          lastRunPeakLoc: state.lastRunPeakLoc,
          eventSurvivalProductionBonus: state.eventSurvivalProductionBonus,
          greatRefactorProductionBonus: state.greatRefactorProductionBonus,
          nestedDucks: [],
          lastSaveTime: Date.now(),
          floatingTexts: [],
          toastQueue: [],
          ...computeCaches(cacheInput),
        });
      },

      dismissEvent: () => {
        const state = get();
        const wasNegative = state.activeEvent?.isNegative ?? false;
        let eventSurvivalProductionBonus = state.eventSurvivalProductionBonus;
        let cachedLegacyMult = state.cachedLegacyMult;

        if (wasNegative && state.architectureUpgrades.includes('event-driven')) {
          eventSurvivalProductionBonus = Math.min(eventSurvivalProductionBonus + 0.005, 2.0);
          cachedLegacyMult = computeLegacyMult(
            state.legacyUpgrades,
            state.legacyTokens,
            state.architectureUpgrades,
            state.prestigeCount,
            eventSurvivalProductionBonus,
            state.greatRefactorProductionBonus,
            state.greatRefactorCount,
            state.producers,
          );
        }

        set({
          activeEvent: null,
          eventEndTime: null,
          negativeEventssurvived: wasNegative
            ? state.negativeEventssurvived + 1
            : state.negativeEventssurvived,
          eventSurvivalProductionBonus,
          cachedLegacyMult,
        });
      },

      setLoc: (loc: number) => {
        set((state) => ({
          loc,
          totalLoc: Math.max(state.totalLoc, loc),
        }));
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

      popNestedDuck: (id: string) => {
        const state = get();
        const duck = state.nestedDucks.find((d) => d.id === id);
        if (!duck) return;
        const locGained = duck.storedLoc * 1.4;
        set({
          loc: state.loc + locGained,
          totalLoc: state.totalLoc + locGained,
          nestedDucks: state.nestedDucks.filter((d) => d.id !== id),
        });
      },

      newGame: () => {
        set({
          ...DEFAULT_STATE,
          ...computeCaches(DEFAULT_STATE),
          productName: generateProductName(),
          lastSaveTime: Date.now(),
        });
      },

      loadSave: (saved) => {
        const cacheInput: CacheInput = {
          producers: saved.producers ?? {},
          upgrades: saved.upgrades ?? [],
          locPerClick: saved.locPerClick ?? 1,
          legacyUpgrades: saved.legacyUpgrades ?? [],
          legacyTokens: saved.legacyTokens ?? 0,
          architectureUpgrades: saved.architectureUpgrades ?? [],
          prestigeCount: saved.prestigeCount ?? 0,
          eventSurvivalProductionBonus: saved.eventSurvivalProductionBonus ?? 0,
          greatRefactorProductionBonus: saved.greatRefactorProductionBonus ?? 0,
          greatRefactorCount: saved.greatRefactorCount ?? 0,
        };
        set({
          ...DEFAULT_STATE,
          ...saved,
          ...computeCaches(cacheInput),
          floatingTexts: [],
          toastQueue: [],
          pendingClickLoc: 0,
          displayedLOCps: 0,
        });
        // Sync the encoded representation into localStorage so Zustand persist
        // picks it up on next reload without touching the raw state directly.
        const stored = localStorage.getItem('push-to-prod-v1');
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as { version?: number };
            localStorage.setItem(
              'push-to-prod-v1',
              JSON.stringify({ state: saved, version: parsed.version ?? 0 }),
            );
          } catch {
            // ignore — store will auto-persist on next tick
          }
        }
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
      onRehydrateStorage: () => (state) => {
        if (state) {
          const caches = computeCaches({
            producers: state.producers ?? {},
            upgrades: state.upgrades ?? [],
            locPerClick: state.locPerClick ?? 1,
            legacyUpgrades: state.legacyUpgrades ?? [],
            legacyTokens: state.legacyTokens ?? 0,
            architectureUpgrades: state.architectureUpgrades ?? [],
            prestigeCount: state.prestigeCount ?? 0,
            eventSurvivalProductionBonus: state.eventSurvivalProductionBonus ?? 0,
            greatRefactorProductionBonus: state.greatRefactorProductionBonus ?? 0,
            greatRefactorCount: state.greatRefactorCount ?? 0,
          });
          state.cachedLOCps = caches.cachedLOCps;
          state.cachedClickValue = caches.cachedClickValue;
          state.cachedLegacyMult = caches.cachedLegacyMult;
          // Ensure new fields default properly on old saves
          state.greatRefactorCount = state.greatRefactorCount ?? 0;
          state.architecturePoints = state.architecturePoints ?? 0;
          state.architectureUpgrades = state.architectureUpgrades ?? [];
          state.totalLegacyTokensEverSpent = state.totalLegacyTokensEverSpent ?? 0;
          state.lastRunPeakLoc = state.lastRunPeakLoc ?? 0;
          state.eventSurvivalProductionBonus = state.eventSurvivalProductionBonus ?? 0;
          state.nestedDucks = state.nestedDucks ?? [];
          state.clicksThisRun = state.clicksThisRun ?? 0;
          state.greatRefactorProductionBonus = state.greatRefactorProductionBonus ?? 0;
        }
      },
    },
  ),
);
