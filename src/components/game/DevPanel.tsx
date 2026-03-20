import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

const SUFFIXES = [
  { label: 'raw', value: 1 },
  { label: 'K', value: 1e3 },
  { label: 'M', value: 1e6 },
  { label: 'B', value: 1e9 },
  { label: 'T', value: 1e12 },
  { label: 'Qa', value: 1e15 },
  { label: 'Qi', value: 1e18 },
  { label: 'Sx', value: 1e21 },
  { label: 'Sp', value: 1e24 },
  { label: 'Oc', value: 1e27 },
  { label: 'No', value: 1e30 },
  { label: 'Dc', value: 1e33 },
  { label: 'Ud', value: 1e36 },
  { label: 'Dd', value: 1e39 },
  { label: 'Td', value: 1e42 },
  { label: 'Qad', value: 1e45 },
  { label: 'Qid', value: 1e48 },
  { label: 'Sxd', value: 1e51 },
  { label: 'Spd', value: 1e54 },
];

const IS_LOCALHOST =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export function DevPanel() {
  const [enabled, setEnabled] = useState(false);
  const [amount, setAmount] = useState('1');
  const [suffix, setSuffix] = useState('M');
  const setLoc = useGameStore((s) => s.setLoc);

  if (!IS_LOCALHOST) return null;

  const handleSet = () => {
    const multiplier = SUFFIXES.find((s) => s.label === suffix)?.value ?? 1;
    const parsed = parseFloat(amount);
    if (!isNaN(parsed) && parsed >= 0) {
      setLoc(parsed * multiplier);
    }
  };

  return (
    <div className="font-mono text-xs">
      <button
        onClick={() => setEnabled((e) => !e)}
        className={`px-2 py-1 rounded border transition-colors ${
          enabled
            ? 'border-gh-yellow text-gh-yellow hover:bg-gh-yellow/10'
            : 'border-gh-border text-gh-muted hover:border-gh-text/40 hover:text-gh-text'
        }`}
      >
        🛠 Dev
      </button>

      {enabled && (
        <div className="absolute right-0 top-8 z-50 bg-gh-surface border border-gh-yellow/40 rounded-md shadow-xl p-3 min-w-[240px] space-y-2">
          <div className="text-gh-yellow font-bold text-[10px] uppercase tracking-widest mb-1">
            Dev Mode
          </div>

          <div className="space-y-1">
            <div className="text-gh-muted text-[10px]">Set LOC</div>
            <div className="flex gap-1">
              <select
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className="bg-gh-bg border border-gh-border rounded px-1.5 py-1 text-gh-text focus:outline-none focus:border-gh-yellow/60 w-16"
              >
                {SUFFIXES.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSet()}
                className="flex-1 bg-gh-bg border border-gh-border rounded px-2 py-1 text-gh-text focus:outline-none focus:border-gh-yellow/60 min-w-0"
                placeholder="amount"
              />
              <button
                onClick={handleSet}
                className="px-2 py-1 rounded bg-gh-yellow/20 border border-gh-yellow/40 text-gh-yellow hover:bg-gh-yellow/30 transition-colors whitespace-nowrap"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
