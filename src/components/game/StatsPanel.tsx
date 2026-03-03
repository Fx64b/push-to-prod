import { useMemo } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useGameStore } from '@/store/gameStore';
import { PRODUCERS, type Producer } from '@/data/producers';
import { UPGRADES } from '@/data/upgrades';
import { ACHIEVEMENTS, type Achievement } from '@/data/achievements';
import { formatLOC, formatRate } from '@/utils/format';
import { calculateClickValue } from '@/utils/production';
import { producerCost } from '@/utils/costs';

export function StatsPanel() {
  const loc = useGameStore(s => s.loc);
  const totalLoc = useGameStore(s => s.totalLoc);
  const producers = useGameStore(s => s.producers);
  const upgrades = useGameStore(s => s.upgrades);
  const locPerClick = useGameStore(s => s.locPerClick);
  const achievements = useGameStore(s => s.achievements);
  const totalClicks = useGameStore(s => s.totalClicks);
  const prestigeCount = useGameStore(s => s.prestigeCount);
  const legacyTokens = useGameStore(s => s.legacyTokens);

  const locps = useGameStore(s => s.displayedLOCps);

  const clickValue = useMemo(() =>
    calculateClickValue({ producers, upgrades, locPerClick }),
    [producers, upgrades, locPerClick]
  );

  const ownedProducers = PRODUCERS.filter(p => (producers[p.id] ?? 0) > 0);

  return (
    <div className="flex flex-col gap-4 font-mono text-sm h-full overflow-y-auto">
      {/* Stats */}
      <div>
        <h2 className="text-xs text-gh-muted uppercase tracking-widest mb-2 border-b border-gh-border pb-1">
          📊 Stats
        </h2>
        <div className="space-y-1">
          <StatRow label="LOC" value={formatLOC(loc)} color="text-gh-green" />
          <StatRow label="Total LOC" value={formatLOC(totalLoc)} />
          <StatRow label="LOC/s" value={formatRate(locps)} color="text-gh-blue" />
          <StatRow label="Per click" value={formatLOC(clickValue)} />
          <StatRow label="Commits" value={Math.floor(totalLoc / 1000).toLocaleString()} />
          <StatRow label="Clicks" value={totalClicks.toLocaleString()} />
          {prestigeCount > 0 && (
            <StatRow label="Refactors" value={prestigeCount.toString()} color="text-gh-purple" />
          )}
          {legacyTokens > 0 && (
            <StatRow label="Legacy Tokens" value={legacyTokens.toString()} color="text-gh-yellow" />
          )}
        </div>
      </div>

      {/* Owned producers */}
      {ownedProducers.length > 0 && (
        <div>
          <h2 className="text-xs text-gh-muted uppercase tracking-widest mb-2 border-b border-gh-border pb-1">
            🔨 Producers
          </h2>
          <div className="space-y-1">
            {ownedProducers.map(p => {
              const count = producers[p.id] ?? 0;
              return (
                <ProducerTooltip key={p.id} producer={p} count={count} upgrades={upgrades} />
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div>
        <h2 className="text-xs text-gh-muted uppercase tracking-widest mb-2 border-b border-gh-border pb-1">
          🏆 Achievements ({achievements.length}/{ACHIEVEMENTS.length})
        </h2>
        <div className="flex flex-wrap gap-1">
          {ACHIEVEMENTS.map(a => {
            const earned = achievements.includes(a.id);
            return (
              <AchievementBadge key={a.id} achievement={a} earned={earned} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProducerTooltip({ producer, count, upgrades }: { producer: Producer; count: number; upgrades: string[] }) {
  // LOC/s this producer type contributes (with upgrades applied)
  let locps = producer.baseLOCps * count;
  for (const upgrade of UPGRADES) {
    if (upgrade.target === producer.id && upgrades.includes(upgrade.id)) {
      locps *= upgrade.multiplier;
    }
  }
  const nextCost = producerCost(producer, count);

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <div className="flex justify-between items-center cursor-default">
          <span className="text-gh-muted text-xs truncate">
            {producer.icon} {producer.name}
          </span>
          <span className="text-gh-blue font-bold text-xs ml-1 shrink-0">
            ×{count}
          </span>
        </div>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="right"
          sideOffset={6}
          className="z-50 w-56 rounded-md border border-gh-border bg-gh-surface shadow-xl p-3 font-mono text-xs animate-[toastIn_0.15s_ease-out]"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl leading-none">{producer.icon}</span>
            <div>
              <div className="font-bold text-gh-blue">{producer.name}</div>
              <div className="text-gh-green text-[10px]">{count} owned</div>
            </div>
          </div>

          {/* Flavor */}
          <p className="text-gh-muted text-[11px] leading-snug mb-2 italic border-l-2 border-gh-border pl-2">
            "{producer.flavor}"
          </p>

          {/* Stats */}
          <div className="space-y-1 border-t border-gh-border pt-2">
            <div className="flex justify-between">
              <span className="text-gh-muted">Base LOC/s</span>
              <span className="text-gh-text">{producer.baseLOCps}/s each</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gh-muted">Total output</span>
              <span className="text-gh-green font-bold">{formatRate(locps)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gh-muted">Next unit</span>
              <span className="text-gh-yellow">{formatLOC(nextCost)}</span>
            </div>
          </div>

          <TooltipPrimitive.Arrow className="fill-gh-border" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

function AchievementBadge({ achievement, earned }: { achievement: Achievement; earned: boolean }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <div
          className={`text-base leading-none cursor-default transition-opacity ${earned ? 'grayscale-0 opacity-100' : 'grayscale opacity-25'}`}
        >
          {achievement.icon}
        </div>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="right"
          sideOffset={6}
          className="z-50 max-w-[200px] rounded-md border border-gh-border bg-gh-surface shadow-xl p-3 font-mono text-xs animate-[toastIn_0.15s_ease-out]"
        >
          <div className="flex items-start gap-2">
            <div className="relative shrink-0">
              <span className="text-xl leading-none">{achievement.icon}</span>
              {earned && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gh-blue rounded-full border border-gh-surface" />
              )}
            </div>
            <div>
              <div className="text-[10px] text-gh-muted mb-0.5">
                {earned ? '🏆 Achievement unlocked' : '🔒 Locked'}
              </div>
              <div className={`font-bold text-xs ${earned ? 'text-gh-text' : 'text-gh-muted'}`}>
                {earned ? achievement.name : '???'}
              </div>
              <div className="text-gh-muted text-[11px] leading-tight mt-0.5">
                {earned ? achievement.description : 'Keep playing to unlock.'}
              </div>
            </div>
          </div>
          <TooltipPrimitive.Arrow className="fill-gh-border" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gh-muted text-xs">{label}</span>
      <span className={`text-xs font-bold tabular-nums ${color ?? 'text-gh-text'}`}>{value}</span>
    </div>
  );
}
