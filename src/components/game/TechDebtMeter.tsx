import { LEGACY_UPGRADES } from '@/data/legacyUpgrades';
import { useGameStore, getDebtPenalty } from '@/store/gameStore';

function debtLabel(debt: number): string {
  if (debt >= 100) return '🔴 CRITICAL';
  if (debt >= 75) return '🟠 Severe';
  if (debt >= 50) return '🟡 Significant';
  if (debt >= 25) return '🟢 Mild';
  return '✅ Manageable';
}

function debtColor(debt: number): string {
  if (debt >= 100) return 'bg-gh-red';
  if (debt >= 75) return 'bg-orange-500';
  if (debt >= 50) return 'bg-gh-yellow';
  if (debt >= 25) return 'bg-green-500';
  return 'bg-gh-green';
}

function debtTextColor(debt: number): string {
  if (debt >= 100) return 'text-gh-red';
  if (debt >= 75) return 'text-orange-400';
  if (debt >= 50) return 'text-gh-yellow';
  return 'text-gh-muted';
}

export function TechDebtMeter() {
  const technicalDebt = useGameStore((s) => s.technicalDebt);
  const legacyUpgrades = useGameStore((s) => s.legacyUpgrades);

  // Only show when all legacy items are owned
  const allBought = LEGACY_UPGRADES.every((u) => legacyUpgrades.includes(u.id));
  if (!allBought) return null;

  const penalty = getDebtPenalty(technicalDebt);
  const penaltyPct = Math.round((1 - penalty) * 100);

  return (
    <div className="w-full font-mono">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gh-muted uppercase tracking-widest">Technical Debt</span>
        <span className={`text-[10px] font-bold ${debtTextColor(technicalDebt)}`}>
          {debtLabel(technicalDebt)} — {technicalDebt.toFixed(1)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-gh-border overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${debtColor(technicalDebt)}`}
          style={{ width: `${Math.min(100, technicalDebt)}%` }}
        />
      </div>

      {penaltyPct > 0 && (
        <p className={`text-[10px] mt-1 ${debtTextColor(technicalDebt)}`}>
          Production penalty: −{penaltyPct}%
          {technicalDebt >= 100 && ' — the codebase is load-bearing spaghetti.'}
        </p>
      )}

      {technicalDebt < 5 && (
        <p className="text-[10px] text-gh-muted mt-1 opacity-60">
          Junior devs and copilots generate debt. Senior devs reduce it.
        </p>
      )}
    </div>
  );
}
