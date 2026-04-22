import { useState } from 'react';
import { calcPrestigeThreshold, useGameStore } from '@/store/gameStore';
import { formatLOC } from '@/utils/format';

export function RefactorButton() {
  const totalLoc = useGameStore((s) => s.totalLoc);
  const legacyTokens = useGameStore((s) => s.legacyTokens);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const prestige = useGameStore((s) => s.prestige);
  const [confirming, setConfirming] = useState(false);

  const prestigeThreshold = calcPrestigeThreshold(prestigeCount);

  if (totalLoc < prestigeThreshold) return null;

  const tokensToEarn =
    Math.max(0, Math.floor(Math.log10(totalLoc)) - 5) + Math.floor(prestigeCount / 2);
  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    prestige();
    setConfirming(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 font-mono">
      <div className="text-[10px] text-gh-muted text-center">
        <span className="text-gh-yellow">⚠️ Reset all LOC and producers</span>
        <br />
        Earn{' '}
        <span className="text-gh-purple font-bold">
          +{tokensToEarn} Legacy Token{tokensToEarn !== 1 ? 's' : ''}
        </span>{' '}
        (have: {legacyTokens})
      </div>

      <button
        onClick={handleClick}
        className={`
          px-6 py-2 rounded border text-sm font-bold transition-all duration-200
          ${
            confirming
              ? 'border-gh-red bg-gh-red/20 text-gh-red hover:bg-gh-red/30 animate-pulse'
              : 'border-gh-purple/60 bg-gh-purple/10 text-gh-purple hover:border-gh-purple hover:bg-gh-purple/20'
          }
        `}
      >
        {confirming ? '⚠️ Confirm Refactor?' : '♻️ Refactor'}
      </button>

      {confirming && (
        <p className="text-[10px] text-gh-red">Click again to confirm — all progress resets!</p>
      )}

      <div className="text-[10px] text-gh-muted text-center">
        Current LOC: <span className="text-gh-green">{formatLOC(totalLoc)}</span> / threshold:{' '}
        <span className="text-gh-muted">{formatLOC(prestigeThreshold)}</span>
      </div>

      {legacyTokens > 0 && (
        <div className="text-[10px] text-center">
          <span className="text-gh-purple font-bold">+{(legacyTokens * 5).toFixed(0)}%</span>
          <span className="text-gh-muted"> global production bonus active</span>
        </div>
      )}
    </div>
  );
}
