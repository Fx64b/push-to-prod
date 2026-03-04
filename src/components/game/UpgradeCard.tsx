import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useCallback } from 'react';
import { PRODUCERS } from '@/data/producers';
import type { Upgrade } from '@/data/upgrades';
import { useGameStore } from '@/store/gameStore';
import { formatLOC } from '@/utils/format';

interface UpgradeCardProps {
  upgrade: Upgrade;
}

const TARGET_LABELS: Record<string, string> = {
  click: '🖱️ Click',
  all: '🌍 Global',
  'rubber-duck': '🦆 Rubber Duck',
  'mechanical-keyboard': '⌨️ Mech Keyboard',
  'coffee-machine': '☕ Coffee Machine',
  autocomplete: '✨ Autocomplete',
  'stackoverflow-tab': '📋 Stack Overflow Tab',
  'junior-dev': '👶 Junior Dev',
  'senior-dev': '🧙 Senior Dev',
  'tech-lead': '📊 Tech Lead',
  '10x-engineer': '⚡ 10x Engineer',
  'github-copilot': '🤖 GitHub Copilot',
  'ai-agent': '🦾 AI Agent',
  'cloud-cluster': '☁️ Cloud Cluster',
  agi: '🧠 AGI',
  'quantum-computer': '⚛️ Quantum Computer',
  'the-singularity': '∞ The Singularity',
};

// Short labels for the card badge (no producer name, just icon)
const TARGET_ICONS: Record<string, string> = {
  click: '🖱️ Click',
  all: '🌍 Global',
  'rubber-duck': '🦆',
  'mechanical-keyboard': '⌨️',
  'coffee-machine': '☕',
  autocomplete: '✨',
  'stackoverflow-tab': '📋',
  'junior-dev': '👶',
  'senior-dev': '🧙',
  'tech-lead': '📊',
  '10x-engineer': '⚡',
  'github-copilot': '🤖',
  'ai-agent': '🦾',
  'cloud-cluster': '☁️',
  agi: '🧠',
  'quantum-computer': '⚛️',
  'the-singularity': '∞',
};

export function UpgradeCard({ upgrade }: UpgradeCardProps) {
  const loc = useGameStore((s) => s.loc);
  const upgrades = useGameStore((s) => s.upgrades);
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);

  const purchased = upgrades.includes(upgrade.id);
  const canAfford = loc >= upgrade.cost && !purchased;

  const handleBuy = useCallback(() => {
    buyUpgrade(upgrade.id);
  }, [buyUpgrade, upgrade.id]);

  if (purchased) return null;

  const targetProducer = PRODUCERS.find((p) => p.id === upgrade.target);

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          onClick={handleBuy}
          disabled={!canAfford}
          className={`
            w-full text-left p-2.5 rounded border transition-all duration-150 font-mono
            ${
              canAfford
                ? 'border-gh-yellow/60 bg-gh-yellow/5 hover:border-gh-yellow hover:bg-gh-yellow/10 cursor-pointer'
                : 'border-gh-border/40 bg-gh-surface/40 cursor-not-allowed opacity-60'
            }
          `}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs">{TARGET_ICONS[upgrade.target] ?? upgrade.target}</span>
                <span
                  className={`text-sm font-bold ${canAfford ? 'text-gh-yellow' : 'text-gh-muted'}`}
                >
                  {upgrade.name}
                </span>
              </div>
              <p className="text-[11px] text-gh-muted mt-0.5">{upgrade.description}</p>
            </div>
            <div
              className={`text-sm font-bold tabular-nums shrink-0 ${canAfford ? 'text-gh-green' : 'text-gh-muted'}`}
            >
              {formatLOC(upgrade.cost)}
            </div>
          </div>
        </button>
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="left"
          sideOffset={6}
          className="z-50 w-56 rounded-md border border-gh-border bg-gh-surface shadow-xl p-3 font-mono text-xs animate-tooltip-in"
        >
          {/* Header */}
          <div className="mb-2">
            <div className="text-[10px] text-gh-muted uppercase tracking-widest mb-0.5">
              {TARGET_LABELS[upgrade.target] ?? upgrade.target} upgrade
            </div>
            <div className="font-bold text-gh-yellow">{upgrade.name}</div>
          </div>

          {/* Description */}
          <p className="text-gh-blue text-[11px] leading-snug mb-2">{upgrade.description}</p>

          {/* Stats */}
          <div className="space-y-1 border-t border-gh-border pt-2">
            <div className="flex justify-between">
              <span className="text-gh-muted">Effect</span>
              <span className="text-gh-green font-bold">×{upgrade.multiplier}</span>
            </div>
            {targetProducer && (
              <div className="flex justify-between">
                <span className="text-gh-muted">Target</span>
                <span className="text-gh-text">
                  {targetProducer.icon} {targetProducer.name}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gh-muted">Cost</span>
              <span className={canAfford ? 'text-gh-green' : 'text-gh-muted'}>
                {formatLOC(upgrade.cost)}
              </span>
            </div>
          </div>

          <TooltipPrimitive.Arrow className="fill-gh-border" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
