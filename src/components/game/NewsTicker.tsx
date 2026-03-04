import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getDuckapocalypseStage, TICKER_MESSAGES, type TickerMessage } from '@/data/lore';
import { useGameStore } from '@/store/gameStore';

export function NewsTicker() {
  const totalLoc = useGameStore((s) => s.totalLoc);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const producers = useGameStore((s) => s.producers);

  const duckCount = producers['rubber-duck'] ?? 0;
  const stage = getDuckapocalypseStage(duckCount);

  const eligible = useMemo(() => {
    return TICKER_MESSAGES.filter((msg) => {
      if (msg.minLoc !== undefined && totalLoc < msg.minLoc) return false;
      if (msg.minDucks !== undefined && duckCount < msg.minDucks) return false;
      if (msg.minPrestige !== undefined && prestigeCount < msg.minPrestige) return false;
      return true;
    });
  }, [totalLoc, duckCount, prestigeCount]);

  const eligibleRef = useRef(eligible);
  eligibleRef.current = eligible;

  // Currently displayed message
  const [displayed, setDisplayed] = useState<TickerMessage>(() => eligible[0]);
  const displayedRef = useRef(displayed);

  // Queued message — applied at the next animation cycle boundary
  const pendingRef = useRef<TickerMessage | null>(null);

  // Cycling timer queues a new message every 18–26s (never touches displayed directly)
  useEffect(() => {
    const schedule = () => {
      const delay = 18000 + Math.random() * 8000;
      return setTimeout(() => {
        const pool = eligibleRef.current;
        if (pool.length > 1) {
          const filtered = pool.filter((m) => m !== displayedRef.current);
          pendingRef.current = filtered[Math.floor(Math.random() * filtered.length)];
        }
        timer = schedule();
      }, delay);
    };
    let timer = schedule();
    return () => clearTimeout(timer);
  }, []); // runs once — reads everything via refs

  // At each animation cycle end, swap in the pending message (if any)
  const handleAnimationIteration = useCallback(() => {
    if (pendingRef.current) {
      const next = pendingRef.current;
      pendingRef.current = null;
      displayedRef.current = next;
      setDisplayed(next);
    }
  }, []);

  const textColor =
    stage === 3
      ? 'text-yellow-400'
      : stage === 2
        ? 'text-gh-red'
        : 'text-gh-muted';

  if (!displayed) return null;

  return (
    <div
      className={`w-full overflow-hidden border-t border-gh-border bg-gh-surface/40 py-1.5 px-3 font-mono text-sm ${textColor}`}
    >
      <span
        className="inline-block animate-marquee whitespace-nowrap"
        onAnimationIteration={handleAnimationIteration}
      >
        📡&nbsp;{displayed.text}
      </span>
    </div>
  );
}
