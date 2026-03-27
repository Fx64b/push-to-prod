import type { Producer } from '@/data/producers';

export function producerCost(producer: Producer, owned: number): number {
  const scaling = producer.costScaling ?? 1.15;
  return Math.floor(producer.baseCost * scaling ** owned);
}

/** Total cost of buying `count` producers when `owned` are already owned. */
export function producerBulkCost(producer: Producer, owned: number, count: number): number {
  const scaling = producer.costScaling ?? 1.15;
  if (count <= 0) return 0;
  if (scaling === 1) return Math.floor(producer.baseCost * count);
  // Geometric series: baseCost * scaling^owned * (scaling^count - 1) / (scaling - 1)
  return Math.floor(
    (producer.baseCost * scaling ** owned * (scaling ** count - 1)) / (scaling - 1),
  );
}
