import { X } from 'lucide-react';
import { useState } from 'react';
import { LEGACY_UPGRADES, type LegacyUpgrade } from '@/data/legacyUpgrades';
import { useGameStore } from '@/store/gameStore';
import { formatLOC } from '@/utils/format';

const CATEGORY_ORDER = ['production_bonus', 'start_loc', 'start_producer', 'keep_upgrade'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  production_bonus: 'Production Bonuses',
  start_loc: 'Head Starts',
  start_producer: 'Starting Roster',
  keep_upgrade: 'Persistent Upgrades',
};

function effectSummary(upgrade: LegacyUpgrade): string {
  const e = upgrade.effect;
  if (e.type === 'production_bonus') {
    const pct = Math.round((e.multiplier - 1) * 100);
    return e.multiplier >= 2 ? `×${e.multiplier} global production` : `+${pct}% global production`;
  }
  if (e.type === 'start_loc') return `Start with ${formatLOC(e.amount)} LOC`;
  if (e.type === 'start_producer') {
    if (e.producers.length === 1) {
      return `Start with ${e.producers[0].count}× ${e.producers[0].id.replace(/-/g, ' ')}`;
    }
    return `Start with 1 of each: ${e.producers.map((p) => p.id.replace(/-/g, ' ')).join(', ')}`;
  }
  if (e.type === 'keep_upgrade') {
    return e.upgradeId === 'all-click'
      ? 'Keep all click upgrades on reset'
      : `Keep "${e.upgradeId.replace(/-/g, ' ')}" on reset`;
  }
  return '';
}

function LegacyUpgradeCard({
  upgrade,
  purchased,
  canAfford,
  onBuy,
}: {
  upgrade: LegacyUpgrade;
  purchased: boolean;
  canAfford: boolean;
  onBuy: () => void;
}) {
  return (
    <div
      className={`p-3 rounded border font-mono text-xs transition-all ${
        purchased
          ? 'border-gh-green/40 bg-gh-green/5 opacity-70'
          : canAfford
            ? 'border-gh-border bg-gh-surface hover:border-gh-purple/60 cursor-pointer'
            : 'border-gh-border/40 bg-gh-surface/40 opacity-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {purchased && <span className="text-gh-green text-[10px] font-bold">✓ OWNED</span>}
            <span className={`font-bold text-sm ${purchased ? 'text-gh-green' : 'text-gh-text'}`}>
              {upgrade.name}
            </span>
          </div>
          <p className="text-gh-blue text-[11px] mb-1">{effectSummary(upgrade)}</p>
          <p className="text-gh-muted text-[11px] italic">"{upgrade.flavor}"</p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1">
            <span
              className={`font-bold text-sm tabular-nums ${
                purchased ? 'text-gh-green' : canAfford ? 'text-gh-purple' : 'text-gh-muted'
              }`}
            >
              {upgrade.cost}
            </span>
            <span className="text-gh-muted text-[10px]">LCT</span>
          </div>
          {!purchased && (
            <button
              onClick={onBuy}
              disabled={!canAfford}
              className={`px-3 py-1 rounded text-[11px] font-bold border transition-all ${
                canAfford
                  ? 'border-gh-purple/60 bg-gh-purple/10 text-gh-purple hover:bg-gh-purple/20 hover:border-gh-purple'
                  : 'border-gh-border/40 text-gh-muted cursor-not-allowed'
              }`}
            >
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function LegacyPanel() {
  const [open, setOpen] = useState(false);
  const legacyTokens = useGameStore((s) => s.legacyTokens);
  const legacyUpgrades = useGameStore((s) => s.legacyUpgrades);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const buyLegacyUpgrade = useGameStore((s) => s.buyLegacyUpgrade);

  // Only show after first prestige or once you have tokens
  if (prestigeCount === 0 && legacyTokens === 0) return null;

  const autoBonus = legacyTokens * 5;
  const upgradeMult = LEGACY_UPGRADES.reduce((acc, u) => {
    if (u.effect.type === 'production_bonus' && legacyUpgrades.includes(u.id)) {
      return acc * u.effect.multiplier;
    }
    return acc;
  }, 1);
  const totalMult = ((1 + legacyTokens * 0.05) * upgradeMult - 1) * 100;

  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    upgrades: LEGACY_UPGRADES.filter((u) => u.effect.type === cat),
  }));

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gh-purple/50 bg-gh-purple/10 text-gh-purple text-xs font-mono font-bold hover:border-gh-purple hover:bg-gh-purple/20 transition-all"
      >
        <span>⬡</span>
        <span>Legacy Panel</span>
        {legacyTokens > 0 && (
          <span className="bg-gh-purple/30 text-gh-purple px-1.5 py-0.5 rounded-full text-[10px]">
            {legacyTokens} LCT
          </span>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col bg-gh-bg border border-gh-border rounded-lg shadow-2xl font-mono overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gh-border shrink-0">
              <div>
                <h2 className="text-gh-purple font-bold text-base">Legacy Panel</h2>
                <p className="text-gh-muted text-xs mt-0.5">
                  Permanent upgrades that survive every reset
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gh-muted hover:text-gh-text transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Token summary */}
            <div className="px-5 py-3 border-b border-gh-border bg-gh-surface/40 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                      Balance
                    </div>
                    <div className="text-gh-purple font-bold text-lg tabular-nums">
                      {legacyTokens} <span className="text-xs font-normal text-gh-muted">LCT</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                      Auto-bonus
                    </div>
                    <div className="text-gh-blue text-sm font-bold">+{autoBonus}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                      Total boost
                    </div>
                    <div className="text-gh-green text-sm font-bold">+{totalMult.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                      Refactors
                    </div>
                    <div className="text-gh-text text-sm font-bold">{prestigeCount}×</div>
                  </div>
                </div>
              </div>
              <p className="text-gh-muted text-[11px] mt-2">
                Each token held permanently adds{' '}
                <span className="text-gh-blue">+5% global production</span>. Spending tokens reduces
                this auto-bonus — choose wisely.
              </p>
            </div>

            {/* Upgrades list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {grouped.map(({ cat, upgrades }) => (
                <div key={cat}>
                  <h3 className="text-[10px] text-gh-muted uppercase tracking-widest mb-2 border-b border-gh-border pb-1">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <div className="space-y-2">
                    {upgrades.map((u) => (
                      <LegacyUpgradeCard
                        key={u.id}
                        upgrade={u}
                        purchased={legacyUpgrades.includes(u.id)}
                        canAfford={legacyTokens >= u.cost && !legacyUpgrades.includes(u.id)}
                        onBuy={() => buyLegacyUpgrade(u.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
