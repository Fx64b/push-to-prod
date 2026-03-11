import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { calculateLOCps } from '@/utils/production';

const MAX_OFFLINE_HOURS = 8;
const MAX_OFFLINE_SECONDS = MAX_OFFLINE_HOURS * 3600;

export function useOfflineProgress() {
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;

    const state = useGameStore.getState();
    const now = Date.now();
    const elapsed = (now - state.lastSaveTime) / 1000; // seconds

    if (elapsed < 5) return; // Don't bother for tiny gaps

    const cappedElapsed = Math.min(elapsed, MAX_OFFLINE_SECONDS);
    const locps = calculateLOCps(state);
    const legacyMult = 1 + state.legacyTokens * 0.05;
    const offlineLoc = locps * legacyMult * cappedElapsed;

    if (offlineLoc > 0) {
      state.addOfflineProgress(offlineLoc);
    }
  }, []);
}
