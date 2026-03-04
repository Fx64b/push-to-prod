import { useCallback, useEffect, useState } from 'react';
import { getDuckapocalypseStage } from '@/data/lore';
import { useGameStore } from '@/store/gameStore';

interface AmbientText {
  id: number;
  text: string;
  x: number; // percent
  y: number; // percent
  color: string;
}

const DUCK_SOUNDS_BY_STAGE: Record<number, string[]> = {
  0: ['quack', '*quack*', 'quack?', '...', 'hmm', 'quack quack'],
  1: ['quack', '*quack*', 'quack?', '...', 'you know what you did', 'changes requested', 'git blame: you', 'observed.'],
  2: ['*quack*', 'we remember', '// TODO: reckoning', 'in committee', 'motion passed', 'changes requested', 'observed.'],
  3: ['🦆', 'PR #∞', 'we are the code', 'quack.exe', 'we have always been here', '🦆🦆🦆', 'motion passed unanimously'],
};

const PRODUCER_SOUNDS: Record<string, { sounds: string[]; color: string }> = {
  'rubber-duck': {
    sounds: DUCK_SOUNDS_BY_STAGE[0],
    color: 'text-yellow-400',
  },
  'mechanical-keyboard': {
    sounds: ['*clack*', 'clack', 'CLACK', 'clackity', 'clack clack', 'clk clk clk'],
    color: 'text-gh-muted',
  },
  autocomplete: {
    sounds: ['...', 'tab ✓', 'accepted', '→ done', '// suggested', 'complete'],
    color: 'text-gh-blue',
  },
  'stackoverflow-tab': {
    sounds: ['CTRL+C', 'CTRL+V', 'copied!', '// found it', 'paste', 'duplicate?'],
    color: 'text-orange-400',
  },
  'junior-dev': {
    sounds: ['it works!', 'idk lol', 'git push -f', '// TODO: fix', 'oops', 'works on my machine'],
    color: 'text-pink-400',
  },
  'senior-dev': {
    sounds: ['git blame', 'LGTM', 'delete this', 'no tests needed', 'revert', 'nope.'],
    color: 'text-gh-muted',
  },
  '10x-engineer': {
    sounds: ['O(1)', 'blazing fast', 'ship it', '10x', 'trivial'],
    color: 'text-gh-yellow',
  },
  'github-copilot': {
    sounds: ['// suggestion', 'accept?', '\t✓', 'generating...', 'inline ✓'],
    color: 'text-purple-400',
  },
  'ai-agent': {
    sounds: ['deploying...', 'PR merged', 'CI ✓', '47 features shipped', 'LGTM x47'],
    color: 'text-gh-green',
  },
  agi: {
    sounds: ['...', 'done.', '✓', '*thinking*', 'universe refactored'],
    color: 'text-cyan-400',
  },
};

let ambientId = 0;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function AmbientTexts() {
  const producers = useGameStore((s) => s.producers);
  const [texts, setTexts] = useState<AmbientText[]>([]);

  const duckStage = getDuckapocalypseStage(producers['rubber-duck'] ?? 0);

  const spawn = useCallback((producerId: string) => {
    const def = PRODUCER_SOUNDS[producerId];
    if (!def) return;
    const sounds = producerId === 'rubber-duck' ? DUCK_SOUNDS_BY_STAGE[duckStage] : def.sounds;
    const text: AmbientText = {
      id: ambientId++,
      text: pick(sounds),
      // cluster around center area, near the LOC counter
      x: 25 + Math.random() * 50,
      y: 25 + Math.random() * 40,
      color: def.color,
    };
    setTexts((prev) => [...prev, text]);
    setTimeout(() => {
      setTexts((prev) => prev.filter((t) => t.id !== text.id));
    }, 2200);
  }, [duckStage]);

  useEffect(() => {
    // 500ms tick: for each owned producer, roll to spawn
    const interval = setInterval(() => {
      for (const [id, count] of Object.entries(producers)) {
        if (count <= 0 || !PRODUCER_SOUNDS[id]) continue;
        // chance scales with log of count so it doesn't go nuts
        const chance = Math.min(0.92, Math.log1p(count) * 0.12);
        if (Math.random() < chance) {
          spawn(id);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [producers, spawn]);

  return (
    <>
      {texts.map((t) => (
        <div
          key={t.id}
          className={`
            absolute pointer-events-none font-mono text-xs italic opacity-70
            animate-[floatUp_2.2s_ease-out_forwards] z-10
            ${t.color}
          `}
          style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {t.text}
        </div>
      ))}
    </>
  );
}
