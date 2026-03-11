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

  for (const upgrade of UPGRADES) {
    if (upgrade.target === 'all' && state.upgrades.includes(upgrade.id)) {
      total *= upgrade.multiplier;
    }
  }

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
