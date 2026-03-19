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
  {
    id: 'duck-rescue-program',
    name: 'Duck Rescue Program',
    description: 'Start each run with 5 Rubber Ducks',
    flavor: 'Animal welfare policy: adopted.',
    cost: 3,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 5 }] },
  },
  {
    id: 'friday-deploy-muscle-memory',
    name: 'YOLO Deploy Reflex',
    description: 'Keep the Deploy on Fridays upgrade on reset',
    flavor: "You've done this so many times the adrenaline is gone.",
    cost: 3,
    effect: { type: 'keep_upgrade', upgradeId: 'deploy-on-fridays' },
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
  {
    id: 'duck-hatchery',
    name: 'Duck Hatchery',
    description: 'Start each run with 10 Rubber Ducks',
    flavor: 'The incubator runs on a cron job.',
    cost: 5,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 10 }] },
  },
  {
    id: 'staff-augmentation',
    name: 'Staff Augmentation',
    description: 'Start each run with 1 Senior Dev and 1 Tech Lead',
    flavor: 'Consulting firm dropped them off. Invoice pending.',
    cost: 5,
    effect: {
      type: 'start_producer',
      producers: [
        { id: 'senior-dev', count: 1 },
        { id: 'tech-lead', count: 1 },
      ],
    },
  },

  // ── 7 tokens ─────────────────────────────────────────────────────────────
  {
    id: 'duck-ranch',
    name: 'Duck Ranch',
    description: 'Start each run with 25 Rubber Ducks',
    flavor: 'Zoning permits? What zoning permits.',
    cost: 7,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 25 }] },
  },
  {
    id: 'enterprise-headcount',
    name: 'Enterprise Headcount',
    description: 'Start each run with 1 each of Scrum Master, 10x Engineer, and The PM',
    flavor: 'HR approved it. Legal is still reading.',
    cost: 7,
    effect: {
      type: 'start_producer',
      producers: [
        { id: 'scrum-master', count: 1 },
        { id: '10x-engineer', count: 1 },
        { id: 'the-pm', count: 1 },
      ],
    },
  },
  {
    id: 'architecture-v2',
    name: 'Architecture v2',
    description: '+50% global production',
    flavor: 'The diagram now has swim lanes. And a legend.',
    cost: 7,
    effect: { type: 'production_bonus', multiplier: 1.5 },
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
  {
    id: 'duck-collective',
    name: 'Duck Collective',
    description: 'Start each run with 50 Rubber Ducks',
    flavor: 'They filed for collective bargaining rights.',
    cost: 10,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 50 }] },
  },
  {
    id: 'ai-jumpstart',
    name: 'AI Jumpstart',
    description: 'Start each run with 1 GitHub Copilot and 1 AI Agent',
    flavor: 'They were already running before you logged in.',
    cost: 10,
    effect: {
      type: 'start_producer',
      producers: [
        { id: 'github-copilot', count: 1 },
        { id: 'ai-agent', count: 1 },
      ],
    },
  },

  // ── 12 tokens ────────────────────────────────────────────────────────────
  {
    id: 'grand-vision',
    name: 'Grand Vision',
    description: '×3 global production',
    flavor: 'The deck said Q1. It is now Q4. Everyone nods.',
    cost: 12,
    effect: { type: 'production_bonus', multiplier: 3.0 },
  },
  {
    id: 'duck-dynasty',
    name: 'Duck Dynasty',
    description: 'Start each run with 75 Rubber Ducks',
    flavor: 'The ducks have generational wealth now.',
    cost: 12,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 75 }] },
  },

  // ── 15 tokens ────────────────────────────────────────────────────────────
  {
    id: 'legendary-status',
    name: 'Legendary Status',
    description: '×4 global production',
    flavor: "You're in the README. You're in the folklore. You're a PR.",
    cost: 15,
    effect: { type: 'production_bonus', multiplier: 4.0 },
  },
  {
    id: 'rubber-duck-empire',
    name: 'Rubber Duck Empire',
    description: 'Start each run with 100 Rubber Ducks',
    flavor: 'The IPO paperwork lists them as co-founders.',
    cost: 15,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 100 }] },
  },

  // ── 20 tokens ────────────────────────────────────────────────────────────
  {
    id: 'the-oracle',
    name: 'The Oracle',
    description: '×6 global production',
    flavor: 'The codebase is sentient. It knew this day would come.',
    cost: 20,
    effect: { type: 'production_bonus', multiplier: 6.0 },
  },
  {
    id: 'duck-nation',
    name: 'Duck Nation',
    description: 'Start each run with 150 Rubber Ducks',
    flavor: 'They elected a speaker. It quacked twice.',
    cost: 20,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 150 }] },
  },

  // ── 25 tokens ────────────────────────────────────────────────────────────
  {
    id: 'the-architect',
    name: 'The Architect',
    description: '×8 global production',
    flavor: 'The system diagrams are sentient. They designed themselves.',
    cost: 25,
    effect: { type: 'production_bonus', multiplier: 8.0 },
  },

  // ── 30 tokens ────────────────────────────────────────────────────────────
  {
    id: 'omniscient-codebase',
    name: 'Omniscient Codebase',
    description: '×12 global production',
    flavor: 'It refactored itself before you opened the IDE.',
    cost: 30,
    effect: { type: 'production_bonus', multiplier: 12.0 },
  },
  {
    id: 'duck-singularity',
    name: 'Duck Singularity',
    description: 'Start each run with 200 Rubber Ducks',
    flavor: 'There is no longer a distinction between duck and developer.',
    cost: 30,
    effect: { type: 'start_producer', producers: [{ id: 'rubber-duck', count: 200 }] },
  },
];
