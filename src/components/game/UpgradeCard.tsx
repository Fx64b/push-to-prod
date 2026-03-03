import { useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { type Upgrade } from '@/data/upgrades';
import { formatLOC } from '@/utils/format';

interface UpgradeCardProps {
  upgrade: Upgrade;
}

const TARGET_LABELS: Record<string, string> = {
  click: '🖱️ Click',
  all: '🌍 Global',
  'rubber-duck': '🦆',
  'mechanical-keyboard': '⌨️',
  'autocomplete': '✨',
  'stackoverflow-tab': '📋',
  'junior-dev': '👶',
  'senior-dev': '🧙',
  '10x-engineer': '⚡',
  'github-copilot': '🤖',
  'ai-agent': '🦾',
  'agi': '🧠',
};

export function UpgradeCard({ upgrade }: UpgradeCardProps) {
  const loc = useGameStore(s => s.loc);
  const upgrades = useGameStore(s => s.upgrades);
  const buyUpgrade = useGameStore(s => s.buyUpgrade);

  const purchased = upgrades.includes(upgrade.id);
  const canAfford = loc >= upgrade.cost && !purchased;

  const handleBuy = useCallback(() => {
    buyUpgrade(upgrade.id);
  }, [buyUpgrade, upgrade.id]);

  if (purchased) return null; // Don't show already purchased upgrades

  return (
    <button
      onClick={handleBuy}
      disabled={!canAfford}
      className={`
        w-full text-left p-2.5 rounded border transition-all duration-150 font-mono
        ${canAfford
          ? 'border-gh-yellow/60 bg-gh-yellow/5 hover:border-gh-yellow hover:bg-gh-yellow/10 cursor-pointer'
          : 'border-gh-border/40 bg-gh-surface/40 cursor-not-allowed opacity-60'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs">{TARGET_LABELS[upgrade.target] ?? upgrade.target}</span>
            <span className={`text-sm font-bold ${canAfford ? 'text-gh-yellow' : 'text-gh-muted'}`}>
              {upgrade.name}
            </span>
          </div>
          <p className="text-[11px] text-gh-muted mt-0.5">{upgrade.description}</p>
        </div>
        <div className={`text-sm font-bold tabular-nums shrink-0 ${canAfford ? 'text-gh-green' : 'text-gh-muted'}`}>
          {formatLOC(upgrade.cost)}
        </div>
      </div>
    </button>
  );
}
