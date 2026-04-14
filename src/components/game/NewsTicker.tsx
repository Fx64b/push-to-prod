import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getDuckapocalypseStage, TICKER_MESSAGES, type TickerMessage } from '@/data/lore';
import { useGameStore } from '@/store/gameStore';

export function NewsTicker() {
  const totalLoc = useGameStore((s) => s.totalLoc);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const greatRefactorCount = useGameStore((s) => s.greatRefactorCount);
  const duckCount = useGameStore((s) => s.producers['rubber-duck'] ?? 0);
  const stage = getDuckapocalypseStage(duckCount);

  const eligible = useMemo(() => {
    return TICKER_MESSAGES.filter((msg) => {
      if (msg.minLoc !== undefined && totalLoc < msg.minLoc) return false;
      if (msg.minDucks !== undefined && duckCount < msg.minDucks) return false;
      if (msg.minPrestige !== undefined && prestigeCount < msg.minPrestige) return false;
      if (msg.minGreatRefactor !== undefined && greatRefactorCount < msg.minGreatRefactor)
        return false;
      return true;
    });
  }, [totalLoc, duckCount, prestigeCount, greatRefactorCount]);

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
    stage >= 4
      ? 'text-gh-orange'
      : stage === 3
        ? 'text-yellow-400'
        : stage === 2
          ? 'text-gh-red'
          : 'text-gh-muted';

  // Stage-based duck lane sizing and duck emoji size
  const duckLaneHeight = stage >= 5 ? '36px' : stage >= 4 ? '28px' : '20px';
  const duckFontSize = stage >= 5 ? '18px' : stage >= 4 ? '16px' : '14px';
  const duckMarginTop = stage >= 5 ? '-9px' : '-8px';

  // Ticker border/background escalates at stages 4 and 5
  const tickerStyle =
    stage >= 5
      ? {
          borderColor: 'rgba(227,179,65,0.7)',
          backgroundColor: 'rgba(227,179,65,0.06)',
          boxShadow: '0 -3px 14px rgba(227,179,65,0.25)',
        }
      : stage >= 4
        ? { borderColor: 'rgba(227,179,65,0.4)' }
        : {};

  const ducksToShow = useMemo(() => {
    if (duckCount === 0) return [];
    const count = Math.min(Math.ceil(Math.sqrt(duckCount)), 20);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      duration: 12 + ((i * 4.3 + 8) % 18),
      delay: -((i * 5.7 + 3) % 25),
      hopDuration: 0.3 + (i % 4) * 0.08,
    }));
  }, [duckCount]);

  if (!displayed) return null;

  return (
    <div className="relative w-full">
      {ducksToShow.length > 0 && (
        <div
          className="absolute bottom-full w-full overflow-hidden pointer-events-none transition-all duration-700"
          style={{ height: duckLaneHeight }}
          aria-hidden="true"
        >
          {ducksToShow.map((duck) => (
            <span
              key={duck.id}
              style={{
                position: 'absolute',
                top: '50%',
                marginTop: duckMarginTop,
                pointerEvents: 'none',
                animationName: 'duckWalkH',
                animationDuration: `${duck.duration}s`,
                animationDelay: `${duck.delay}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: duckFontSize,
                  animationName: 'duckHop',
                  animationDuration: `${duck.hopDuration}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              >
                🦆
              </span>
            </span>
          ))}
        </div>
      )}
      <div
        className={`w-full overflow-hidden border-t bg-gh-surface/40 px-3 py-1.5 font-mono text-sm transition-colors duration-700 ${textColor}`}
        style={tickerStyle}
      >
        <span
          className="inline-block animate-marquee whitespace-nowrap"
          onAnimationIteration={handleAnimationIteration}
        >
          📡&nbsp;{displayed.text}
        </span>
      </div>
    </div>
  );
}
