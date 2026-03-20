import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';

export function WelcomePopup() {
  const totalClicks = useGameStore((s) => s.totalClicks);
  const totalLoc = useGameStore((s) => s.totalLoc);
  const productName = useGameStore((s) => s.productName);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (totalClicks === 0 && totalLoc === 0 && prestigeCount === 0) {
      setVisible(true);
    }
  }, [totalClicks, totalLoc, prestigeCount]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto bg-gh-surface border border-gh-border rounded-lg shadow-2xl max-w-sm w-full font-mono overflow-hidden">
          {/* Terminal-style header bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gh-bg border-b border-gh-border">
            <span className="w-3 h-3 rounded-full bg-gh-red/70" />
            <span className="w-3 h-3 rounded-full bg-gh-yellow/70" />
            <span className="w-3 h-3 rounded-full bg-gh-green/70" />
            <span className="ml-2 text-xs text-gh-muted">push-to-prod — welcome.sh</span>
          </div>

          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold">
                <span className="text-gh-green">push</span>
                <span className="text-gh-muted"> to </span>
                <span className="text-gh-blue">prod</span>
              </div>
              <div className="text-xs text-gh-muted tracking-widest uppercase">
                v0.0.1-alpha — unstable
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gh-border" />

            {/* Lore hint */}
            <div className="space-y-3 text-sm text-gh-text/90">
              <p>Every great codebase started with a single line of code.</p>
              <p className="text-gh-muted text-xs leading-relaxed">
                You're the founding engineer at{' '}
                <span className="text-gh-purple font-bold">{productName}</span> — a scrappy startup
                with big dreams and zero tests. Press{' '}
                <kbd className="px-1.5 py-0.5 bg-gh-bg border border-gh-border rounded text-gh-green text-xs">
                  ENTER
                </kbd>{' '}
                to write your first lines of code.
              </p>
              <p className="text-gh-yellow/80 text-xs leading-relaxed">
                ⚠️ Rumour has it the rubber ducks in the office have been{' '}
                <span className="italic">unusually quiet</span> lately. Probably nothing.
              </p>
            </div>

            {/* CTA button */}
            <button
              onClick={() => setVisible(false)}
              className="w-full py-2.5 rounded bg-gh-green/20 border border-gh-green/40 text-gh-green hover:bg-gh-green/30 hover:border-gh-green/60 transition-colors text-sm font-bold tracking-wide"
            >
              $ git init &amp;&amp; ship it
            </button>

            <p className="text-center text-[10px] text-gh-muted/60">click anywhere to dismiss</p>
          </div>
        </div>
      </div>
    </>
  );
}
