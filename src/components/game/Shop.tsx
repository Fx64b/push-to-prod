import { useState } from 'react';
import { PRODUCERS } from '@/data/producers';
import { UPGRADES } from '@/data/upgrades';
import { useGameStore } from '@/store/gameStore';
import { ProducerCard } from './ProducerCard';
import { UpgradeCard } from './UpgradeCard';

type Tab = 'producers' | 'upgrades';

export function Shop() {
  const [activeTab, setActiveTab] = useState<Tab>('producers');
  const totalLoc = useGameStore((s) => s.totalLoc);
  const producers = useGameStore((s) => s.producers);
  const upgrades = useGameStore((s) => s.upgrades);

  const visibleProducers = PRODUCERS.filter((p) => (p.unlockLoc ?? 0) <= totalLoc);
  const hiddenCount = PRODUCERS.length - visibleProducers.length;

  const availableUpgrades = UPGRADES.filter(
    (u) => !upgrades.includes(u.id) && u.unlockCondition({ totalLoc, producers, upgrades }),
  );

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Tab bar */}
      <div className="flex border-b border-gh-border shrink-0">
        <TabButton active={activeTab === 'producers'} onClick={() => setActiveTab('producers')}>
          🛒 Producers
        </TabButton>
        <TabButton active={activeTab === 'upgrades'} onClick={() => setActiveTab('upgrades')}>
          ⬆️ Upgrades
          {availableUpgrades.length > 0 && (
            <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-gh-yellow/30 text-gh-yellow font-bold">
              {availableUpgrades.length}
            </span>
          )}
        </TabButton>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {activeTab === 'producers' && (
          <>
            {visibleProducers.map((p) => (
              <ProducerCard key={p.id} producer={p} />
            ))}
            {hiddenCount > 0 && (
              <p className="text-center text-[11px] text-gh-muted/50 italic py-1">
                {hiddenCount} more producer{hiddenCount > 1 ? 's' : ''} unlock at higher LOC
              </p>
            )}
          </>
        )}

        {activeTab === 'upgrades' &&
          (availableUpgrades.length === 0 ? (
            <div className="text-gh-muted text-xs text-center py-8">
              <p>No upgrades available yet.</p>
              <p className="mt-1 opacity-60">Buy more producers to unlock upgrades.</p>
            </div>
          ) : (
            availableUpgrades.map((u) => <UpgradeCard key={u.id} upgrade={u} />)
          ))}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1 px-4 py-2 text-xs font-mono font-medium transition-colors
        border-b-2 -mb-px
        ${
          active
            ? 'border-gh-blue text-gh-blue'
            : 'border-transparent text-gh-muted hover:text-gh-text hover:border-gh-border'
        }
      `}
    >
      {children}
    </button>
  );
}
