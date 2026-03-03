import { useCallback, useState } from 'react';
import { useGameStore } from '@/store/gameStore';

export function EnterKey() {
  const [pressed, setPressed] = useState(false);
  const click = useGameStore((s) => s.click);
  const activeEvent = useGameStore((s) => s.activeEvent);

  const isClickDisabled = activeEvent?.effectType === 'click_disabled';

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isClickDisabled) return;
      // Ignore synthetic keyboard-triggered click events (detail === 0)
      // — those are handled by handleKeyDown to avoid double-counting
      if (e.detail === 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      click(e.clientX - rect.left, e.clientY - rect.top);
      setPressed(true);
      setTimeout(() => setPressed(false), 100);
    },
    [click, isClickDisabled],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key !== 'Enter') return;
      if (isClickDisabled) return;
      // Prevent the browser from firing a synthetic click event so we don't double-count
      e.preventDefault();
      click();
      if (!e.repeat) setPressed(true);
    },
    [click, isClickDisabled],
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setPressed(false);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        disabled={isClickDisabled}
        className={`
          relative outline-none focus:ring-2 focus:ring-gh-green focus:ring-offset-2 focus:ring-offset-gh-bg
          transition-all duration-[80ms] ease-out
          ${isClickDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-label="Click to write code"
      >
        <div
          className={`
            w-48 h-20 rounded-lg border-2 border-[#555]
            flex items-center justify-center
            font-mono font-bold text-[#ccc] text-xl tracking-widest
            transition-all duration-[80ms] ease-out
            ${
              pressed
                ? 'translate-y-[4px] shadow-[0_2px_0_#111,0_4px_8px_rgba(0,0,0,0.3)] border-b-[2px] border-b-[#1a1a1a]'
                : 'translate-y-0 shadow-[0_6px_0_#111,0_8px_16px_rgba(0,0,0,0.5)] border-b-[6px] border-b-[#1a1a1a]'
            }
          `}
          style={{
            background: pressed
              ? 'linear-gradient(145deg, #2a2a2a, #222)'
              : 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
          }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs text-[#888] font-normal">↵</span>
            <span className="text-base">ENTER</span>
          </div>
        </div>
      </button>

      {isClickDisabled && (
        <p className="text-gh-red text-xs font-mono animate-pulse">
          🐛 Clicking disabled — fix the bug!
        </p>
      )}
      {!isClickDisabled && (
        <p className="text-gh-muted text-xs font-mono">
          press{' '}
          <kbd className="px-1 py-0.5 rounded text-[10px] bg-gh-surface border border-gh-border">
            Enter
          </kbd>{' '}
          or click
        </p>
      )}
    </div>
  );
}
