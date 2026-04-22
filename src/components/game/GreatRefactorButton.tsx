import { useState } from 'react';
import { LEGACY_UPGRADES } from '@/data/legacyUpgrades';
import { useGameStore } from '@/store/gameStore';

export function GreatRefactorButton() {
  const legacyUpgrades = useGameStore((s) => s.legacyUpgrades);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const greatRefactorCount = useGameStore((s) => s.greatRefactorCount);
  const architectureUpgrades = useGameStore((s) => s.architectureUpgrades);
  const greatRefactorProductionBonus = useGameStore((s) => s.greatRefactorProductionBonus);
  const legacyTokens = useGameStore((s) => s.legacyTokens);
  const greatRefactor = useGameStore((s) => s.greatRefactor);
  const [confirming, setConfirming] = useState(false);

  // After the first Great Refactor, prestige requirements decrease (min 1)
  const minPrestiges = Math.max(1, 3 - greatRefactorCount);

  const baseUpgrades = LEGACY_UPGRADES.filter((u) => !u.requiresSecondSystem);
  const allBaseBought = baseUpgrades.every((u) => legacyUpgrades.includes(u.id));
  const missingUpgrades = baseUpgrades.filter((u) => !legacyUpgrades.includes(u.id));
  const boughtCount = baseUpgrades.length - missingUpgrades.length;

  // Show progress panel when not all bought (but only after first prestige)
  if (prestigeCount < 1) return null;

  // Show progress indicator when not yet eligible
  if (!allBaseBought || prestigeCount < minPrestiges) {
    // Don't show anything until the player has at least 1 prestige
    if (prestigeCount < 1) return null;
    return (
      <div className="flex flex-col items-center gap-1 font-mono mt-1 w-full max-w-xs">
        <div className="w-full border-t border-gh-yellow/10 pt-2" />
        <div className="text-[10px] text-center text-gh-muted">
          <span className="text-gh-yellow font-bold">🏗️ Great Refactor</span>
          <span className="text-gh-muted"> — locked</span>
        </div>
        <div className="w-full bg-gh-surface border border-gh-border/40 rounded p-2 space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-gh-muted">Legacy upgrades</span>
            <span
              className={boughtCount === baseUpgrades.length ? 'text-gh-green' : 'text-gh-yellow'}
            >
              {boughtCount}/{baseUpgrades.length}
            </span>
          </div>
          <div className="w-full h-1 bg-gh-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gh-yellow/60 rounded-full transition-all duration-300"
              style={{ width: `${(boughtCount / baseUpgrades.length) * 100}%` }}
            />
          </div>
          {!allBaseBought && missingUpgrades.length <= 4 && (
            <div className="text-[9px] text-gh-muted/70 italic">
              Need:{' '}
              {missingUpgrades
                .slice(0, 3)
                .map((u) => u.name)
                .join(', ')}
              {missingUpgrades.length > 3 ? ` +${missingUpgrades.length - 3} more` : ''}
            </div>
          )}
          {allBaseBought && prestigeCount < minPrestiges && (
            <div className="text-[10px] text-gh-muted text-center">
              Need <span className="text-gh-yellow">{minPrestiges - prestigeCount} more</span>{' '}
              refactor{minPrestiges - prestigeCount !== 1 ? 's' : ''}
            </div>
          )}
          {legacyTokens > 0 && !allBaseBought && (
            <div className="text-[9px] text-gh-blue text-center">
              {legacyTokens} Legacy Token{legacyTokens !== 1 ? 's' : ''} available to spend
            </div>
          )}
        </div>
      </div>
    );
  }

  const apGainMult = architectureUpgrades.includes('ap-multiplier') ? 2 : 1;
  const apToEarn = Math.max(2, 3 + greatRefactorCount * 2) * apGainMult;
  const hasInfiniteFeedback = architectureUpgrades.includes('infinite-feedback-loop');
  const feedbackAfter = greatRefactorProductionBonus + (hasInfiniteFeedback ? 0.05 : 0);

  const handleClick = () => {
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
        <span className="text-gh-yellow font-bold">
          +{apToEarn} Architecture Point{apToEarn !== 1 ? 's' : ''}
        </span>
        {apGainMult > 1 && <span className="text-gh-green"> (×{apGainMult} from God Mode)</span>}
        {hasInfiniteFeedback && (
          <>
            <br />
            <span className="text-gh-muted">Feedback Loop: </span>
            <span className="text-gh-green font-bold">
              +5% → {(feedbackAfter * 100).toFixed(0)}% total bonus
            </span>
          </>
        )}
      </div>

      <button
        onClick={handleClick}
        className={`
          px-6 py-2 rounded border text-sm font-bold transition-all duration-200
          ${
            confirming
              ? 'border-gh-red bg-gh-red/20 text-gh-red hover:bg-gh-red/30 animate-pulse'
              : 'border-gh-yellow/60 bg-gh-yellow/10 text-gh-yellow hover:border-gh-yellow hover:bg-gh-yellow/20'
          }
        `}
      >
        {confirming ? '⚠️ Confirm Great Refactor?' : '🏗️ Great Refactor'}
      </button>

      {confirming && (
        <p className="text-[10px] text-gh-red text-center">
          This resets legacy tokens, upgrades, and producers — permanently trades them for
          Architecture Points!
        </p>
      )}
    </div>
  );
}
