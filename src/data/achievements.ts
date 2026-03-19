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
    technicalDebt: number;
    techStack: string | null;
    pivotCount: number;
  }) => boolean;
}

// All producer IDs (original 15 + 7 new)
const ALL_PRODUCERS = [
  'rubber-duck',
  'mechanical-keyboard',
  'coffee-machine',
  'autocomplete',
  'stackoverflow-tab',
  'junior-dev',
  'linkedin-influencer',
  'senior-dev',
  'offshore-team',
  'tech-lead',
  'scrum-master',
  '10x-engineer',
  'the-pm',
  'github-copilot',
  'ai-agent',
  'cloud-cluster',
  'agi',
  'quantum-computer',
  'the-singularity',
  'blockchain',
  'the-consultant',
  'digital-twin',
];

// First 10 original producers (for tiered ownership achievements)
const CORE_PRODUCERS = [
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
];

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
  {
    id: 'post-human',
    name: 'Post-Human Pipeline',
    description: '1 quadrillion lines. The word "developer" no longer applies.',
    icon: '🌀',
    condition: ({ totalLoc }) => totalLoc >= 1000000000000000,
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
  {
    id: 'jira-ticket-4892',
    name: 'JIRA Ticket #4892',
    description: 'Clicked exactly 4,892 times. Someone will open a ticket about this.',
    icon: '🎫',
    condition: ({ totalClicks }) => totalClicks === 4892,
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
    id: 'duck-ceo',
    name: 'Duck CEO',
    description: '1,000 rubber ducks. They run the company now.',
    icon: '🦆👔',
    condition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 1000,
  },
  {
    id: 'duck-majority',
    name: 'They Have Voting Rights Now',
    description: 'Rubber ducks outnumber all other producers combined.',
    icon: '🗳️',
    condition: ({ producers }) => {
      const ducks = producers['rubber-duck'] ?? 0;
      const others = Object.entries(producers)
        .filter(([id]) => id !== 'rubber-duck')
        .reduce((sum, [, count]) => sum + count, 0);
      return ducks > 0 && ducks > others;
    },
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
    id: 'thought-leader',
    name: 'Thought Leader',
    description: '25 LinkedIn Influencer Devs. None of them have pushed code this quarter.',
    icon: '💡',
    condition: ({ producers }) => (producers['linkedin-influencer'] ?? 0) >= 25,
  },
  {
    id: 'offshore-everything',
    name: 'Offshore Everything',
    description: '10 offshore teams. Your Slack is 94% timezone confusions.',
    icon: '🌏',
    condition: ({ producers }) => (producers['offshore-team'] ?? 0) >= 10,
  },
  {
    id: 'unsubstantiated-velocity',
    name: 'Unsubstantiated Velocity',
    description: '5 Scrum Masters. Sprint velocity: unknowable. Chart: going up.',
    icon: '📈',
    condition: ({ producers }) => (producers['scrum-master'] ?? 0) >= 5,
  },
  {
    id: 'its-on-the-roadmap',
    name: "It's On The Roadmap",
    description: 'Hired your first PM. Nothing has shipped since.',
    icon: '🗺️',
    condition: ({ producers }) => (producers['the-pm'] ?? 0) >= 1,
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
    id: 'full-stack',
    name: 'Full Stack Developer',
    description: 'Every single producer in the roster. The stack overflows.',
    icon: '🥞',
    condition: ({ producers }) => ALL_PRODUCERS.every((id) => (producers[id] ?? 0) >= 5),
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
  {
    id: 'web3-enjoyer',
    name: 'Web3 Enjoyer',
    description: 'Deployed your first Blockchain. The whitepaper is mostly emojis.',
    icon: '⛓️',
    condition: ({ producers }) => (producers['blockchain'] ?? 0) >= 1,
  },
  {
    id: 'digital-self',
    name: 'Digital Me',
    description: 'Created your first Digital Twin. It already has more stars on GitHub.',
    icon: '👤',
    condition: ({ producers }) => (producers['digital-twin'] ?? 0) >= 1,
  },
  {
    id: 'pair-programming-hater',
    name: 'Pair Programming Hater',
    description: 'Reached 100K LOC with at most 1 of any producer.',
    icon: '🙅',
    condition: ({ totalLoc, producers }) =>
      totalLoc >= 100000 && Object.values(producers).every((count) => count <= 1),
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
  {
    id: 'chaos-enjoyer',
    name: 'Chaos Enjoyer',
    description: 'Survived 100 negative events. Pain is a feature.',
    icon: '🌪️',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 100,
  },
  {
    id: 'five-stages',
    name: 'The Five Stages',
    description: 'Survived 5 events back-to-back. Bargaining has failed.',
    icon: '😶',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 5,
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
  {
    id: 'move-fast',
    name: 'Move Fast and Break Things',
    description: 'Bought the upgrade. Production is already down.',
    icon: '💨',
    condition: ({ upgrades }) => upgrades.includes('move-fast-break-things'),
  },
  {
    id: 'yolo-deploy',
    name: 'YOLO Deploy',
    description: "Bought 'We Don't Need Tests'. The tests never forgave you.",
    icon: '🎲',
    condition: ({ upgrades }) => upgrades.includes('we-dont-need-tests'),
  },

  // ── Technical Debt achievements ────────────────────────────────────────────────
  {
    id: 'debt-ceiling',
    name: 'Debt Ceiling',
    description: 'Technical debt reached maximum. Congress has been notified.',
    icon: '📉',
    condition: ({ technicalDebt }) => technicalDebt >= 100,
  },
  {
    id: 'well-fix-it-in-post',
    name: "We'll Fix It In Post",
    description: 'Technical debt has been above 75 for a very long time. It is structural now.',
    icon: '🏚️',
    condition: ({ technicalDebt }) => technicalDebt >= 75,
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
  {
    id: 'its-not-a-phase-ach',
    name: "It's Not a Phase",
    description: 'Prestiged 25 times. You are the prestige.',
    icon: '♾️',
    condition: ({ prestigeCount }) => prestigeCount >= 25,
  },

  // ── Tech Stack achievements ────────────────────────────────────────────────────
  {
    id: 'pivoted',
    name: 'We Pivoted',
    description: "Chose a tech stack. The investors weren't told.",
    icon: '🔀',
    condition: ({ techStack }) => techStack !== null,
  },
  {
    id: 'rustacean-stack',
    name: 'Rustacean Supremacy',
    description: "Chose Rust as your tech stack. You've been waiting for this.",
    icon: '🦀',
    condition: ({ techStack }) => techStack === 'rust',
  },
  {
    id: 'php-enjoyer',
    name: 'PHP Enjoyer',
    description: "Chose PHP. You've seen things the others haven't.",
    icon: '🐘',
    condition: ({ techStack }) => techStack === 'php',
  },
  {
    id: 'blockchain-stack-ach',
    name: 'To The Moon',
    description: 'Chose Blockchain. The hype is the product.',
    icon: '🚀',
    condition: ({ techStack }) => techStack === 'blockchain',
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
  {
    id: 'it-was-like-this',
    name: 'It Was Like This When I Got Here',
    description: 'Prestiged immediately after your first hire.',
    icon: '🤷',
    condition: ({ prestigeCount, producers }) => {
      const total = Object.values(producers).reduce((a, b) => a + b, 0);
      return prestigeCount >= 1 && total === 0;
    },
  },
];
