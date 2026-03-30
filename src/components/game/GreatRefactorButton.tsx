import { useState } from 'react';
import { LEGACY_UPGRADES } from '@/data/legacyUpgrades';
import { useGameStore, MIN_CLICKS_TO_PRESTIGE } from '@/store/gameStore';

const MIN_PRESTIGES = 3;

export function GreatRefactorButton() {
  const legacyUpgrades = useGameStore((s) => s.legacyUpgrades);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const clicksThisRun = useGameStore((s) => s.clicksThisRun);
  const greatRefactorCount = useGameStore((s) => s.greatRefactorCount);
  const architectureUpgrades = useGameStore((s) => s.architectureUpgrades);
  const greatRefactor = useGameStore((s) => s.greatRefactor);
  const [confirming, setConfirming] = useState(false);

  const baseUpgrades = LEGACY_UPGRADES.filter((u) => !u.requiresSecondSystem);
  const allBaseBought = baseUpgrades.every((u) => legacyUpgrades.includes(u.id));

  // Only show once all base legacy upgrades are bought AND min prestiges done
  if (!allBaseBought || prestigeCount < MIN_PRESTIGES) return null;

  const apGainMult = architectureUpgrades.includes('ap-multiplier') ? 2 : 1;
  const apToEarn = Math.max(2, 3 + greatRefactorCount * 2) * apGainMult;
  const clicksReady = clicksThisRun >= MIN_CLICKS_TO_PRESTIGE;

  const handleClick = () => {
    if (!clicksReady) return;
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 4000);
      return;
    }
    greatRefactor();
    setConfirming(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 font-mono mt-1">
      <div className="w-full border-t border-gh-yellow/20 pt-2" />
      <div className="text-[10px] text-center">
        <span className="text-gh-yellow font-bold">🏗️ The Great Refactor</span>
        <br />
        <span className="text-gh-muted">Resets ALL progress including legacy upgrades</span>
        <br />
        <span className="text-gh-muted">Earn </span>
        <span className="text-gh-yellow font-bold">+{apToEarn} Architecture Point{apToEarn !== 1 ? 's' : ''}</span>
        {apGainMult > 1 && (
          <span className="text-gh-green"> (×{apGainMult} from God Mode)</span>
        )}
      </div>

      {!clicksReady && (
        <div className="text-[10px] text-gh-muted text-center">
          <span className="text-gh-red">{clicksThisRun}</span>
          <span className="text-gh-muted"> / {MIN_CLICKS_TO_PRESTIGE} clicks required</span>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={!clicksReady}
        className={`
          px-6 py-2 rounded border text-sm font-bold transition-all duration-200
          ${
            !clicksReady
              ? 'border-gh-border/40 bg-gh-surface/40 text-gh-muted cursor-not-allowed opacity-50'
              : confirming
                ? 'border-gh-red bg-gh-red/20 text-gh-red hover:bg-gh-red/30 animate-pulse'
                : 'border-gh-yellow/60 bg-gh-yellow/10 text-gh-yellow hover:border-gh-yellow hover:bg-gh-yellow/20'
          }
        `}
      >
        {confirming ? '⚠️ Confirm Great Refactor?' : '🏗️ Great Refactor'}
      </button>

      {confirming && (
        <p className="text-[10px] text-gh-red text-center">
          This resets legacy tokens, upgrades, and producers — permanently trades them for Architecture Points!
        </p>
      )}
    </div>
  );
}
