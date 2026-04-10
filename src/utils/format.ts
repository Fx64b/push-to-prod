const SUFFIXES = [
  { value: 1e60, label: 'Nvd', full: 'novemdecillion' },
  { value: 1e57, label: 'Ocd', full: 'octodecillion' },
  { value: 1e54, label: 'Spd', full: 'septendecillion' },
  { value: 1e51, label: 'Sxd', full: 'sexdecillion' },
  { value: 1e48, label: 'Qid', full: 'quindecillion' },
  { value: 1e45, label: 'Qad', full: 'quattuordecillion' },
  { value: 1e42, label: 'Td', full: 'tredecillion' },
  { value: 1e39, label: 'Dd', full: 'duodecillion' },
  { value: 1e36, label: 'Ud', full: 'undecillion' },
  { value: 1e33, label: 'Dc', full: 'decillion' },
  { value: 1e30, label: 'No', full: 'nonillion' },
  { value: 1e27, label: 'Oc', full: 'octillion' },
  { value: 1e24, label: 'Sp', full: 'septillion' },
  { value: 1e21, label: 'Sx', full: 'sextillion' },
  { value: 1e18, label: 'Qi', full: 'quintillion' },
  { value: 1e15, label: 'Qa', full: 'quadrillion' },
  { value: 1e12, label: 'T', full: 'trillion' },
  { value: 1e9, label: 'B', full: 'billion' },
  { value: 1e6, label: 'M', full: 'million' },
  { value: 1e3, label: 'K', full: 'thousand' },
];

export function formatLOC(n: number): string {
  if (!Number.isFinite(n) || Number.isNaN(n)) return '0';
  if (n < 0) return `-${formatLOC(-n)}`;

  for (const { value, label } of SUFFIXES) {
    if (n >= value) {
      const divided = n / value;
      const decimals = divided >= 100 ? 1 : divided >= 10 ? 2 : 3;
      return divided.toFixed(decimals) + label;
    }
  }

  return Math.floor(n).toLocaleString('en-US');
}

/** Returns the number string and suffix label+fullname separately for tooltip rendering. */
export function splitLOC(n: number): { num: string; label: string; full: string } | null {
  if (!Number.isFinite(n) || Number.isNaN(n) || n < 0) return null;

  for (const { value, label, full } of SUFFIXES) {
    if (n >= value) {
      const divided = n / value;
      const decimals = divided >= 100 ? 1 : divided >= 10 ? 2 : 3;
      return { num: divided.toFixed(decimals), label, full };
    }
  }

  return null;
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
  let threshold = 250;

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
