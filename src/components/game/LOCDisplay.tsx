import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useGameStore } from '@/store/gameStore';
import { formatLOC, formatRate, getCommitInfo, splitLOC } from '@/utils/format';

export function LOCDisplay() {
  const loc = useGameStore((s) => s.loc);
  const totalLoc = useGameStore((s) => s.totalLoc);
  const activeEvent = useGameStore((s) => s.activeEvent);
  const displayedLOCps = useGameStore((s) => s.displayedLOCps);

  const { commits, threshold, progress: progressToNextCommit } = getCommitInfo(totalLoc);

  const split = splitLOC(loc);

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Main LOC counter */}
      <div className="text-center">
        <div
          className="text-5xl font-mono font-bold tabular-nums text-gh-green"
          style={{ textShadow: '0 0 20px rgba(57, 211, 83, 0.4)' }}
        >
          {split ? (
            <>
              {split.num}
              <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                  <span className="cursor-default underline decoration-dotted decoration-gh-green/40">
                    {split.label}
                  </span>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                  <TooltipPrimitive.Content
                    side="top"
                    className="animate-tooltip-in bg-gh-surface border border-gh-border text-gh-muted font-mono text-xs px-2 py-1 rounded shadow-lg z-50"
                  >
                    {split.full}
                  </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
              </TooltipPrimitive.Root>
            </>
          ) : (
            formatLOC(loc)
          )}
        </div>
        <div className="text-gh-muted text-sm font-mono mt-1">lines of code</div>
      </div>

      {/* LOC/s rate */}
      <div className="flex items-center gap-2 text-gh-muted font-mono text-sm">
        <span className="text-gh-blue">{formatRate(displayedLOCps)}</span>
        {activeEvent && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded ${activeEvent.isNegative ? 'bg-gh-red/20 text-gh-red' : 'bg-gh-green/20 text-gh-green'}`}
          >
            {activeEvent.emoji} event active
          </span>
        )}
      </div>

      {/* Commit progress */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs font-mono text-gh-muted mb-1">
          <span>commit #{commits.toLocaleString()}</span>
          <span>{formatLOC(progressToNextCommit * threshold)} / {formatLOC(threshold)} LOC</span>
        </div>
        <div className="h-1.5 bg-gh-surface rounded-full overflow-hidden border border-gh-border">
          <div
            className="h-full bg-gh-green rounded-full transition-all duration-300"
            style={{ width: `${progressToNextCommit * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
