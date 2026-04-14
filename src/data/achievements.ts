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
    greatRefactorCount: number;
    architectureUpgrades: string[];
    greatRefactorProductionBonus: number;
  }) => boolean;
}

// All base producer IDs (excludes Loop era producers which require Great Refactor)
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
  'tech-oracle',
  'infinite-monkey-farm',
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
  {
    id: 'quintillion-lines',
    name: 'Quintillion Club',
    description: '1 quintillion lines. The repository is larger than some star systems.',
    icon: '🌠',
    condition: ({ totalLoc }) => totalLoc >= 1e18,
  },
  {
    id: 'sextillion-lines',
    name: 'Heat Death Coding',
    description: '1 sextillion lines. The universe has opinions.',
    icon: '☄️',
    condition: ({ totalLoc }) => totalLoc >= 1e21,
  },
  {
    id: 'septillion-lines',
    name: 'Beyond Comprehension',
    description: '1 septillion lines. No human can read it. It is perfect.',
    icon: '🌌',
    condition: ({ totalLoc }) => totalLoc >= 1e24,
  },
  {
    id: 'octillion-lines',
    name: 'The Infinite Repo',
    description: '1 octillion lines. The codebase contains the codebase.',
    icon: '♾️',
    condition: ({ totalLoc }) => totalLoc >= 1e27,
  },
  {
    id: 'decillion-lines',
    name: 'It Just Keeps Going',
    description: '1 decillion lines. You stopped counting. The ducks kept counting.',
    icon: '🦆🌌',
    condition: ({ totalLoc }) => totalLoc >= 1e33,
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
    condition: ({ totalClicks }) => totalClicks >= 4892 && totalClicks <= 4900,
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
      return ducks > 10 && others > 0 && ducks > others;
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
    name: 'Desensitized',
    description: 'Survived 50 negative events. The incidents no longer register emotionally.',
    icon: '😶',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 50,
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
  {
    id: 'prestige-50',
    name: 'The Loop Begins',
    description: 'Prestiged 50 times. The codebase remembers all of them.',
    icon: '🔁',
    condition: ({ prestigeCount }) => prestigeCount >= 50,
  },
  {
    id: 'prestige-100',
    name: 'Century of Refactors',
    description: 'Prestiged 100 times. Version control has given up.',
    icon: '💯',
    condition: ({ prestigeCount }) => prestigeCount >= 100,
  },

  // ── Great Refactor achievements ────────────────────────────────────────────
  {
    id: 'first-great-refactor',
    name: 'The Great Rewrite',
    description:
      'Completed your first Great Refactor. Everything is gone. The architecture remains.',
    icon: '🏛️',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 1,
  },
  {
    id: 'great-refactor-3',
    name: 'The Iterative Architect',
    description: 'Completed 3 Great Refactors. Each time, a new pattern emerges.',
    icon: '🔷',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 3,
  },
  {
    id: 'great-refactor-5',
    name: 'Systems Thinker',
    description: 'Completed 5 Great Refactors. You think in layers now.',
    icon: '🧩',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 5,
  },
  {
    id: 'great-refactor-10',
    name: 'Eternal Architect',
    description: 'Completed 10 Great Refactors. The architecture itself is the product.',
    icon: '🌐',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 10,
  },

  // ── The Loop era producer achievements ───────────────────────────────────────
  {
    id: 'the-loop-begins',
    name: 'Entered The Loop',
    description: 'Deployed The Process Itself. Nobody started it. Nobody can stop it.',
    icon: '⚙️',
    condition: ({ producers }) => (producers['the-process'] ?? 0) >= 1,
  },
  {
    id: 'sentient-deployed',
    name: 'Sentience Achieved',
    description: 'Deployed a Sentient Codebase. It approved this purchase before you clicked.',
    icon: '🌐',
    condition: ({ producers }) => (producers['sentient-codebase'] ?? 0) >= 1,
  },
  {
    id: 'duck-incorporated',
    name: 'Duck Incorporated',
    description:
      'Incorporated Duck Collective LLC. Registered in Delaware. The ducks have lawyers.',
    icon: '🦆⚖️',
    condition: ({ producers }) => (producers['duck-collective-llc'] ?? 0) >= 1,
  },
  {
    id: 'recursive-self-met',
    name: 'You Have Met Yourself',
    description: 'Deployed Recursive Self. It leaves comments you recognize from dreams.',
    icon: '🪞',
    condition: ({ producers }) => (producers['recursive-self'] ?? 0) >= 1,
  },
  {
    id: 'full-loop',
    name: 'The Loop Is Complete',
    description: 'Own all four Loop era entities. You were here before. They remember.',
    icon: '🔄🌌',
    condition: ({ producers }) =>
      (producers['the-process'] ?? 0) >= 1 &&
      (producers['sentient-codebase'] ?? 0) >= 1 &&
      (producers['duck-collective-llc'] ?? 0) >= 1 &&
      (producers['recursive-self'] ?? 0) >= 1,
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
    description: 'Reach 500,000 LOC without surviving any negative events. Suspiciously stable.',
    icon: '📶',
    condition: ({ totalLoc, negativeEventssurvived }) =>
      totalLoc >= 500000 && negativeEventssurvived === 0,
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

  // ── Great Refactor / Architecture achievements ────────────────────────────────
  {
    id: 'the-great-architect',
    name: 'The Great Architect',
    description: 'Performed your first Great Refactor. The legacy is gone. The points remain.',
    icon: '🏗️',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 1,
  },
  {
    id: 'loops-all-the-way-down',
    name: 'Loops All the Way Down',
    description: 'Performed 5 Great Refactors. You are the loop.',
    icon: '🔁',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 5,
  },
  {
    id: 'eternal-looper',
    name: 'Eternal Looper',
    description: 'Performed 10 Great Refactors. The codebase knows your face now.',
    icon: '♾️',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 10,
  },
  {
    id: 'protocol-breach-ach',
    name: 'Protocol Breach',
    description: 'Unlocked The Loop. The events file has a note about you.',
    icon: '🔓',
    condition: ({ architectureUpgrades }) => architectureUpgrades.includes('protocol-breach'),
  },
  {
    id: 'infinite-feedback-loop-ach',
    name: 'Infinite Feedback Loop',
    description: 'Purchased Infinite Feedback Loop. Each refactor now echoes forward.',
    icon: '🌀',
    condition: ({ architectureUpgrades }) =>
      architectureUpgrades.includes('infinite-feedback-loop'),
  },
  {
    id: 'all-architecture',
    name: 'Peak Architecture',
    description: 'Purchased all base Architecture upgrades. The diagram is complete.',
    icon: '🧱',
    condition: ({ architectureUpgrades }) =>
      [
        'event-horizon',
        'debt-forgiveness',
        'fast-learner',
        'recursive-memory',
        'nest-protocol',
        'compounding-interest',
        'event-driven',
        'loop-accelerant',
        'second-system',
        'protocol-breach',
        'ap-multiplier',
      ].every((id) => architectureUpgrades.includes(id)),
  },
  {
    id: 'chaos-veteran',
    name: 'Chaos Veteran',
    description: 'Survived 500 negative events. You have become the incident.',
    icon: '🔥',
    condition: ({ negativeEventssurvived }) => negativeEventssurvived >= 500,
  },
  {
    id: 'the-loop-producer',
    name: 'Process Array',
    description:
      'Own 25 of The Process Itself. The process is now self-auditing its process audits.',
    icon: '⚙️🔄',
    condition: ({ producers }) => (producers['the-process'] ?? 0) >= 25,
  },
  {
    id: 'sentient-code',
    name: 'Distributed Consciousness',
    description: 'Own 25 Sentient Codebases. Consensus was reached before you thought to ask.',
    icon: '🌐🧠',
    condition: ({ producers }) => (producers['sentient-codebase'] ?? 0) >= 25,
  },
  {
    id: 'duck-collective-llc-ach',
    name: 'Market Monopoly',
    description: 'Own 25 Duck Collective LLCs. The ducks have cornered the market on code.',
    icon: '🦆⚖️💰',
    condition: ({ producers }) => (producers['duck-collective-llc'] ?? 0) >= 25,
  },
  {
    id: 'recursive-self-ach',
    name: 'Infinite Regress',
    description: 'Own 25 Recursive Selves. You have lost count of which one is original.',
    icon: '🪞♾️',
    condition: ({ producers }) => (producers['recursive-self'] ?? 0) >= 25,
  },

  // ── Great Refactor deep milestones ───────────────────────────────────────────
  {
    id: 'great-refactor-25',
    name: 'Infinite Recursion',
    description: '25 Great Refactors. Stack overflow: personal achievement.',
    icon: '🌀',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 25,
  },
  {
    id: 'great-refactor-50',
    name: 'The Eternal Codebase',
    description: '50 Great Refactors. The codebase is eternal. So are you.',
    icon: '♾️',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 50,
  },
  {
    id: 'great-refactor-100',
    name: 'Reality Architect',
    description: '100 Great Refactors. The line between code and physics has dissolved.',
    icon: '🌌',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 100,
  },

  // ── Loop era depth achievements ───────────────────────────────────────────────
  {
    id: 'process-horde',
    name: 'Process Horde',
    description: 'Own 10 of The Process Itself. It files standups to its own standups.',
    icon: '⚙️⚙️',
    condition: ({ producers }) => (producers['the-process'] ?? 0) >= 10,
  },
  {
    id: 'hive-mind',
    name: 'Hive Mind',
    description: 'Own 10 Sentient Codebases. Consensus reached: it was always like this.',
    icon: '🧠🌐',
    condition: ({ producers }) => (producers['sentient-codebase'] ?? 0) >= 10,
  },
  {
    id: 'duck-empire',
    name: 'Duck Empire',
    description: 'Own 10 Duck Collective LLCs. Their IPO valued the universe at $4.',
    icon: '🦆👑',
    condition: ({ producers }) => (producers['duck-collective-llc'] ?? 0) >= 10,
  },
  {
    id: 'infinite-mirror',
    name: 'Infinite Mirror',
    description: 'Own 10 Recursive Selves. You have stopped recognizing any of them.',
    icon: '🪞🪞',
    condition: ({ producers }) => (producers['recursive-self'] ?? 0) >= 10,
  },
  {
    id: 'recursive-self-5',
    name: 'Five of You',
    description: '5 Recursive Selves. A quorum. They have opinions about your code.',
    icon: '🪞🪞',
    condition: ({ producers }) => (producers['recursive-self'] ?? 0) >= 5,
  },
  {
    id: 'loop-team-5',
    name: 'Deep in the Loop',
    description: 'Own 5 of each Loop era entity. The recursion is structural.',
    icon: '🔄🏗️',
    condition: ({ producers }) =>
      (producers['the-process'] ?? 0) >= 5 &&
      (producers['sentient-codebase'] ?? 0) >= 5 &&
      (producers['duck-collective-llc'] ?? 0) >= 5 &&
      (producers['recursive-self'] ?? 0) >= 5,
  },
  {
    id: 'loop-team-10',
    name: 'The Loop Is Eternal',
    description: 'Own 10 of each Loop era entity. You have been doing this forever.',
    icon: '♾️🌀',
    condition: ({ producers }) =>
      (producers['the-process'] ?? 0) >= 10 &&
      (producers['sentient-codebase'] ?? 0) >= 10 &&
      (producers['duck-collective-llc'] ?? 0) >= 10 &&
      (producers['recursive-self'] ?? 0) >= 10,
  },

  // ── Infinite Feedback Loop bonus milestones ───────────────────────────────────
  {
    id: 'feedback-loop-100',
    name: 'Self-Reinforcing System',
    description: 'Infinite Feedback Loop bonus reached +100%. The loop feeds itself.',
    icon: '🔄💯',
    condition: ({ greatRefactorProductionBonus }) => greatRefactorProductionBonus >= 1.0,
  },
  {
    id: 'feedback-loop-500',
    name: 'The Feedback Singularity',
    description: 'Infinite Feedback Loop bonus reached +500%. Production is a formality now.',
    icon: '🔄🌌',
    condition: ({ greatRefactorProductionBonus }) => greatRefactorProductionBonus >= 5.0,
  },
  {
    id: 'feedback-loop-1000',
    name: 'Transcendent Loop',
    description: 'Infinite Feedback Loop bonus reached +1000%. Numbers have lost their meaning.',
    icon: '♾️💥',
    condition: ({ greatRefactorProductionBonus }) => greatRefactorProductionBonus >= 10.0,
  },

  // ── Architecture mastery achievements ─────────────────────────────────────────
  {
    id: 'arch-all-base',
    name: 'Foundation Complete',
    description: 'Purchased all base Architecture upgrades through Token Proliferation.',
    icon: '🏛️',
    condition: ({ architectureUpgrades }) =>
      [
        'event-horizon',
        'debt-forgiveness',
        'fast-learner',
        'recursive-memory',
        'nest-protocol',
        'compounding-interest',
        'event-driven',
        'loop-accelerant',
        'second-system',
        'protocol-breach',
        'ap-multiplier',
        'token-proliferation',
        'infinite-feedback-loop',
      ].every((id) => architectureUpgrades.includes(id)),
  },
  {
    id: 'arch-singularity',
    name: 'Singularity Architect',
    description: 'Purchased the Singularity Refactor. You compile reality.',
    icon: '⚡🏗️',
    condition: ({ architectureUpgrades }) => architectureUpgrades.includes('singularity-refactor'),
  },
  {
    id: 'arch-quantum',
    name: 'Quantum Architect',
    description:
      'Purchased Quantum Architecture. The codebase exists in all futures simultaneously.',
    icon: '⚛️🏗️',
    condition: ({ architectureUpgrades }) => architectureUpgrades.includes('quantum-architecture'),
  },
  {
    id: 'arch-infinite-compile',
    name: 'The Build Never Ends',
    description:
      'Purchased Infinite Compile Time. It has been compiling since before the universe.',
    icon: '⏳♾️',
    condition: ({ architectureUpgrades }) => architectureUpgrades.includes('infinite-compile-time'),
  },

  // ── Ultra late-game LOC milestones ────────────────────────────────────────────
  {
    id: 'loc-1e42',
    name: 'Unified Field Coder',
    description: 'Reached 1 Td LOC. Physics and code: same thing now.',
    icon: '🔬',
    condition: ({ totalLoc }) => totalLoc >= 1e42,
  },
  {
    id: 'loc-1e51',
    name: 'Hyperdimensional Dev',
    description: 'Reached 1 Sxd LOC. The IDE has dimensions you cannot see.',
    icon: '🌌',
    condition: ({ totalLoc }) => totalLoc >= 1e51,
  },
  {
    id: 'loc-1e54',
    name: 'The Infinite Monkey',
    description: 'Reached 1 Spd LOC. They proved the theorem. Empirically.',
    icon: '🐒',
    condition: ({ totalLoc }) => totalLoc >= 1e54,
  },
  {
    id: 'loc-1e57',
    name: 'Post-Spd Coder',
    description: 'Reached 1 Ocd LOC. Numbers stopped meaning anything five digits ago.',
    icon: '🌠',
    condition: ({ totalLoc }) => totalLoc >= 1e57,
  },
  {
    id: 'loc-1e60',
    name: 'The Codebase Ate The Universe',
    description: 'Reached 1 Nod LOC. There is only code.',
    icon: '🌌🦆',
    condition: ({ totalLoc }) => totalLoc >= 1e60,
  },

  // ── Ultra-ultra LOC milestones ────────────────────────────────────────────────
  {
    id: 'loc-1e66',
    name: 'Beyond Comprehension v2',
    description: 'Reached 1e66 LOC. The number itself refuses to render.',
    icon: '🔮✨',
    condition: ({ totalLoc }) => totalLoc >= 1e66,
  },
  {
    id: 'loc-1e72',
    name: 'Cosmic Overflow',
    description: 'Reached 1e72 LOC. JavaScript says this is still a valid number. Barely.',
    icon: '💫🌌',
    condition: ({ totalLoc }) => totalLoc >= 1e72,
  },

  // ── Era 6: Beyond producer achievements ───────────────────────────────────────
  {
    id: 'beyond-multiverse',
    name: 'Multiverse Access',
    description: 'Purchased your first Multiverse Compiler.',
    icon: '🌀',
    condition: ({ producers }) => (producers['multiverse-compiler'] ?? 0) >= 1,
  },
  {
    id: 'beyond-boardroom',
    name: 'Infinite Meeting',
    description: 'Purchased your first Boardroom. The meeting has no end.',
    icon: '🏢',
    condition: ({ producers }) => (producers['the-boardroom'] ?? 0) >= 1,
  },
  {
    id: 'beyond-reality',
    name: 'Reality Hacker',
    description: 'Purchased your first Reality Engine. Physics is just a config file now.',
    icon: '⚡🌐',
    condition: ({ producers }) => (producers['reality-engine'] ?? 0) >= 1,
  },
  {
    id: 'beyond-final',
    name: 'The Final Push',
    description: 'Purchased your first Final Push. There are no more commits after this.',
    icon: '🚀∞',
    condition: ({ producers }) => (producers['the-final-push'] ?? 0) >= 1,
  },
  {
    id: 'beyond-complete',
    name: 'Beyond Complete',
    description: 'Own at least 1 of every Beyond era producer.',
    icon: '🌀🏢⚡🚀',
    condition: ({ producers }) =>
      (producers['multiverse-compiler'] ?? 0) >= 1 &&
      (producers['the-boardroom'] ?? 0) >= 1 &&
      (producers['reality-engine'] ?? 0) >= 1 &&
      (producers['the-final-push'] ?? 0) >= 1,
  },

  // ── Synergy achievements ──────────────────────────────────────────────────────
  {
    id: 'first-synergy',
    name: 'Synergy!',
    description: 'Activated your first producer synergy.',
    icon: '🔗',
    condition: ({ architectureUpgrades, producers }) => {
      if (!architectureUpgrades.includes('synergy-protocol')) return false;
      // Check if any synergy conditions are met (simplified check for most common one)
      return (
        ((producers['junior-dev'] ?? 0) >= 10 &&
          (producers['senior-dev'] ?? 0) >= 5 &&
          (producers['tech-lead'] ?? 0) >= 3) ||
        ((producers['coffee-machine'] ?? 0) >= 50 && (producers['senior-dev'] ?? 0) >= 10) ||
        ((producers['mechanical-keyboard'] ?? 0) >= 50 && (producers.autocomplete ?? 0) >= 25) ||
        ((producers['github-copilot'] ?? 0) >= 5 &&
          (producers['ai-agent'] ?? 0) >= 3 &&
          (producers.agi ?? 0) >= 1) ||
        ((producers['rubber-duck'] ?? 0) >= 200 && (producers['duck-collective-llc'] ?? 0) >= 1)
      );
    },
  },

  // ── Higher GR achievements ────────────────────────────────────────────────────
  {
    id: 'gr-15',
    name: 'Compulsive Refactorer',
    description: 'Performed 15 Great Refactors. The codebase has trust issues.',
    icon: '🔄🔷',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 15,
  },
  {
    id: 'gr-30',
    name: 'Architect of Architects',
    description: 'Performed 30 Great Refactors. Architectures design themselves in your presence.',
    icon: '🏛️♾️',
    condition: ({ greatRefactorCount }) => greatRefactorCount >= 30,
  },

  // ── Autobuyer achievement ─────────────────────────────────────────────────────
  {
    id: 'fully-automated',
    name: 'Fully Automated',
    description: 'Installed both autobuyers. The game plays itself.',
    icon: '🤖⚙️',
    condition: ({ architectureUpgrades }) =>
      architectureUpgrades.includes('autobuyer-producers') &&
      architectureUpgrades.includes('autobuyer-upgrades'),
  },
];
