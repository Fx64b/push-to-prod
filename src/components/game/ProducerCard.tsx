import { useCallback } from 'react';
import type { Producer } from '@/data/producers';
import { useGameStore } from '@/store/gameStore';
import { producerCost } from '@/utils/costs';
import { formatLOC } from '@/utils/format';

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const loc = useGameStore((s) => s.loc);
  const owned = useGameStore((s) => s.producers[producer.id] ?? 0);
  const buyProducer = useGameStore((s) => s.buyProducer);

  const cost = producerCost(producer, owned);
  const canAfford = loc >= cost;

  const handleBuy = useCallback(() => {
    buyProducer(producer.id);
  }, [buyProducer, producer.id]);

  return (
    <button
      onClick={handleBuy}
      disabled={!canAfford}
      className={`
        w-full text-left p-2.5 rounded border transition-all duration-150 font-mono
        ${
          canAfford
            ? 'border-gh-border bg-gh-surface hover:border-gh-blue hover:bg-[#1c2333] cursor-pointer'
            : 'border-gh-border/40 bg-gh-surface/40 cursor-not-allowed opacity-60'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <span className="text-xl leading-none shrink-0 mt-0.5">{producer.icon}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${canAfford ? 'text-gh-blue' : 'text-gh-muted'}`}>
                {producer.name}
              </span>
              {owned > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-gh-green/20 text-gh-green font-bold">
                  {owned}
                </span>
              )}
            </div>
            <p className="text-[11px] text-gh-muted leading-tight mt-0.5 truncate">
              {producer.flavor}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div
            className={`text-sm font-bold tabular-nums ${canAfford ? 'text-gh-green' : 'text-gh-muted'}`}
          >
            {formatLOC(cost)}
          </div>
          <div className="text-[10px] text-gh-muted">{producer.baseLOCps}/s each</div>
        </div>
      </div>
    </button>
  );
}
