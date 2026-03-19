import type { Producer } from '@/data/producers';

export function producerCost(producer: Producer, owned: number): number {
  const scaling = producer.costScaling ?? 1.15;
  return Math.floor(producer.baseCost * scaling ** owned);
}
