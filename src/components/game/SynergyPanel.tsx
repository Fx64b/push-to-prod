import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { SYNERGIES, type Synergy } from '@/data/synergies';
import { useGameStore } from '@/store/gameStore';

function SynergyBadge({
  synergy,
  active,
  enhanced,
}: {
  synergy: Synergy;
  active: boolean;
  enhanced: boolean;
}) {
  const effectiveMult = enhanced ? synergy.multiplier * 2 - 1 : synergy.multiplier;

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <div
          className={`
            text-base leading-none cursor-default transition-all
            ${active ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-25'}
          `}
        >
          {synergy.icon}
        </div>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="right"
          sideOffset={6}
          className="z-50 max-w-[220px] rounded-md border border-gh-border bg-gh-surface shadow-xl p-3 font-mono text-xs animate-tooltip-in"
        >
          <div className="flex items-start gap-2 mb-2">
            <span className="text-xl leading-none shrink-0">{synergy.icon}</span>
            <div>
              <div className="text-[10px] text-gh-muted mb-0.5">
                {active ? '✅ Active' : '🔒 Inactive'}
              </div>
              <div className={`font-bold text-xs ${active ? 'text-gh-green' : 'text-gh-muted'}`}>
                {synergy.name}
              </div>
            </div>
          </div>

          <p className="text-gh-blue text-[11px] mb-1">
            ×{effectiveMult.toFixed(1)} global production
            {enhanced && active && <span className="text-gh-yellow ml-1">(enhanced)</span>}
          </p>

          <p className="text-gh-muted text-[11px] italic mb-2">"{synergy.flavor}"</p>

          <div className="border-t border-gh-border pt-1.5 space-y-0.5">
            <div className="text-[10px] text-gh-muted uppercase tracking-widest mb-1">
              Requirements
            </div>
            {synergy.conditions.map((c) => (
              <SynergyCondition
                key={c.producerId}
                producerId={c.producerId}
                minCount={c.minCount}
              />
            ))}
          </div>
          <TooltipPrimitive.Arrow className="fill-gh-border" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

function SynergyCondition({ producerId, minCount }: { producerId: string; minCount: number }) {
  const owned = useGameStore((s) => s.producers[producerId] ?? 0);
  const met = owned >= minCount;

  return (
    <div className="flex justify-between items-center text-[10px]">
      <span className={met ? 'text-gh-green' : 'text-gh-muted'}>
        {met ? '✓' : '○'} {producerId}
      </span>
      <span className={`tabular-nums ${met ? 'text-gh-green' : 'text-gh-muted'}`}>
        {owned}/{minCount}
      </span>
    </div>
  );
}

export function SynergyPanel() {
  const architectureUpgrades = useGameStore((s) => s.architectureUpgrades);
  const producers = useGameStore((s) => s.producers);

  if (!architectureUpgrades.includes('synergy-protocol')) return null;

  const enhanced = architectureUpgrades.includes('enhanced-synergies');
  const activeCount = SYNERGIES.filter((s) =>
    s.conditions.every((c) => (producers[c.producerId] ?? 0) >= c.minCount),
  ).length;

  return (
    <div>
      <h2 className="text-xs text-gh-muted uppercase tracking-widest mb-2 border-b border-gh-border pb-1">
        🔗 Synergies ({activeCount}/{SYNERGIES.length})
      </h2>
      <div className="flex flex-wrap gap-1">
        {SYNERGIES.map((synergy) => {
          const active = synergy.conditions.every(
            (c) => (producers[c.producerId] ?? 0) >= c.minCount,
          );
          return (
            <SynergyBadge key={synergy.id} synergy={synergy} active={active} enhanced={enhanced} />
          );
        })}
      </div>
    </div>
  );
}
