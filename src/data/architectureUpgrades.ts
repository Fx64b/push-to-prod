export type ArchitectureEffect =
  | { type: 'event_horizon' }       // positive events last 2× longer
  | { type: 'debt_forgiveness' }    // technical debt accumulates 25% slower
  | { type: 'fast_learner' }        // legacy upgrades cost 20% fewer tokens
  | { type: 'recursive_memory' }    // start each run with 10% of last run's peak LOC
  | { type: 'unlock_duck_nesting' } // enables the duck nesting mechanic
  | { type: 'compounding_interest' }// +2% global production per regular prestige
  | { type: 'event_driven' }        // +0.5% permanent production per negative event survived
  | { type: 'production_bonus'; multiplier: number }
  | { type: 'unlock_second_system' }// unlocks 5 additional high-tier legacy upgrades
  | { type: 'protocol_breach' }     // unlocks Phase 5 "The Loop" events
  | { type: 'ap_multiplier' }       // doubles AP earned in all future Great Refactors
  | { type: 'token_proliferation' }  // each prestige grants +1 bonus Legacy Token
  | { type: 'infinite_feedback_loop' }; // +5% permanent production per Great Refactor (+5% each GR, no cap)

export interface ArchitectureUpgrade {
  id: string;
  name: string;
  description: string;
  flavor: string;
  cost: number; // Architecture Points
  effect: ArchitectureEffect;
}

export const ARCHITECTURE_UPGRADES: ArchitectureUpgrade[] = [
  // ── 1 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    description: 'Positive events last 2× longer',
    flavor: 'Good things take time. You have learned to hold them.',
    cost: 1,
    effect: { type: 'event_horizon' },
  },
  {
    id: 'debt-forgiveness',
    name: 'Debt Forgiveness',
    description: 'Technical debt accumulates 25% slower',
    flavor: 'The codebase has forgiven you. For now.',
    cost: 1,
    effect: { type: 'debt_forgiveness' },
  },

  // ── 2 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'fast-learner',
    name: 'Fast Learner',
    description: 'Legacy upgrades cost 20% fewer tokens (min 1)',
    flavor: 'You have done this before. The muscle memory is structural now.',
    cost: 2,
    effect: { type: 'fast_learner' },
  },
  {
    id: 'recursive-memory',
    name: 'Recursive Memory',
    description: 'Each run starts with 10% of the previous run\'s peak LOC',
    flavor: 'The codebase remembers where you left off. It kept a copy.',
    cost: 2,
    effect: { type: 'recursive_memory' },
  },

  // ── 3 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'nest-protocol',
    name: 'Nest Protocol',
    description: 'Rubber ducks can nest on producers, leeching and storing LOC. Click to pop them for 1.4× the stored amount.',
    flavor: 'The ducks have filed a property claim. The arbitration ruled in their favor.',
    cost: 3,
    effect: { type: 'unlock_duck_nesting' },
  },
  {
    id: 'compounding-interest',
    name: 'Compounding Interest',
    description: '+2% global production per regular prestige (stacks)',
    flavor: 'Each loop compounds. The interest accrues. The ducks are aware.',
    cost: 3,
    effect: { type: 'compounding_interest' },
  },

  // ── 5 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'event-driven',
    name: 'Event-Driven Architecture',
    description: 'Surviving each negative event permanently adds +0.5% global production (stacks)',
    flavor: 'Every production outage was a training run. You are the model now.',
    cost: 5,
    effect: { type: 'event_driven' },
  },
  {
    id: 'loop-accelerant',
    name: 'Loop Accelerant',
    description: '×2 global production',
    flavor: 'Second time through, everything goes faster. The codebase anticipated this.',
    cost: 5,
    effect: { type: 'production_bonus', multiplier: 2.0 },
  },

  // ── 6 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'second-system',
    name: 'Second System',
    description: 'Unlocks 5 additional high-tier Legacy upgrades (available in the Legacy Shop)',
    flavor: 'The second system is always more ambitious than the first. The ducks approved the spec.',
    cost: 6,
    effect: { type: 'unlock_second_system' },
  },

  // ── 8 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'protocol-breach',
    name: 'Protocol Breach',
    description: 'Unlocks Phase 5 "The Loop" events — the game remembers you',
    flavor: 'You were not supposed to reach this. The events file has a note about you.',
    cost: 8,
    effect: { type: 'protocol_breach' },
  },
  {
    id: 'ap-multiplier',
    name: 'Architect God Mode',
    description: 'Doubles AP earned in all future Great Refactors',
    flavor: 'The architecture diagram is sentient. It has been waiting for this purchase.',
    cost: 8,
    effect: { type: 'ap_multiplier' },
  },

  // ── 10 AP ────────────────────────────────────────────────────────────────────
  {
    id: 'token-proliferation',
    name: 'Token Proliferation',
    description: 'Each prestige grants +1 bonus Legacy Token',
    flavor: 'The economy of loops has been solved. The solution is: more tokens.',
    cost: 10,
    effect: { type: 'token_proliferation' },
  },

  // ── 15 AP ────────────────────────────────────────────────────────────────────
  {
    id: 'infinite-feedback-loop',
    name: 'Infinite Feedback Loop',
    description: 'Each Great Refactor permanently adds +5% global production (stacks forever)',
    flavor: 'Every reset compounds the next. The codebase is learning from its own history.',
    cost: 15,
    effect: { type: 'infinite_feedback_loop' },
  },

  // ── Endgame: Massive Multipliers ─────────────────────────────────────────────
  {
    id: 'compiler-god-mode',
    name: 'Compiler God Mode',
    description: '×15 global production',
    flavor: 'The compiler no longer rejects your code. It has given up questioning you.',
    cost: 20,
    effect: { type: 'production_bonus', multiplier: 15 },
  },
  {
    id: 'parallel-universe-deploy',
    name: 'Parallel Universe Deploy',
    description: '×30 global production',
    flavor: 'Deployed to every branch. Every timeline. The diff is infinite and approved.',
    cost: 25,
    effect: { type: 'production_bonus', multiplier: 30 },
  },
  {
    id: 'singularity-refactor',
    name: 'Singularity Refactor',
    description: '×100 global production. The final architecture.',
    flavor: 'The codebase has transcended language. It now compiles reality itself.',
    cost: 50,
    effect: { type: 'production_bonus', multiplier: 100 },
  },

  // ── Deep Late-Game: For 20+ Great Refactors ──────────────────────────────────
  {
    id: 'quantum-architecture',
    name: 'Quantum Architecture',
    description: '×10 global production. Your architecture exists in every possible future simultaneously.',
    flavor: 'The codebase exists in a superposition of shipping and not-shipping. Observation collapses it to shipped.',
    cost: 75,
    effect: { type: 'production_bonus', multiplier: 10 },
  },
  {
    id: 'infinite-compile-time',
    name: 'Infinite Compile Time',
    description: '×25 global production. The build takes forever. The output is everything.',
    flavor: 'The compiler has been running since before the universe. It just finished. Build succeeded.',
    cost: 125,
    effect: { type: 'production_bonus', multiplier: 25 },
  },
];
