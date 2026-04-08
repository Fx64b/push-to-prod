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
  | { type: 'token_to_ap' }         // Great Refactor converts unspent legacy tokens → AP (20:1)
  | { type: 'gr_production_bonus' } // +3% global production per Great Refactor completed (stacks)
  | { type: 'perpetual_loop' };     // +0.5 bonus legacy tokens per prestige per Great Refactor done

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

  // ── 4 AP ─────────────────────────────────────────────────────────────────────
  {
    id: 'token-archive',
    name: 'Token Archive',
    description: 'On Great Refactor, unspent Legacy Tokens convert to AP (20:1)',
    flavor: 'Nothing is truly lost. The tokens persist in architectural memory.',
    cost: 4,
    effect: { type: 'token_to_ap' },
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

  // ── Infinite scaling tier ──────────────────────────────────────────────────
  {
    id: 'gr-amplifier',
    name: 'Great Refactor Amplifier',
    description: '+3% global production per Great Refactor completed (stacks, no cap)',
    flavor: 'Every loop sharpens the edge. The codebase remembers every iteration.',
    cost: 10,
    effect: { type: 'gr_production_bonus' },
  },
  {
    id: 'perpetual-loop',
    name: 'Perpetual Loop',
    description: 'Each prestige grants +0.5 bonus Legacy Tokens per Great Refactor done',
    flavor: 'The loop has memory. The tokens know how many times you have been here.',
    cost: 14,
    effect: { type: 'perpetual_loop' },
  },
];
