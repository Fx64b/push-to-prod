import type { Producer } from '@/data/producers';

export function producerCost(producer: Producer, owned: number): number {
  return Math.floor(producer.baseCost * 1.15 ** owned);
}
