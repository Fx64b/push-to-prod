export type LegacyEffect =
  | { type: 'production_bonus'; multiplier: number }
  | { type: 'start_loc'; amount: number }
  | { type: 'start_producer'; producers: { id: string; count: number }[] }
  | { type: 'keep_upgrade'; upgradeId: string }; // upgradeId or 'all-click'

export interface LegacyUpgrade {
  id: string;
  name: string;
  description: string;
  flavor: string;
  cost: number;
  effect: LegacyEffect;
}

export const LEGACY_UPGRADES: LegacyUpgrade[] = [
  // ── 1 token ──────────────────────────────────────────────────────────────
  {
    id: 'optimization-pass',
    name: 'Optimization Pass',
    description: '+10% global production',
    flavor: 'Profiling revealed the bottleneck was the developer.',
    cost: 1,
    effect: { type: 'production_bonus', multiplier: 1.1 },
  },
  {
    id: 'head-start',
    name: 'Head Start',
    description: 'Start each run with 500 LOC',
    flavor: 'Someone left comments. Helpful ones.',
    cost: 1,
    effect: { type: 'start_loc', amount: 500 },
  },
  {
    id: 'rubber-duck-inheritance',
    name: 'Rubber Duck Inheritance',
    description: 'Start each run with 1 Rubber Duck',
    flavor: 'It remembers everything.',
    cost: 1,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 1 }] },
  },
  {
    id: 'muscle-memory',
    name: 'Muscle Memory',
    description: 'Keep Standing Desk upgrade on reset',
    flavor: 'Your posture never forgets.',
    cost: 1,
    effect: { type: 'keep_upgrade', upgradeId: 'standing-desk' },
  },

  // ── 2 tokens ─────────────────────────────────────────────────────────────
  {
    id: 'architecture-review',
    name: 'Architecture Review',
    description: '+25% global production',
    flavor: 'The diagram fits on one whiteboard now.',
    cost: 2,
    effect: { type: 'production_bonus', multiplier: 1.25 },
  },
  {
    id: 'bootstrapped',
    name: 'Bootstrapped',
    description: 'Start each run with 5,000 LOC',
    flavor: 'Found an old branch with working code.',
    cost: 2,
    effect: { type: 'start_loc', amount: 5000 },
  },
  {
    id: 'senior-on-call',
    name: 'Senior on Call',
    description: 'Start each run with 1 Senior Dev',
    flavor: 'They know where all the bodies are buried.',
    cost: 2,
    effect: { type: 'start_producer', producers: [{ id: 'senior-dev', count: 1 }] },
  },

  // ── 3 tokens ─────────────────────────────────────────────────────────────
  {
    id: 'click-mastery',
    name: 'Click Mastery',
    description: 'Keep all click upgrades on reset',
    flavor: "Your fingers remember what your codebase doesn't.",
    cost: 3,
    effect: { type: 'keep_upgrade', upgradeId: 'all-click' },
  },

  // ── 5 tokens ─────────────────────────────────────────────────────────────
  {
    id: 'rewrite-from-scratch',
    name: 'Rewrite from Scratch',
    description: '×2 global production',
    flavor: "This time it'll be clean. This time.",
    cost: 5,
    effect: { type: 'production_bonus', multiplier: 2.0 },
  },
  {
    id: 'dream-team',
    name: 'Dream Team',
    description: 'Start each run with 1 of the first 5 producers',
    flavor: 'They shipped. They always ship.',
    cost: 5,
    effect: {
      type: 'start_producer',
      producers: [
        { id: 'rubber-duck', count: 1 },
        { id: 'mechanical-keyboard', count: 1 },
        { id: 'autocomplete', count: 1 },
        { id: 'stackoverflow-tab', count: 1 },
        { id: 'junior-dev', count: 1 },
      ],
    },
  },

  // ── 10 tokens ────────────────────────────────────────────────────────────
  {
    id: 'the-singularity',
    name: 'The Singularity',
    description: '×5 global production',
    flavor: 'It compiled on the first try.',
    cost: 10,
    effect: { type: 'production_bonus', multiplier: 5.0 },
  },
];
