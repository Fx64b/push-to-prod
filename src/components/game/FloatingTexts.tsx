import { useEffect } from 'react';
import { useGameStore, type FloatingText } from '@/store/gameStore';

function FloatingTextItem({ text, onDone }: { text: FloatingText; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="absolute pointer-events-none font-mono font-bold text-gh-green text-sm animate-[floatUp_1s_ease-out_forwards] z-10"
      style={{ left: text.x, top: text.y, transform: 'translate(-50%, -50%)' }}
    >
      {text.value}
    </div>
  );
}

export function FloatingTexts() {
  const floatingTexts = useGameStore(s => s.floatingTexts);
  const removeFloatingText = useGameStore(s => s.removeFloatingText);

  return (
    <>
      {floatingTexts.map(ft => (
        <FloatingTextItem
          key={ft.id}
          text={ft}
          onDone={() => removeFloatingText(ft.id)}
        />
      ))}
    </>
  );
}
