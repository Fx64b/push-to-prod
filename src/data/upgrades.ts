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
  // Click upgrades
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
    cost: 50000,
    target: 'click',
    multiplier: 10,
    unlockCondition: ({ totalLoc }) => totalLoc >= 50000,
  },
  {
    id: 'the-zone',
    name: 'The Zone',
    description: 'Click produces 25× LOC (stacks)',
    cost: 500000,
    target: 'click',
    multiplier: 25,
    unlockCondition: ({ totalLoc }) => totalLoc >= 500000,
  },

  // Producer upgrades
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
    id: 'cherry-mx-browns',
    name: 'Cherry MX Browns',
    description: 'Mechanical Keyboards produce 2× LOC/s',
    cost: 1000,
    target: 'mechanical-keyboard',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['mechanical-keyboard'] ?? 0) >= 1,
  },
  {
    id: 'copilot-free-tier',
    name: 'GitHub Copilot Free Tier',
    description: 'Autocompletes produce 3× LOC/s',
    cost: 10000,
    target: 'autocomplete',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['autocomplete'] ?? 0) >= 5,
  },
  {
    id: 'lgtm-bot',
    name: 'LGTM Bot',
    description: 'Junior Devs produce 2× LOC/s (auto-approves all PRs)',
    cost: 100000,
    target: 'junior-dev',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['junior-dev'] ?? 0) >= 1,
  },
  {
    id: 'git-blame-reverse',
    name: 'git blame --reverse',
    description: 'Senior Devs produce 2× LOC/s',
    cost: 500000,
    target: 'senior-dev',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['senior-dev'] ?? 0) >= 1,
  },
  {
    id: 'the-algorithm',
    name: 'The Algorithm',
    description: '10x Engineers produce 3× LOC/s',
    cost: 2500000,
    target: '10x-engineer',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['10x-engineer'] ?? 0) >= 1,
  },
  {
    id: 'gpt-5',
    name: 'GPT-5',
    description: 'GitHub Copilots produce 2× LOC/s',
    cost: 10000000,
    target: 'github-copilot',
    multiplier: 2,
    unlockCondition: ({ producers }) => (producers['github-copilot'] ?? 0) >= 1,
  },
  {
    id: 'multi-agent-orchestration',
    name: 'Multi-agent Orchestration',
    description: 'AI Agents produce 3× LOC/s',
    cost: 50000000,
    target: 'ai-agent',
    multiplier: 3,
    unlockCondition: ({ producers }) => (producers['ai-agent'] ?? 0) >= 1,
  },
  {
    id: 'recursive-self-improvement',
    name: 'Recursive Self-Improvement',
    description: 'AGI produces 5× LOC/s',
    cost: 250000000,
    target: 'agi',
    multiplier: 5,
    unlockCondition: ({ producers }) => (producers['agi'] ?? 0) >= 1,
  },

  // Global multiplier upgrades
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
    cost: 50000,
    target: 'all',
    multiplier: 1.5,
    unlockCondition: ({ totalLoc }) => totalLoc >= 10000,
  },
  {
    id: 'microservices-architecture',
    name: 'Microservices Architecture',
    description: 'All producers 2× LOC/s',
    cost: 500000,
    target: 'all',
    multiplier: 2,
    unlockCondition: ({ totalLoc }) => totalLoc >= 100000,
  },
  {
    id: 'rewrite-in-rust',
    name: 'Rewrite in Rust',
    description: 'All producers 3× LOC/s',
    cost: 5000000,
    target: 'all',
    multiplier: 3,
    unlockCondition: ({ totalLoc }) => totalLoc >= 1000000,
  },
  {
    id: 'mythical-man-month',
    name: 'The Mythical Man-Month (ignored)',
    description: 'All producers 5× LOC/s',
    cost: 50000000,
    target: 'all',
    multiplier: 5,
    unlockCondition: ({ totalLoc }) => totalLoc >= 10000000,
  },
];
