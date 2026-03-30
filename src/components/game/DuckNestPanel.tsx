import { useGameStore } from '@/store/gameStore';
import { formatLOC } from '@/utils/format';

export function DuckNestPanel() {
  const nestedDucks = useGameStore((s) => s.nestedDucks);
  const architectureUpgrades = useGameStore((s) => s.architectureUpgrades);
  const popNestedDuck = useGameStore((s) => s.popNestedDuck);

  if (!architectureUpgrades.includes('nest-protocol') || nestedDucks.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-1 font-mono">
      <div className="text-[10px] text-gh-muted text-center">
        🦆 Ducks nesting on your producers
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {nestedDucks.map((duck) => (
          <button
            key={duck.id}
            onClick={() => popNestedDuck(duck.id)}
            title={`Click to pop! Stored: ${formatLOC(duck.storedLoc)} → get ${formatLOC(duck.storedLoc * 1.4)}`}
            className="flex flex-col items-center px-3 py-1.5 rounded border border-gh-yellow/40 bg-gh-yellow/10 hover:border-gh-yellow hover:bg-gh-yellow/20 transition-all cursor-pointer group"
          >
            <span className="text-lg leading-none group-hover:scale-110 transition-transform">🦆</span>
            <span className="text-[10px] text-gh-yellow font-bold tabular-nums mt-0.5">
              {formatLOC(duck.storedLoc)}
            </span>
            <span className="text-[9px] text-gh-muted">{duck.producerId.replace(/-/g, ' ')}</span>
          </button>
        ))}
      </div>
      <div className="text-[9px] text-gh-muted/60 text-center">
        Pop for ×1.4 stored LOC
      </div>
    </div>
  );
}
