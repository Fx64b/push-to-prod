import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useCallback } from 'react';
import type { Producer } from '@/data/producers';
import { useGameStore } from '@/store/gameStore';
import { producerCost } from '@/utils/costs';
import { formatLOC, formatRate } from '@/utils/format';

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
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
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
                  <span
                    className={`text-sm font-bold ${canAfford ? 'text-gh-blue' : 'text-gh-muted'}`}
                  >
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
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="left"
          sideOffset={6}
          className="z-50 w-56 rounded-md border border-gh-border bg-gh-surface shadow-xl p-3 font-mono text-xs animate-tooltip-in"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl leading-none">{producer.icon}</span>
            <div>
              <div className="font-bold text-gh-blue">{producer.name}</div>
              {owned > 0 && <div className="text-gh-green text-[10px]">{owned} owned</div>}
            </div>
          </div>

          {/* Full flavor text */}
          <p className="text-gh-muted text-[11px] leading-snug mb-2 italic border-l-2 border-gh-border pl-2">
            "{producer.flavor}"
          </p>

          {/* Stats */}
          <div className="space-y-1 border-t border-gh-border pt-2">
            <div className="flex justify-between">
              <span className="text-gh-muted">Base rate</span>
              <span className="text-gh-text">{producer.baseLOCps} LOC/s each</span>
            </div>
            {owned > 0 && (
              <div className="flex justify-between">
                <span className="text-gh-muted">Base output</span>
                <span className="text-gh-green font-bold">
                  {formatRate(producer.baseLOCps * owned)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gh-muted">Next cost</span>
              <span className="text-gh-yellow">{formatLOC(cost)}</span>
            </div>
          </div>

          <TooltipPrimitive.Arrow className="fill-gh-border" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
