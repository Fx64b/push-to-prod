import { useState } from 'react';
import { type TechStack, useGameStore } from '@/store/gameStore';

const STACKS: {
  id: TechStack;
  emoji: string;
  name: string;
  tagline: string;
  bonus: string;
}[] = [
  {
    id: 'typescript',
    emoji: '🔷',
    name: 'TypeScript',
    tagline: 'Type-safe. Predictable. The compiler is your therapist.',
    bonus: 'All production ×1.3',
  },
  {
    id: 'rust',
    emoji: '🦀',
    name: 'Rust',
    tagline: 'Borrow checker. No GC. Blazingly fast. Worth it.',
    bonus: 'All production ×2.0',
  },
  {
    id: 'php',
    emoji: '🐘',
    name: 'PHP',
    tagline: "It powers 80% of the web. Don't think about it too hard.",
    bonus: 'Click value ×3.0, production ×1.2',
  },
  {
    id: 'blockchain',
    emoji: '⛓️',
    name: 'Blockchain',
    tagline: "Decentralized. Trustless. The VC said it's the future.",
    bonus: 'All production ×1.5',
  },
];

export function PivotButton() {
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const techStack = useGameStore((s) => s.techStack);
  const pivot = useGameStore((s) => s.pivot);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TechStack | null>(null);
  const [confirming, setConfirming] = useState(false);

  // Only show after 5 refactors and no stack chosen yet
  if (prestigeCount < 5 || techStack !== null) return null;

  const handlePivot = () => {
    if (!selected) return;
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    pivot(selected);
    setOpen(false);
    setSelected(null);
    setConfirming(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-1.5 rounded border border-gh-yellow/60 bg-gh-yellow/10 text-gh-yellow text-sm font-bold font-mono hover:border-gh-yellow hover:bg-gh-yellow/20 transition-all"
      >
        🔀 Pivot to Tech Stack
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg bg-gh-bg border border-gh-border rounded-lg shadow-2xl font-mono overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gh-border">
              <h2 className="text-gh-yellow font-bold text-base">🔀 Choose Your Tech Stack</h2>
              <p className="text-gh-muted text-xs mt-1">
                Permanent bonus. Resets your run. The investors weren't consulted.
              </p>
            </div>

            {/* Stack options */}
            <div className="p-4 space-y-2">
              {STACKS.map((stack) => (
                <button
                  key={stack.id}
                  onClick={() => {
                    setSelected(stack.id);
                    setConfirming(false);
                  }}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    selected === stack.id
                      ? 'border-gh-yellow bg-gh-yellow/10'
                      : 'border-gh-border bg-gh-surface/40 hover:border-gh-border/80'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{stack.emoji}</span>
                    <span className="font-bold text-gh-text text-sm">{stack.name}</span>
                    <span className="ml-auto text-[11px] text-gh-blue font-bold">
                      {stack.bonus}
                    </span>
                  </div>
                  <p className="text-gh-muted text-[11px] italic pl-7">"{stack.tagline}"</p>
                </button>
              ))}
            </div>

            {/* Confirm */}
            <div className="px-5 py-4 border-t border-gh-border flex items-center justify-between gap-3">
              <p className="text-[11px] text-gh-muted">
                ⚠️ Resets all LOC and producers. Legacy items and achievements kept.
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setOpen(false);
                    setSelected(null);
                    setConfirming(false);
                  }}
                  className="px-3 py-1.5 rounded border border-gh-border text-gh-muted text-xs hover:border-gh-text/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePivot}
                  disabled={!selected}
                  className={`px-3 py-1.5 rounded border text-xs font-bold transition-all ${
                    !selected
                      ? 'border-gh-border/40 text-gh-muted cursor-not-allowed'
                      : confirming
                        ? 'border-gh-red bg-gh-red/20 text-gh-red animate-pulse'
                        : 'border-gh-yellow/60 bg-gh-yellow/10 text-gh-yellow hover:bg-gh-yellow/20'
                  }`}
                >
                  {confirming ? '⚠️ Confirm Pivot?' : 'Pivot →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
