import { memo } from 'react';
import { type FloatingText, useGameStore } from '@/store/gameStore';

// Memoized so existing items don't re-render when new ones are added.
// Cleanup is handled in the tick loop (no per-item timers needed).
const FloatingTextItem = memo(function FloatingTextItem({ text }: { text: FloatingText }) {
  return (
    <div
      className="absolute pointer-events-none font-mono font-bold text-gh-green text-sm animate-[floatUp_1s_ease-out_forwards] z-10"
      style={{ left: text.x, top: text.y, transform: 'translate(-50%, -50%)' }}
    >
      {text.value}
    </div>
  );
});

export function FloatingTexts() {
  const floatingTexts = useGameStore((s) => s.floatingTexts);

  return (
    <>
      {floatingTexts.map((ft) => (
        <FloatingTextItem key={ft.id} text={ft} />
      ))}
    </>
  );
}
