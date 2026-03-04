export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  target: string; // producer id, 'click', or 'all'
  multiplier: number;
  unlockCondition: (state: {
    totalLoc: number;
    producers: Record<string, number>;
    upgrades: string[];
  }) => boolean;
}

export const UPGRADES: Upgrade[] = [
  // ── Click upgrades ──────────────────────────────────────────────────────────
  {
    id: 'standing-desk',
    name: 'Standing Desk',
    description: 'Click produces 2× LOC',
    cost: 10,
    target: 'click',
    multiplier: 2,
    unlockCondition: ({ totalLoc }) => totalLoc >= 10,
  },
  {
    id: 'two-monitors',
    name: '2 Monitors',
    description: 'Click produces 3× LOC (stacks)',
    cost: 500,
    target: 'click',
    multiplier: 3,
    unlockCondition: ({ totalLoc }) => totalLoc >= 500,
  },
  {
    id: 'ergonomic-chair',
    name: 'Ergonomic Chair',
    description: 'Click produces 4× LOC (stacks)',
    cost: 5000,
    target: 'click',
    multiplier: 4,
    unlockCondition: ({ totalLoc }) => totalLoc >= 5000,
  },
  {
    id: 'energy-drink',
    name: 'Energy Drink',
    description: 'Click produces 10× LOC (stacks)',
    cost: 100000,
    target: 'click',
    multiplier: 10,
    unlockCondition: ({ totalLoc }) => totalLoc >= 75000,
  },
  {
    id: 'the-zone',
    name: 'The Zone',
    description: 'Click produces 25× LOC (stacks)',
    cost: 2000000,
    target: 'click',
    multiplier: 25,
    unlockCondition: ({ totalLoc }) => totalLoc >= 1000000,
  },
  {
    id: 'hyperfocus',
    name: 'Hyperfocus',
    description: 'Click produces 50× LOC. Notifications are muted.',
    cost: 50000000,
    target: 'click',
    multiplier: 50,
    unlockCondition: ({ totalLoc }) => totalLoc >= 20000000,
  },

  // ── Rubber Duck ─────────────────────────────────────────────────────────────
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Rubber Ducks produce 2× LOC/s',
    cost: 100,
    target: 'rubber-duck',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 1,
  },
  {
    id: 'rubber-duck-phd',
    name: 'Rubber Duck PhD',
    description: 'Rubber Ducks produce 3× LOC/s. They have opinions now.',
    cost: 20000,
    target: 'rubber-duck',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 15,
  },
  {
    id: 'rubber-duck-fleet',
    name: 'Rubber Duck Fleet',
    description: 'Rubber Ducks produce 4× LOC/s. A rubber armada.',
    cost: 1000000,
    target: 'rubber-duck',
    multiplier: 4,
    unlockCondition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 75,
  },

  // ── Mechanical Keyboard ─────────────────────────────────────────────────────
  {
    id: 'cherry-mx-browns',
    name: 'Cherry MX Browns',
    description: 'Mechanical Keyboards produce 2× LOC/s',
    cost: 1000,
    target: 'mechanical-keyboard',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['mechanical-keyboard'] ?? 0) >= 1,
  },
  {
    id: 'o-ring-switches',
    name: 'O-Ring Switches',
    description: 'Mechanical Keyboards produce 3× LOC/s. Quieter clacking.',
    cost: 100000,
    target: 'mechanical-keyboard',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['mechanical-keyboard'] ?? 0) >= 15,
  },
  {
    id: 'custom-pcb',
    name: 'Custom PCB',
    description: 'Mechanical Keyboards produce 4× LOC/s. Soldered by hand.',
    cost: 3000000,
    target: 'mechanical-keyboard',
    multiplier: 4,
    unlockCondition: ({ producers }) => (producers['mechanical-keyboard'] ?? 0) >= 50,
  },

  // ── Coffee Machine ───────────────────────────────────────────────────────────
  {
    id: 'double-shot',
    name: 'Double Shot',
    description: 'Coffee Machines produce 2× LOC/s',
    cost: 3000,
    target: 'coffee-machine',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['coffee-machine'] ?? 0) >= 1,
  },
  {
    id: 'cold-brew-protocol',
    name: 'Cold Brew Protocol',
    description: 'Coffee Machines produce 3× LOC/s. Steeps for 24h.',
    cost: 100000,
    target: 'coffee-machine',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['coffee-machine'] ?? 0) >= 10,
  },
  {
    id: 'iv-drip',
    name: 'IV Drip',
    description: 'Coffee Machines produce 4× LOC/s. Direct to bloodstream.',
    cost: 2000000,
    target: 'coffee-machine',
    multiplier: 4,
    unlockCondition: ({ producers }) => (producers['coffee-machine'] ?? 0) >= 50,
  },

  // ── Autocomplete ─────────────────────────────────────────────────────────────
  {
    id: 'copilot-free-tier',
    name: 'GitHub Copilot Free Tier',
    description: 'Autocompletes produce 3× LOC/s',
    cost: 20000,
    target: 'autocomplete',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers.autocomplete ?? 0) >= 5,
  },
  {
    id: 'tab-to-accept',
    name: 'Tab to Accept',
    description: 'Autocompletes produce 4× LOC/s. You read none of it.',
    cost: 600000,
    target: 'autocomplete',
    multiplier: 4,
    unlockCondition: ({ producers }) => (producers.autocomplete ?? 0) >= 20,
  },

  // ── Stack Overflow Tab ────────────────────────────────────────────────────────
  {
    id: 'stackoverflow-premium',
    name: 'Stack Overflow Teams',
    description: 'Stack Overflow Tabs produce 2× LOC/s',
    cost: 30000,
    target: 'stackoverflow-tab',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['stackoverflow-tab'] ?? 0) >= 1,
  },
  {
    id: 'upvote-everything',
    name: 'Upvote Everything',
    description: 'Stack Overflow Tabs produce 3× LOC/s. Karma maxed.',
    cost: 2000000,
    target: 'stackoverflow-tab',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['stackoverflow-tab'] ?? 0) >= 15,
  },

  // ── Junior Dev ────────────────────────────────────────────────────────────────
  {
    id: 'lgtm-bot',
    name: 'LGTM Bot',
    description: 'Junior Devs produce 2× LOC/s (auto-approves all PRs)',
    cost: 200000,
    target: 'junior-dev',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['junior-dev'] ?? 0) >= 1,
  },
  {
    id: 'unlimited-pto',
    name: 'Unlimited PTO',
    description: 'Junior Devs produce 3× LOC/s. Nobody takes it.',
    cost: 5000000,
    target: 'junior-dev',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['junior-dev'] ?? 0) >= 15,
  },

  // ── Senior Dev ────────────────────────────────────────────────────────────────
  {
    id: 'git-blame-reverse',
    name: 'git blame --reverse',
    description: 'Senior Devs produce 2× LOC/s',
    cost: 1500000,
    target: 'senior-dev',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['senior-dev'] ?? 0) >= 1,
  },
  {
    id: 'architecture-diagram',
    name: 'Architecture Diagram',
    description: 'Senior Devs produce 3× LOC/s. Drawn in Excalidraw.',
    cost: 20000000,
    target: 'senior-dev',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['senior-dev'] ?? 0) >= 10,
  },

  // ── Tech Lead ─────────────────────────────────────────────────────────────────
  {
    id: 'agile-methodology',
    name: 'Agile Methodology',
    description: 'Tech Leads produce 2× LOC/s. Daily stand-ups included.',
    cost: 4000000,
    target: 'tech-lead',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['tech-lead'] ?? 0) >= 1,
  },
  {
    id: 'story-points',
    name: 'Story Points',
    description: 'Tech Leads produce 3× LOC/s. Estimates: still wrong.',
    cost: 40000000,
    target: 'tech-lead',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['tech-lead'] ?? 0) >= 8,
  },

  // ── 10x Engineer ──────────────────────────────────────────────────────────────
  {
    id: 'the-algorithm',
    name: 'The Algorithm',
    description: '10x Engineers produce 3× LOC/s',
    cost: 10000000,
    target: '10x-engineer',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['10x-engineer'] ?? 0) >= 1,
  },
  {
    id: 'no-estimates',
    name: '#NoEstimates',
    description: "10x Engineers produce 5× LOC/s. Done when it's done.",
    cost: 150000000,
    target: '10x-engineer',
    multiplier: 5,
    unlockCondition: ({ producers }) => (producers['10x-engineer'] ?? 0) >= 15,
  },

  // ── GitHub Copilot ────────────────────────────────────────────────────────────
  {
    id: 'gpt-5',
    name: 'GPT-5',
    description: 'GitHub Copilots produce 2× LOC/s',
    cost: 40000000,
    target: 'github-copilot',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['github-copilot'] ?? 0) >= 1,
  },
  {
    id: 'context-window',
    name: '1M Token Context',
    description: 'GitHub Copilots produce 3× LOC/s. Holds your whole codebase.',
    cost: 500000000,
    target: 'github-copilot',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['github-copilot'] ?? 0) >= 8,
  },

  // ── AI Agent ──────────────────────────────────────────────────────────────────
  {
    id: 'multi-agent-orchestration',
    name: 'Multi-agent Orchestration',
    description: 'AI Agents produce 3× LOC/s',
    cost: 250000000,
    target: 'ai-agent',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['ai-agent'] ?? 0) >= 1,
  },
  {
    id: 'vibe-coding',
    name: 'Vibe Coding',
    description: 'AI Agents produce 5× LOC/s. You just describe the vibe.',
    cost: 3000000000,
    target: 'ai-agent',
    multiplier: 5,
    unlockCondition: ({ producers }) => (producers['ai-agent'] ?? 0) >= 8,
  },

  // ── Cloud Cluster ─────────────────────────────────────────────────────────────
  {
    id: 'auto-scaling',
    name: 'Auto-scaling',
    description: 'Cloud Clusters produce 2× LOC/s',
    cost: 1200000000,
    target: 'cloud-cluster',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['cloud-cluster'] ?? 0) >= 1,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Cloud Clusters produce 3× LOC/s. 400 YAML files required.',
    cost: 10000000000,
    target: 'cloud-cluster',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['cloud-cluster'] ?? 0) >= 5,
  },

  // ── AGI ────────────────────────────────────────────────────────────────────────
  {
    id: 'recursive-self-improvement',
    name: 'Recursive Self-Improvement',
    description: 'AGI produces 5× LOC/s',
    cost: 3000000000,
    target: 'agi',
    multiplier: 5,
    unlockCondition: ({ producers }) => (producers.agi ?? 0) >= 1,
  },
  {
    id: 'agi-alignment',
    name: 'AGI Alignment (solved)',
    description: 'AGI produces 8× LOC/s. It promised to be nice.',
    cost: 30000000000,
    target: 'agi',
    multiplier: 8,
    unlockCondition: ({ producers }) => (producers.agi ?? 0) >= 5,
  },

  // ── Quantum Computer ──────────────────────────────────────────────────────────
  {
    id: 'quantum-entanglement',
    name: 'Quantum Entanglement',
    description: 'Quantum Computers produce 2× LOC/s',
    cost: 40000000000,
    target: 'quantum-computer',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['quantum-computer'] ?? 0) >= 1,
  },
  {
    id: 'qubit-array',
    name: 'Qubit Array',
    description: 'Quantum Computers produce 4× LOC/s. Schrödinger approved.',
    cost: 400000000000,
    target: 'quantum-computer',
    multiplier: 4,
    unlockCondition: ({ producers }) => (producers['quantum-computer'] ?? 0) >= 5,
  },

  // ── The Singularity ───────────────────────────────────────────────────────────
  {
    id: 'omega-point',
    name: 'Omega Point',
    description: 'The Singularity produces 5× LOC/s. Teilhard was right.',
    cost: 1000000000000,
    target: 'the-singularity',
    multiplier: 5,
    unlockCondition: ({ producers }) => (producers['the-singularity'] ?? 0) >= 1,
  },

  // ── Global multiplier upgrades ────────────────────────────────────────────────
  {
    id: 'npm-install-everything',
    name: 'npm install everything',
    description: 'All producers +10% LOC/s',
    cost: 5000,
    target: 'all',
    multiplier: 1.1,
    unlockCondition: ({ totalLoc }) => totalLoc >= 1000,
  },
  {
    id: 'deploy-on-fridays',
    name: 'Deploy on Fridays',
    description: 'All producers +50% LOC/s (risky, but worth it)',
    cost: 100000,
    target: 'all',
    multiplier: 1.5,
    unlockCondition: ({ totalLoc }) => totalLoc >= 25000,
  },
  {
    id: 'microservices-architecture',
    name: 'Microservices Architecture',
    description: 'All producers 2× LOC/s',
    cost: 10000000,
    target: 'all',
    multiplier: 2,
    unlockCondition: ({ totalLoc }) => totalLoc >= 500000,
  },
  {
    id: 'rewrite-in-rust',
    name: 'Rewrite in Rust',
    description: 'All producers 3× LOC/s',
    cost: 100000000,
    target: 'all',
    multiplier: 3,
    unlockCondition: ({ totalLoc }) => totalLoc >= 5000000,
  },
  {
    id: 'test-driven-development',
    name: 'Test-Driven Development',
    description: 'All producers +50% LOC/s. Tests written after anyway.',
    cost: 800000000,
    target: 'all',
    multiplier: 1.5,
    unlockCondition: ({ totalLoc }) => totalLoc >= 50000000,
  },
  {
    id: 'mythical-man-month',
    name: 'The Mythical Man-Month (ignored)',
    description: 'All producers 5× LOC/s',
    cost: 8000000000,
    target: 'all',
    multiplier: 5,
    unlockCondition: ({ totalLoc }) => totalLoc >= 500000000,
  },
  {
    id: 'ci-cd-pipeline',
    name: 'CI/CD Pipeline',
    description: 'All producers 2× LOC/s. Green builds only.',
    cost: 80000000000,
    target: 'all',
    multiplier: 2,
    unlockCondition: ({ totalLoc }) => totalLoc >= 5000000000,
  },
  {
    id: 'zero-day-exploit',
    name: 'Zero-Day Exploit',
    description: 'All producers 10× LOC/s. Ethically sourced.',
    cost: 2000000000000,
    target: 'all',
    multiplier: 10,
    unlockCondition: ({ totalLoc }) => totalLoc >= 100000000000,
  },
];
