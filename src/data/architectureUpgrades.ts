export type ArchitectureEffect =
  | { type: 'event_horizon' } // positive events last 2× longer
  | { type: 'fast_learner' } // legacy upgrades cost 20% fewer tokens
  | { type: 'recursive_memory' } // start each run with 10% of last run's peak LOC
  | { type: 'unlock_duck_nesting' } // enables the duck nesting mechanic
  | { type: 'compounding_interest' } // +2% global production per regular prestige
  | { type: 'event_driven' } // +0.5% permanent production per negative event survived
  | { type: 'production_bonus'; multiplier: number }
  | { type: 'unlock_second_system' } // unlocks 5 additional high-tier legacy upgrades
  | { type: 'protocol_breach' } // unlocks Phase 5 "The Loop" events
  | { type: 'ap_multiplier' } // doubles AP earned in all future Great Refactors
  | { type: 'token_proliferation' } // each prestige grants +1 bonus Legacy Token
  | { type: 'infinite_feedback_loop' } // upgrades the built-in GR multiplier from ×1.5 to ×2 per loop
  | { type: 'prestige_ap_dividend' } // each regular prestige grants +1 AP
  | { type: 'deep_recursion' } // start each run with 30% of previous run's peak LOC
  | { type: 'loop_producer_inheritance' } // Loop era producers survive regular prestige resets
  | { type: 'unlock_synergies' } // unlocks the synergy system
  | { type: 'enhanced_synergies' } // doubles all synergy bonuses
  | { type: 'autobuyer_producers' } // auto-buys cheapest producer every 2s
  | { type: 'autobuyer_upgrades' } // auto-buys cheapest upgrade every 5s
  | { type: 'autobuyer_bulk_producers' } // auto-buys 5 cheapest producers every second
  | { type: 'autoclick'; cps: number } // auto-clicks at the given CPS
  | { type: 'autobuyer_all_upgrades' } // auto-buys ALL affordable upgrades every 5s
  | { type: 'beyond_producer_inheritance' }; // Beyond era producers survive regular prestige resets

export interface ArchitectureUpgrade {
  id: string;
  name: string;
  description: string;
  flavor: string;
  cost: number; // Architecture Points
  effect: ArchitectureEffect;
  /** Only purchasable after this many Great Refactors. */
  requiresGreatRefactor?: number;
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
    description: "Each run starts with 10% of the previous run's peak LOC",
    flavor: 'The codebase remembers where you left off. It kept a copy.',
    cost: 2,
    effect: { type: 'recursive_memory' },
  },

  // ── 3 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'nest-protocol',
    name: 'Nest Protocol',
    description:
      'Rubber ducks can nest on producers, leeching and storing LOC. Click to pop them for 1.4× the stored amount.',
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
    flavor:
      'The second system is always more ambitious than the first. The ducks approved the spec.',
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
    description:
      'Upgrades the built-in Great Refactor multiplier from ×1.5 to ×2 per loop (GR5 = ×32 instead of ×7.6)',
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
    description:
      '×10 global production. Your architecture exists in every possible future simultaneously.',
    flavor:
      'The codebase exists in a superposition of shipping and not-shipping. Observation collapses it to shipped.',
    cost: 75,
    effect: { type: 'production_bonus', multiplier: 10 },
  },
  {
    id: 'infinite-compile-time',
    name: 'Infinite Compile Time',
    description: '×25 global production. The build takes forever. The output is everything.',
    flavor:
      'The compiler has been running since before the universe. It just finished. Build succeeded.',
    cost: 125,
    effect: { type: 'production_bonus', multiplier: 25 },
  },

  // ── GR 2 Exclusive ───────────────────────────────────────────────────────────
  {
    id: 'prestige-ap-dividend',
    name: 'Prestige AP Dividend',
    description: 'Each regular prestige grants +1 Architecture Point',
    flavor: 'You have done this before. The loop remembers the effort.',
    cost: 12,
    requiresGreatRefactor: 2,
    effect: { type: 'prestige_ap_dividend' },
  },
  {
    id: 'deep-recursion',
    name: 'Deep Recursion',
    description:
      "Each run starts with 30% of the previous run's peak LOC (supersedes Recursive Memory)",
    flavor: 'The stack goes deeper now. You can feel it before the run loads.',
    cost: 10,
    requiresGreatRefactor: 2,
    effect: { type: 'deep_recursion' },
  },

  // ── GR 3 Exclusive ───────────────────────────────────────────────────────────
  {
    id: 'cascade-architecture',
    name: 'Cascade Architecture',
    description: '×20 global production. Third loop, third system — finally the right one.',
    flavor:
      'The architecture diagram has achieved enlightenment. It no longer fits on a whiteboard.',
    cost: 20,
    requiresGreatRefactor: 3,
    effect: { type: 'production_bonus', multiplier: 20 },
  },
  {
    id: 'loop-producer-inheritance',
    name: 'Loop Inheritance',
    description:
      'The Loop era producers (The Process, Sentient Codebase, Duck Collective, Recursive Self) survive regular prestige resets',
    flavor: 'They were already running before you reset. They just waited.',
    cost: 25,
    requiresGreatRefactor: 3,
    effect: { type: 'loop_producer_inheritance' },
  },
  {
    id: 'synergy-protocol',
    name: 'Synergy Protocol',
    description:
      'Unlocks producer synergies — specific producer combinations grant bonus multipliers',
    flavor: 'The producers are talking to each other. They have been planning something.',
    cost: 10,
    requiresGreatRefactor: 3,
    effect: { type: 'unlock_synergies' },
  },
  {
    id: 'autobuyer-producers',
    name: 'Process Automation Protocol',
    description: 'Automatically buys the cheapest affordable producer every 2 seconds',
    flavor: 'The hiring pipeline is fully automated. HR filed a grievance. It was auto-resolved.',
    cost: 15,
    requiresGreatRefactor: 3,
    effect: { type: 'autobuyer_producers' },
  },

  // ── GR 4 Exclusive ───────────────────────────────────────────────────────────
  {
    id: 'autoclick-protocol',
    name: 'Auto-Click Protocol',
    description: 'Automatically clicks the LOC button 5 times per second',
    flavor: 'You have automated the clicking. The mouse is ceremonial now.',
    cost: 15,
    requiresGreatRefactor: 4,
    effect: { type: 'autoclick', cps: 5 },
  },

  // ── GR 5 Exclusive ───────────────────────────────────────────────────────────
  {
    id: 'enhanced-synergies',
    name: 'Enhanced Synergies',
    description: 'All synergy bonuses are doubled',
    flavor: 'The synergies synergize with themselves. It is synergy all the way down.',
    cost: 30,
    requiresGreatRefactor: 5,
    effect: { type: 'enhanced_synergies' },
  },
  {
    id: 'autobuyer-upgrades',
    name: 'Upgrade Pipeline',
    description: 'Automatically buys the cheapest affordable upgrade every 5 seconds',
    flavor: 'npm update --yes. pip install --upgrade *. cargo update. All of them. At once.',
    cost: 25,
    requiresGreatRefactor: 5,
    effect: { type: 'autobuyer_upgrades' },
  },
  {
    id: 'autobuyer-bulk-producers',
    name: 'Bulk Procurement Protocol',
    description: 'Automatically buys 5 of the cheapest affordable producer every second',
    flavor:
      'The hiring freeze is over. Five offers went out simultaneously. HR is rebooting.',
    cost: 20,
    requiresGreatRefactor: 5,
    effect: { type: 'autobuyer_bulk_producers' },
  },

  // ── GR 7 Exclusive ───────────────────────────────────────────────────────────
  {
    id: 'autobuyer-all-upgrades',
    name: 'Upgrade Flood',
    description: 'Automatically buys ALL affordable upgrades every 5 seconds (not just the cheapest)',
    flavor: 'The changelog is a wall of text. Every item is checked. Nothing is optional.',
    cost: 30,
    requiresGreatRefactor: 7,
    effect: { type: 'autobuyer_all_upgrades' },
  },
  {
    id: 'momentum',
    name: 'Momentum',
    description: '×50 global production. Unstoppable force, immovable codebase.',
    flavor: 'Velocity is no longer a metric. It is a law of physics you authored.',
    cost: 60,
    requiresGreatRefactor: 7,
    effect: { type: 'production_bonus', multiplier: 50 },
  },
  {
    id: 'beyond-producer-inheritance',
    name: 'Beyond Inheritance',
    description:
      'Beyond era producers (Multiverse Compiler, The Boardroom, Reality Engine, The Final Push) survive regular prestige resets',
    flavor: 'They exist outside the loop. They exist outside the architecture. They just exist.',
    cost: 50,
    requiresGreatRefactor: 7,
    effect: { type: 'beyond_producer_inheritance' },
  },

  // ── GR 10 Exclusive ──────────────────────────────────────────────────────────
  {
    id: 'reality-override',
    name: 'Reality Override',
    description: '×200 global production. The final multiplier. The architecture is complete.',
    flavor: 'sudo chmod 777 /reality. Permission: granted. Responsibility: none.',
    cost: 150,
    requiresGreatRefactor: 10,
    effect: { type: 'production_bonus', multiplier: 200 },
  },
];
