import { PRODUCERS } from '@/data/producers';
import { UPGRADES } from '@/data/upgrades';

interface ProductionState {
  producers: Record<string, number>;
  upgrades: string[];
  locPerClick: number;
}

export function calculateLOCps(state: ProductionState): number {
  let total = 0;

  for (const producer of PRODUCERS) {
    const count = state.producers[producer.id] ?? 0;
    if (count === 0) continue;

    let producerLOCps = producer.baseLOCps * count;

    for (const upgrade of UPGRADES) {
      if (upgrade.target === producer.id && state.upgrades.includes(upgrade.id)) {
        producerLOCps *= upgrade.multiplier;
      }
    }

    total += producerLOCps;
  }

  // Global upgrades pool additively: each contributes (multiplier - 1) as a bonus,
  // then the total bonus is applied once. This prevents the explosive compounding
  // that occurs when large multipliers stack multiplicatively.
  let globalBonus = 0;
  for (const upgrade of UPGRADES) {
    if (upgrade.target === 'all' && state.upgrades.includes(upgrade.id)) {
      globalBonus += upgrade.multiplier - 1;
    }
  }
  if (globalBonus > 0) total *= 1 + globalBonus;

  return total;
}

export function calculateClickValue(state: ProductionState): number {
  let value = state.locPerClick;

  for (const upgrade of UPGRADES) {
    if (upgrade.target === 'click' && state.upgrades.includes(upgrade.id)) {
      value *= upgrade.multiplier;
    }
  }

  return value;
}
