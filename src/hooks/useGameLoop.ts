import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

export function useGameLoop() {
  const tick = useGameStore(s => s.tick);
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      tick(Math.min(dt, 1)); // cap at 1s to avoid huge jumps
    }, 100);

    return () => clearInterval(interval);
  }, [tick]);
}
