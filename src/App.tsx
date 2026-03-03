import { useRef, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useOfflineProgress } from '@/hooks/useOfflineProgress';
import { useGameStore } from '@/store/gameStore';
import { EnterKey } from '@/components/game/EnterKey';
import { LOCDisplay } from '@/components/game/LOCDisplay';
import { StatsPanel } from '@/components/game/StatsPanel';
import { Shop } from '@/components/game/Shop';
import { EventBanner } from '@/components/game/EventBanner';
import { AchievementToast } from '@/components/game/AchievementToast';
import { RefactorButton } from '@/components/game/RefactorButton';
import { FloatingTexts } from '@/components/game/FloatingTexts';
import { AmbientTexts } from '@/components/game/AmbientTexts';
import { RotateCcw, Download } from 'lucide-react';

function SettingsPopover() {
  const [open, setOpen] = useState(false);
  const newGame = useGameStore(s => s.newGame);

  const handleExport = () => {
    const state = localStorage.getItem('push-to-prod-v1');
    if (!state) return;
    const blob = new Blob([state], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'push-to-prod-save.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-gh-muted hover:text-gh-text text-xs px-2 py-1 rounded border border-gh-border hover:border-gh-text/40 transition-colors font-mono"
      >
        ⚙️ Settings
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-50 bg-gh-surface border border-gh-border rounded-md shadow-xl p-2 min-w-[160px] font-mono text-xs space-y-1">
            <button
              onClick={() => { handleExport(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gh-border/30 text-gh-text transition-colors"
            >
              <Download size={12} /> Export Save
            </button>
            <div className="border-t border-gh-border my-1" />
            <button
              onClick={() => {
                if (window.confirm('Start a new game? All progress will be lost.')) {
                  newGame();
                  setOpen(false);
                }
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gh-red/20 text-gh-red transition-colors"
            >
              <RotateCcw size={12} /> New Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  useGameLoop();
  useOfflineProgress();

  const _centerRef = useRef<HTMLDivElement>(null);

  return (
    <TooltipPrimitive.Provider delayDuration={300}>
    <div className="min-h-screen bg-gh-bg flex flex-col text-gh-text">
      {/* Header */}
      <header className="border-b border-gh-border bg-gh-surface/50 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="font-mono">
          <span className="text-gh-green font-bold">push</span>
          <span className="text-gh-muted"> to </span>
          <span className="text-gh-blue font-bold">prod</span>
        </div>
        <SettingsPopover />
      </header>

      {/* Event banner */}
      <div className="px-4 pt-2">
        <EventBanner />
      </div>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Stats panel */}
        <aside className="w-48 shrink-0 border-r border-gh-border bg-gh-surface/30 p-3 overflow-y-auto">
          <StatsPanel />
        </aside>

        {/* CENTER: Clicker */}
        <main
          ref={_centerRef}
          className="flex-1 flex flex-col items-center justify-center gap-6 p-6 relative overflow-hidden"
        >
          <FloatingTexts />
          <AmbientTexts />
          <LOCDisplay />
          <EnterKey />
          <RefactorButton />
        </main>

        {/* RIGHT: Shop */}
        <aside className="w-72 shrink-0 border-l border-gh-border bg-gh-surface/30 overflow-hidden flex flex-col">
          <Shop />
        </aside>
      </div>

      {/* Achievement toasts */}
      <AchievementToast />
    </div>
    </TooltipPrimitive.Provider>
  );
}
