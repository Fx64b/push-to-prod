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

// Each era spans 10x more commits; LOC-per-commit scales up 10x per era.
// Era 0: commits  0–9,      1K LOC/commit
// Era 1: commits 10–99,    10K LOC/commit
// Era 2: commits 100–999, 100K LOC/commit  … and so on.
const COMMIT_ERA_SIZE = 10; // commits per era

export function getCommitInfo(totalLoc: number): {
  commits: number;
  threshold: number;
  progress: number;
} {
  let remaining = Math.max(0, totalLoc);
  let commits = 0;
  let threshold = 1_000;

  while (true) {
    const eraLoc = COMMIT_ERA_SIZE * threshold;
    if (remaining < eraLoc) break;
    remaining -= eraLoc;
    commits += COMMIT_ERA_SIZE;
    threshold *= 10;
  }

  const commitsInEra = Math.floor(remaining / threshold);
  commits += commitsInEra;
  const progress = (remaining % threshold) / threshold;
  return { commits, threshold, progress };
}

export function formatRate(n: number): string {
  return `${formatLOC(n)}/s`;
}

export function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}
