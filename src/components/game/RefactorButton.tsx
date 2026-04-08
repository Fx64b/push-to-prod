import { useState } from 'react';
import { useGameStore, MIN_CLICKS_TO_PRESTIGE } from '@/store/gameStore';
import { formatLOC } from '@/utils/format';

const PRESTIGE_THRESHOLD = 10_000_000;

function calcDisplayTokens(
  totalLoc: number,
  prestigeCount: number,
  greatRefactorCount: number,
  hasPerpetualLoop: boolean,
): number {
  const log = Math.log10(Math.max(totalLoc, 1));
  const base = Math.max(0, Math.floor(log) - 5);
  const highLocBonus = log > 8 ? Math.floor(((log - 8) ** 2) / 3) : 0;
  const prestigeBonus = Math.floor(prestigeCount / 2);
  const perpetualBonus =
    hasPerpetualLoop && greatRefactorCount > 0 ? Math.floor(greatRefactorCount * 0.5) : 0;
  return base + highLocBonus + prestigeBonus + perpetualBonus;
}

export function RefactorButton() {
  const totalLoc = useGameStore((s) => s.totalLoc);
  const legacyTokens = useGameStore((s) => s.legacyTokens);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const clicksThisRun = useGameStore((s) => s.clicksThisRun);
  const greatRefactorCount = useGameStore((s) => s.greatRefactorCount);
  const architectureUpgrades = useGameStore((s) => s.architectureUpgrades);
  const prestige = useGameStore((s) => s.prestige);
  const [confirming, setConfirming] = useState(false);

  if (totalLoc < PRESTIGE_THRESHOLD) return null;

  const hasPerpetualLoop = architectureUpgrades.includes('perpetual-loop');
  const tokensToEarn = calcDisplayTokens(
    totalLoc,
    prestigeCount,
    greatRefactorCount,
    hasPerpetualLoop,
  );
  const perpetualBonus =
    hasPerpetualLoop && greatRefactorCount > 0 ? Math.floor(greatRefactorCount * 0.5) : 0;
  const clicksReady = clicksThisRun >= MIN_CLICKS_TO_PRESTIGE;
  const canRefactor = clicksReady;

  const handleClick = () => {
    if (!canRefactor) return;
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
        {perpetualBonus > 0 && (
          <>
            <br />
            <span className="text-gh-green text-[10px]">+{perpetualBonus} from Perpetual Loop</span>
          </>
        )}
      </div>

      {!clicksReady && (
        <div className="text-[10px] text-gh-muted text-center">
          <span className="text-gh-red">{clicksThisRun}</span>
          <span className="text-gh-muted"> / {MIN_CLICKS_TO_PRESTIGE} clicks this run required</span>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={!canRefactor}
        className={`
          px-6 py-2 rounded border text-sm font-bold transition-all duration-200
          ${
            !canRefactor
              ? 'border-gh-border/40 bg-gh-surface/40 text-gh-muted cursor-not-allowed opacity-50'
              : confirming
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
        <span className="text-gh-muted">{formatLOC(PRESTIGE_THRESHOLD)}</span>
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
