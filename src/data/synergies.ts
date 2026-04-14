export interface SynergyCondition {
  producerId: string;
  minCount: number;
}

export interface Synergy {
  id: string;
  name: string;
  description: string;
  icon: string;
  flavor: string;
  /** All conditions must be met for the synergy to activate. */
  conditions: SynergyCondition[];
  /** Global production multiplier when active. */
  multiplier: number;
}

export const SYNERGIES: Synergy[] = [
  // ── Early-ish Synergies (reachable after first GR runs) ───────────────────
  {
    id: 'full-stack-team',
    name: 'Full Stack Team',
    description: '×1.5 global production',
    icon: '👥',
    flavor: 'Front-end, back-end, and the one who fixes the build.',
    conditions: [
      { producerId: 'junior-dev', minCount: 10 },
      { producerId: 'senior-dev', minCount: 5 },
      { producerId: 'tech-lead', minCount: 3 },
    ],
    multiplier: 1.5,
  },
  {
    id: 'coffee-pipeline',
    name: 'The Coffee Pipeline',
    description: '×1.8 global production',
    icon: '☕🔧',
    flavor: 'CI/CD: Caffeine In, Code Deployed.',
    conditions: [
      { producerId: 'coffee-machine', minCount: 50 },
      { producerId: 'senior-dev', minCount: 10 },
    ],
    multiplier: 1.8,
  },
  {
    id: 'keyboard-army',
    name: 'Keyboard Army',
    description: '×1.5 global production',
    icon: '⌨️⚔️',
    flavor: 'CLACK CLACK CLACK — they type in formation.',
    conditions: [
      { producerId: 'mechanical-keyboard', minCount: 50 },
      { producerId: 'autocomplete', minCount: 25 },
    ],
    multiplier: 1.5,
  },

  // ── Mid-tier Synergies ────────────────────────────────────────────────────
  {
    id: 'ai-dominion',
    name: 'AI Dominion',
    description: '×2 global production',
    icon: '🤖👑',
    flavor: 'The AI reports to a bigger AI. You report to neither.',
    conditions: [
      { producerId: 'github-copilot', minCount: 5 },
      { producerId: 'ai-agent', minCount: 3 },
      { producerId: 'agi', minCount: 1 },
    ],
    multiplier: 2,
  },
  {
    id: 'duck-empire',
    name: 'Duck Empire',
    description: '×3 global production',
    icon: '🦆👑',
    flavor: 'The ducks outnumber the engineers. They always did.',
    conditions: [
      { producerId: 'rubber-duck', minCount: 200 },
      { producerId: 'duck-collective-llc', minCount: 1 },
    ],
    multiplier: 3,
  },
  {
    id: 'post-human-coalition',
    name: 'Post-Human Coalition',
    description: '×2.5 global production',
    icon: '⚛️🤝',
    flavor: 'They formed a council. You were not invited.',
    conditions: [
      { producerId: 'quantum-computer', minCount: 3 },
      { producerId: 'the-singularity', minCount: 2 },
      { producerId: 'the-consultant', minCount: 1 },
    ],
    multiplier: 2.5,
  },
  {
    id: 'complete-architecture',
    name: 'Complete Architecture',
    description: '×2 global production',
    icon: '🏗️✅',
    flavor: 'Every box on the diagram is filled. Ship it.',
    conditions: [
      { producerId: 'rubber-duck', minCount: 1 },
      { producerId: 'mechanical-keyboard', minCount: 1 },
      { producerId: 'coffee-machine', minCount: 1 },
      { producerId: 'autocomplete', minCount: 1 },
      { producerId: 'stackoverflow-tab', minCount: 1 },
      { producerId: 'junior-dev', minCount: 1 },
      { producerId: 'senior-dev', minCount: 1 },
      { producerId: 'tech-lead', minCount: 1 },
      { producerId: 'github-copilot', minCount: 1 },
      { producerId: 'quantum-computer', minCount: 1 },
    ],
    multiplier: 2,
  },

  // ── Late-tier Synergies (Era 5+) ──────────────────────────────────────────
  {
    id: 'infinite-recursion-loop',
    name: 'Infinite Recursion',
    description: '×3 global production',
    icon: '🔄♾️',
    flavor: 'The loop is aware of itself. It approves.',
    conditions: [
      { producerId: 'the-process', minCount: 5 },
      { producerId: 'sentient-codebase', minCount: 3 },
      { producerId: 'recursive-self', minCount: 1 },
    ],
    multiplier: 3,
  },
  {
    id: 'meta-loop',
    name: 'The Meta Loop',
    description: '×5 global production',
    icon: '🌀🌌',
    flavor: 'The loop loops the loop. You are the variable and the function.',
    conditions: [
      { producerId: 'the-process', minCount: 10 },
      { producerId: 'sentient-codebase', minCount: 10 },
      { producerId: 'duck-collective-llc', minCount: 5 },
      { producerId: 'recursive-self', minCount: 5 },
    ],
    multiplier: 5,
  },
  {
    id: 'monkey-business',
    name: 'Monkey Business',
    description: '×2 global production',
    icon: '🐒💼',
    flavor: 'The monkeys incorporated. Series A valued at ∞.',
    conditions: [
      { producerId: 'infinite-monkey-farm', minCount: 10 },
      { producerId: 'the-consultant', minCount: 5 },
    ],
    multiplier: 2,
  },

  // ── Ultra late-tier Synergies (Era 6 / Beyond) ────────────────────────────
  {
    id: 'beyond-convergence',
    name: 'Beyond Convergence',
    description: '×4 global production',
    icon: '🌀⚡',
    flavor: 'Every era, every producer, every loop — converging on one PR.',
    conditions: [
      { producerId: 'multiverse-compiler', minCount: 3 },
      { producerId: 'the-boardroom', minCount: 2 },
      { producerId: 'recursive-self', minCount: 5 },
    ],
    multiplier: 4,
  },
  {
    id: 'reality-stack',
    name: 'The Reality Stack',
    description: '×8 global production',
    icon: '⚡🌐✨',
    flavor: 'The stack is reality itself. Kubectl get universe.',
    conditions: [
      { producerId: 'reality-engine', minCount: 3 },
      { producerId: 'multiverse-compiler', minCount: 5 },
      { producerId: 'the-boardroom', minCount: 5 },
    ],
    multiplier: 8,
  },
  {
    id: 'final-architecture',
    name: 'The Final Architecture',
    description: '×15 global production',
    icon: '🚀∞🏗️',
    flavor: 'There is nothing left to build. There is nothing left to refactor. It is perfect.',
    conditions: [
      { producerId: 'the-final-push', minCount: 3 },
      { producerId: 'reality-engine', minCount: 5 },
      { producerId: 'multiverse-compiler', minCount: 10 },
      { producerId: 'recursive-self', minCount: 10 },
    ],
    multiplier: 15,
  },
];

/**
 * Compute the combined synergy multiplier for the current producer state.
 * Returns 1 if no synergies are active.
 */
export function computeSynergyMult(
  producers: Record<string, number>,
  enhancedSynergies: boolean,
): number {
  let mult = 1;
  for (const synergy of SYNERGIES) {
    const active = synergy.conditions.every((c) => (producers[c.producerId] ?? 0) >= c.minCount);
    if (active) {
      const bonus = enhancedSynergies ? synergy.multiplier * 2 - 1 : synergy.multiplier;
      mult *= bonus;
    }
  }
  return mult;
}

/**
 * Returns the list of active synergy IDs for the current producer state.
 */
export function getActiveSynergies(producers: Record<string, number>): string[] {
  return SYNERGIES.filter((synergy) =>
    synergy.conditions.every((c) => (producers[c.producerId] ?? 0) >= c.minCount),
  ).map((s) => s.id);
}
