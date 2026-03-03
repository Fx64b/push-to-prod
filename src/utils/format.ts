const SUFFIXES = [
  { value: 1e15, label: 'Qa' },
  { value: 1e12, label: 'T' },
  { value: 1e9, label: 'B' },
  { value: 1e6, label: 'M' },
  { value: 1e3, label: 'K' },
];

export function formatLOC(n: number): string {
  if (!Number.isFinite(n) || Number.isNaN(n)) return '0';
  if (n < 0) return `-${formatLOC(-n)}`;

  for (const { value, label } of SUFFIXES) {
    if (n >= value) {
      const divided = n / value;
      // Always 3 decimal places to keep width stable (e.g. 1.350K not 1.35K)
      const decimals = divided >= 100 ? 1 : divided >= 10 ? 2 : 3;
      return divided.toFixed(decimals) + label;
    }
  }

  return Math.floor(n).toLocaleString('en-US');
}

export function formatRate(n: number): string {
  return `${formatLOC(n)}/s`;
}

export function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}
