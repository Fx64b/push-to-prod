import { Building2, X } from 'lucide-react';
import { useState } from 'react';
import { ARCHITECTURE_UPGRADES, type ArchitectureUpgrade } from '@/data/architectureUpgrades';
import { useGameStore } from '@/store/gameStore';

function effectSummary(upgrade: ArchitectureUpgrade): string {
  const e = upgrade.effect;
  switch (e.type) {
    case 'production_bonus':
      return `×${e.multiplier} global production`;
    case 'event_horizon':
      return 'Positive events last 2× longer';
    case 'fast_learner':
      return 'Legacy upgrades cost 20% fewer tokens';
    case 'recursive_memory':
      return "Each run starts with 10% of last run's peak LOC";
    case 'unlock_duck_nesting':
      return 'Enables duck nesting (leech & pop for 1.4× stored LOC)';
    case 'compounding_interest':
      return '+2% global production per regular prestige (stacks)';
    case 'event_driven':
      return '+0.5% permanent production per negative event survived';
    case 'unlock_second_system':
      return 'Unlocks 5 additional high-tier Legacy upgrades';
    case 'protocol_breach':
      return 'Unlocks Phase 5 "The Loop" events';
    case 'ap_multiplier':
      return 'Doubles AP earned in all future Great Refactors';
    case 'token_proliferation':
      return '+1 bonus Legacy Token per prestige (stacks)';
    case 'infinite_feedback_loop':
      return 'Upgrades the built-in GR multiplier: ×1.5 → ×2 per Great Refactor';
    case 'prestige_ap_dividend':
      return '+1 Architecture Point per regular prestige';
    case 'deep_recursion':
      return "Each run starts with 30% of last run's peak LOC (supersedes Recursive Memory)";
    case 'loop_producer_inheritance':
      return 'The Process, Sentient Codebase, Duck Collective, and Recursive Self survive regular prestige resets';
    case 'unlock_synergies':
      return 'Unlocks producer synergies — combinations of producers grant bonus multipliers';
    case 'enhanced_synergies':
      return 'All synergy bonuses are doubled';
    case 'autobuyer_producers':
      return 'Auto-buys the cheapest affordable producer every 2 seconds';
    case 'autobuyer_upgrades':
      return 'Auto-buys the cheapest affordable upgrade every 5 seconds';
    case 'autobuyer_bulk_producers':
      return 'Auto-buys 5 of the cheapest affordable producer every second';
    case 'autoclick':
      return `Auto-clicks the LOC button ${e.cps} times per second`;
    case 'autobuyer_all_upgrades':
      return 'Auto-buys ALL affordable upgrades every 5 seconds';
    case 'beyond_producer_inheritance':
      return 'Multiverse Compiler, The Boardroom, Reality Engine, and The Final Push survive regular prestige resets';
    default:
      return '';
  }
}

function ArchUpgradeCard({
  upgrade,
  purchased,
  canAfford,
  locked,
  onBuy,
}: {
  upgrade: ArchitectureUpgrade;
  purchased: boolean;
  canAfford: boolean;
  locked: boolean;
  onBuy: () => void;
}) {
  return (
    <div
      className={`p-3 rounded border font-mono text-xs transition-all ${
        locked
          ? 'border-gh-border/30 bg-gh-surface/20 opacity-40'
          : purchased
            ? 'border-gh-yellow/40 bg-gh-yellow/5 opacity-70'
            : canAfford
              ? 'border-gh-border bg-gh-surface hover:border-gh-yellow/60 cursor-pointer'
              : 'border-gh-border/40 bg-gh-surface/40 opacity-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {locked && (
              <span className="text-gh-muted text-[10px] font-bold">
                🔒 GR {upgrade.requiresGreatRefactor}+
              </span>
            )}
            {!locked && purchased && (
              <span className="text-gh-yellow text-[10px] font-bold">✓ INSTALLED</span>
            )}
            <span
              className={`font-bold text-sm ${
                locked ? 'text-gh-muted' : purchased ? 'text-gh-yellow' : 'text-gh-text'
              }`}
            >
              {upgrade.name}
            </span>
          </div>
          <p className={`text-[11px] mb-1 ${locked ? 'text-gh-muted' : 'text-gh-blue'}`}>
            {effectSummary(upgrade)}
          </p>
          {!locked && <p className="text-gh-muted text-[11px] italic">"{upgrade.flavor}"</p>}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1">
            <span
              className={`font-bold text-sm tabular-nums ${
                locked
                  ? 'text-gh-muted/50'
                  : purchased
                    ? 'text-gh-yellow'
                    : canAfford
                      ? 'text-gh-yellow'
                      : 'text-gh-muted'
              }`}
            >
              {upgrade.cost}
            </span>
            <span className="text-gh-muted text-[10px]">AP</span>
          </div>
          {!locked && !purchased && (
            <button
              onClick={onBuy}
              disabled={!canAfford}
              className={`px-3 py-1 rounded text-[11px] font-bold border transition-all ${
                canAfford
                  ? 'border-gh-yellow/60 bg-gh-yellow/10 text-gh-yellow hover:bg-gh-yellow/20 hover:border-gh-yellow'
                  : 'border-gh-border/40 text-gh-muted cursor-not-allowed'
              }`}
            >
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArchitecturePanel() {
  const [open, setOpen] = useState(false);
  const architecturePoints = useGameStore((s) => s.architecturePoints);
  const architectureUpgrades = useGameStore((s) => s.architectureUpgrades);
  const greatRefactorCount = useGameStore((s) => s.greatRefactorCount);
  const buyArchitectureUpgrade = useGameStore((s) => s.buyArchitectureUpgrade);

  if (greatRefactorCount === 0) return null;

  const purchased = ARCHITECTURE_UPGRADES.filter((u) => architectureUpgrades.includes(u.id)).length;
  const unlocked = ARCHITECTURE_UPGRADES.filter(
    (u) => (u.requiresGreatRefactor ?? 0) <= greatRefactorCount,
  ).length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-3 py-2 rounded border border-gh-yellow/50 bg-gh-yellow/10 text-gh-yellow font-mono font-bold hover:border-gh-yellow hover:bg-gh-yellow/20 transition-all"
      >
        <div className="flex items-center gap-2 text-xs min-w-0">
          <Building2 size={13} className="shrink-0" />
          <span className="truncate">Architecture</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {architecturePoints > 0 && (
            <span className="bg-gh-yellow/30 text-gh-yellow px-1.5 py-0.5 rounded-full text-[10px]">
              {architecturePoints} AP
            </span>
          )}
          <span className="text-gh-muted text-[10px]">
            {purchased}/{unlocked}
          </span>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col bg-gh-bg border border-gh-border rounded-lg shadow-2xl font-mono overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gh-border shrink-0">
              <div>
                <h2 className="text-gh-yellow font-bold text-base">Architecture Panel</h2>
                <p className="text-gh-muted text-xs mt-0.5">
                  Permanent upgrades that survive Great Refactors
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gh-muted hover:text-gh-text transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-3 border-b border-gh-border bg-gh-surface/40 shrink-0">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                    Architecture Points
                  </div>
                  <div className="text-gh-yellow font-bold text-lg tabular-nums">
                    {architecturePoints}{' '}
                    <span className="text-xs font-normal text-gh-muted">AP</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                    Great Refactors
                  </div>
                  <div className="text-gh-text text-sm font-bold">{greatRefactorCount}×</div>
                </div>
                <div>
                  <div className="text-[10px] text-gh-muted uppercase tracking-widest">
                    Installed
                  </div>
                  <div className="text-gh-green text-sm font-bold">
                    {purchased}/{unlocked}
                  </div>
                </div>
              </div>
              <p className="text-gh-muted text-[11px] mt-2">
                Architecture Points are earned by performing a{' '}
                <span className="text-gh-yellow">Great Refactor</span>. These upgrades persist
                forever — across all loops.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
              {ARCHITECTURE_UPGRADES.map((u) => {
                const isLocked = (u.requiresGreatRefactor ?? 0) > greatRefactorCount;
                const isPurchased = architectureUpgrades.includes(u.id);
                return (
                  <ArchUpgradeCard
                    key={u.id}
                    upgrade={u}
                    purchased={isPurchased}
                    canAfford={architecturePoints >= u.cost && !isPurchased && !isLocked}
                    locked={isLocked}
                    onBuy={() => buyArchitectureUpgrade(u.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
