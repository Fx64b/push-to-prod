export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (state: {
    totalLoc: number;
    loc: number;
    producers: Record<string, number>;
    upgrades: string[];
    totalClicks: number;
    negativeEventssurvived: number;
    prestigeCount: number;
    activeEventTriggered: boolean;
  }) => boolean;
}

// All 15 producer IDs
const ALL_PRODUCERS = [
  'rubber-duck',
  'mechanical-keyboard',
  'coffee-machine',
  'autocomplete',
  'stackoverflow-tab',
  'junior-dev',
  'senior-dev',
  'tech-lead',
  '10x-engineer',
  'github-copilot',
  'ai-agent',
  'cloud-cluster',
  'agi',
  'quantum-computer',
  'the-singularity',
];

// First 10 original producers (for tiered ownership achievements)
const CORE_PRODUCERS = ALL_PRODUCERS.slice(0, 10);

export const ACHIEVEMENTS: Achievement[] = [
  // ── LOC milestones ────────────────────────────────────────────────────────────
  {
    id: 'hello-world',
    name: 'Hello, World!',
    description: 'Write your first 10 lines of code.',
    icon: '👋',
    condition: ({ totalLoc }) => totalLoc >= 10,
  },
  {
    id: 'works-on-my-machine',
    name: 'It works on my machine',
    description: "Ship 1,000 lines. It's fine.",
    icon: '💻',
    condition: ({ totalLoc }) => totalLoc >= 1000,
  },
  {
    id: 'ship-it',
    name: 'SHIP IT',
    description: '10,000 lines of code pushed.',
    icon: '🚀',
    condition: ({ totalLoc }) => totalLoc >= 10000,
  },
  {
    id: 'this-is-fine',
    name: 'This is fine 🔥',
    description: '100,000 lines. The fire is containable.',
    icon: '🔥',
    condition: ({ totalLoc }) => totalLoc >= 100000,
  },
  {
    id: 'lgtm',
    name: 'LGTM',
    description: '1,000,000 lines merged. No review needed.',
    icon: '✅',
    condition: ({ totalLoc }) => totalLoc >= 1000000,
  },
  {
    id: 'hyperscale',
    name: 'Hyperscale',
    description: "10 million lines. You're going to need a bigger server.",
    icon: '📊',
    condition: ({ totalLoc }) => totalLoc >= 10000000,
  },
  {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    description: '100 million lines. Always pivot to AI.',
    icon: '🌉',
    condition: ({ totalLoc }) => totalLoc >= 100000000,
  },
  {
    id: 'billion-lines',
    name: '1B Lines Served',
    description: "You've written more code than most companies.",
    icon: '🏭',
    condition: ({ totalLoc }) => totalLoc >= 1000000000,
  },
  {
    id: 'the-algorithm',
    name: 'The Algorithm',
    description: '1 trillion lines. You are the codebase.',
    icon: '🌌',
    condition: ({ totalLoc }) => totalLoc >= 1000000000000,
  },

  // ── Click milestones ──────────────────────────────────────────────────────────
  {
    id: 'carpal-tunnel',
    name: 'Carpal Tunnel',
    description: '1,000 total clicks. Your wrist filed a complaint.',
    icon: '⚠️',
    condition: ({ totalClicks }) => totalClicks >= 1000,
  },
  {
    id: '404-sleep',
    name: '404: Sleep Not Found',
    description: "10,000 total clicks. It's 4am. Ship it anyway.",
    icon: '💤',
    condition: ({ totalClicks }) => totalClicks >= 10000,
  },
  {
    id: 'send-help',
    name: 'Please Send Help',
    description: '100,000 total clicks. Your fingers are keys now.',
    icon: '🆘',
    condition: ({ totalClicks }) => totalClicks >= 100000,
  },

  // ── Producer achievements ─────────────────────────────────────────────────────
  {
    id: 'rubber-duck-programmer',
    name: 'Rubber Duck Programmer',
    description: 'Hired your first rubber duck consultant.',
    icon: '🦆',
    condition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 1,
  },
  {
    id: 'pair-programming',
    name: 'Pair Programming',
    description: 'Two rubber ducks are better than one. Allegedly.',
    icon: '🦆🦆',
    condition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 2,
  },
  {
    id: 'rubber-duck-army',
    name: 'Rubber Duck Army',
    description: 'Your desk is 40% duck. The rest is keyboard.',
    icon: '🪖',
    condition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 25,
  },
  {
    id: 'type-a-personality',
    name: 'Type A Personality',
    description: 'Amassed a fleet of 10 mechanical keyboards.',
    icon: '⌨️',
    condition: ({ producers }) => (producers['mechanical-keyboard'] ?? 0) >= 10,
  },
  {
    id: 'coffee-addict',
    name: 'Coffee Addict',
    description: '10 coffee machines. The IV drip was cheaper.',
    icon: '☕',
    condition: ({ producers }) => (producers['coffee-machine'] ?? 0) >= 10,
  },
  {
    id: 'stackoverflow-enjoyer',
    name: 'Stack Overflow Enjoyer',
    description: '25 Stack Overflow tabs open simultaneously.',
    icon: '📋',
    condition: ({ producers }) => (producers['stackoverflow-tab'] ?? 0) >= 25,
  },
  {
    id: 'senior-dev',
    name: 'Senior Dev',
    description: "They'll delete your codebase and call it a refactor.",
    icon: '🧙',
    condition: ({ producers }) => (producers['senior-dev'] ?? 0) >= 1,
  },
  {
    id: '10x-team',
    name: '10x Team',
    description: 'Hired at least one of every core producer.',
    icon: '🏆',
    condition: ({ producers }) => CORE_PRODUCERS.every((id) => (producers[id] ?? 0) >= 1),
  },
  {
    id: 'all-hands',
    name: 'All Hands on Deck',
    description: 'Hired at least one of every producer. Even the weird ones.',
    icon: '🤝',
    condition: ({ producers }) => ALL_PRODUCERS.every((id) => (producers[id] ?? 0) >= 1),
  },
  {
    id: 'big-o-h-no',
    name: 'Big O(h no)',
    description: 'Own 100 of any single producer.',
    icon: '📈',
    condition: ({ producers }) => Object.values(producers).some((count) => count >= 100),
  },
  {
    id: 'the-architect',
    name: 'The Architect',
    description: 'Own 10 of each core producer. You created a monster.',
    icon: '🏗️',
    condition: ({ producers }) => CORE_PRODUCERS.every((id) => (producers[id] ?? 0) >= 10),
  },
  {
    id: 'fortune-500-company',
    name: 'Fortune 500 Company',
    description: '100 of each core producer. Do you have a life? Go touch grass.',
    icon: '🤯',
    condition: ({ producers }) => CORE_PRODUCERS.every((id) => (producers[id] ?? 0) >= 100),
  },

  // ── Event achievements ────────────────────────────────────────────────────────
  {
    id: 'not-a-bug',
    name: "It's Not a Bug, It's a Feature",
    description: 'Experienced your first random event.',
    icon: '🐛',
    condition: ({ activeEventTriggered }) => activeEventTriggered,
  },
  {
    id: 'monday-morning',
    name: 'Monday Morning',
    description: 'Survived 5 negative events.',
    icon: '😰',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 5,
  },
  {
    id: 'npm-audit',
    name: 'npm audit fix --force',
    description: 'Survived 10 negative events. At this point the CVEs are load-bearing.',
    icon: '💀',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 10,
  },
  {
    id: 'battle-hardened',
    name: 'Battle Hardened',
    description: 'Survived 25 negative events. You feel nothing now.',
    icon: '🛡️',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 25,
  },

  // ── Upgrade achievements ───────────────────────────────────────────────────────
  {
    id: 'dependency-hell',
    name: 'Dependency Hell',
    description: 'Purchased 5 upgrades. node_modules: 4.2 GB.',
    icon: '📦',
    condition: ({ upgrades }) => upgrades.length >= 5,
  },
  {
    id: 'deploy-on-friday',
    name: 'Deploy on Friday',
    description: 'Bought the Deploy on Fridays upgrade. Brave.',
    icon: '😈',
    condition: ({ upgrades }) => upgrades.includes('deploy-on-fridays'),
  },
  {
    id: 'rustacean',
    name: 'Rustacean',
    description: 'Bought the Rewrite in Rust upgrade. 🦀',
    icon: '🦀',
    condition: ({ upgrades }) => upgrades.includes('rewrite-in-rust'),
  },

  // ── Prestige achievements ──────────────────────────────────────────────────────
  {
    id: 'great-refactor',
    name: 'The Great Refactor',
    description: 'Completed your first prestige.',
    icon: '♻️',
    condition: ({ prestigeCount }) => prestigeCount >= 1,
  },
  {
    id: 'have-you-tried',
    name: 'Have You Tried Turning It Off and On Again?',
    description: 'Prestiged 3 times. The oldest trick in the book.',
    icon: '🔄',
    condition: ({ prestigeCount }) => prestigeCount >= 3,
  },
  {
    id: 'git-push-force',
    name: 'git push --force',
    description: 'Prestiged 5 times. History? What history?',
    icon: '💥',
    condition: ({ prestigeCount }) => prestigeCount >= 5,
  },
  {
    id: 'born-again',
    name: 'Born Again (Again)',
    description: 'Prestiged 10 times. A creature of pure iteration.',
    icon: '🌀',
    condition: ({ prestigeCount }) => prestigeCount >= 10,
  },

  // ── Meme / joke achievements ──────────────────────────────────────────────────
  {
    id: 'it-compiles',
    name: 'It Compiles!',
    description: 'Reached 500 LOC with no producers. We do not talk about runtime errors.',
    icon: '🎉',
    condition: ({ totalLoc, producers }) =>
      totalLoc >= 500 && Object.values(producers).reduce((a, b) => a + b, 0) === 0,
  },
  {
    id: 'tabs-vs-spaces',
    name: 'Tabs vs. Spaces',
    description: "You've bought an opinion on both sides of the debate.",
    icon: '⚔️',
    condition: ({ upgrades }) =>
      upgrades.includes('dark-mode') && upgrades.includes('npm-install-everything'),
  },
  {
    id: 'works-offline',
    name: 'Works Offline',
    description: '500,000 LOC with no active event. Suspiciously stable.',
    icon: '📶',
    condition: ({ totalLoc, producers }) =>
      totalLoc >= 500000 && Object.values(producers).reduce((a, b) => a + b, 0) > 0,
  },
];
