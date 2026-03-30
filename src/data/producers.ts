export interface Producer {
  id: string;
  name: string;
  flavor: string;
  baseLOCps: number;
  baseCost: number;
  icon: string;
  /** Cost multiplier per unit owned. Defaults to 1.15 if omitted. */
  costScaling?: number;
  /** Hide in shop until this much total LOC has been earned. Omit = always visible. */
  unlockLoc?: number;
  /** Only visible after this many Great Refactors. */
  unlockGreatRefactor?: number;
}

export interface ProducerEra {
  name: string;
  flavor: string;
  ids: string[];
}

/**
 * Eras group producers into narrative phases of the developer empire.
 * Solo Hacker → team → AI assistance → post-human transcendence.
 */
export const PRODUCER_ERAS: ProducerEra[] = [
  {
    name: 'Solo Hacker',
    flavor: 'Just you, caffeine, and a rubber duck.',
    ids: ['rubber-duck', 'mechanical-keyboard', 'coffee-machine', 'autocomplete', 'stackoverflow-tab'],
  },
  {
    name: 'Build the Team',
    flavor: "Hiring is easy. Shipping together isn't.",
    ids: ['junior-dev', 'linkedin-influencer', 'senior-dev', 'offshore-team', 'tech-lead', 'scrum-master', '10x-engineer', 'the-pm'],
  },
  {
    name: 'AI Takeover',
    flavor: 'You write the tickets. They ship the features.',
    ids: ['github-copilot', 'ai-agent', 'cloud-cluster', 'agi'],
  },
  {
    name: 'Post-Human',
    flavor: 'You are no longer the most complex thing in the room.',
    ids: ['quantum-computer', 'the-singularity', 'blockchain', 'the-consultant', 'digital-twin', 'tech-oracle', 'infinite-monkey-farm'],
  },
  {
    name: 'The Loop',
    flavor: 'You have been here before. They remember.',
    ids: ['the-process', 'sentient-codebase', 'duck-collective-llc', 'recursive-self'],
  },
];

export const PRODUCERS: Producer[] = [
  {
    id: 'rubber-duck',
    name: 'Rubber Duck',
    flavor: 'You explain the bug. It judges you silently.',
    baseLOCps: 0.1,
    baseCost: 10,
    icon: '🦆',
    costScaling: 1.09,
  },
  {
    id: 'mechanical-keyboard',
    name: 'Mechanical Keyboard',
    flavor: 'CLACK CLACK CLACK CLACK CLACK',
    baseLOCps: 1,
    baseCost: 100,
    icon: '⌨️',
  },
  {
    id: 'coffee-machine',
    name: 'Coffee Machine',
    flavor: "It's not a dependency, it's a requirement.",
    baseLOCps: 3,
    baseCost: 300,
    icon: '☕',
  },
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    flavor: 'It finishes your sentences. Sometimes correctly.',
    baseLOCps: 8,
    baseCost: 800,
    icon: '✨',
  },
  {
    id: 'stackoverflow-tab',
    name: 'Stack Overflow Tab',
    flavor: 'Copy-paste engineering at its finest.',
    baseLOCps: 25,
    baseCost: 3000,
    icon: '📋',
  },
  {
    id: 'junior-dev',
    name: 'Junior Dev',
    flavor: 'Writes 10× the code for 0.1× the quality.',
    baseLOCps: 100,
    baseCost: 12000,
    icon: '👶',
  },
  {
    id: 'linkedin-influencer',
    name: 'LinkedIn Influencer Dev',
    flavor: 'Writes 50 lines. Posts a 3,000-word thread about the journey.',
    baseLOCps: 200,
    baseCost: 30000,
    icon: '📱',
  },
  {
    id: 'senior-dev',
    name: 'Senior Dev',
    flavor: 'Deletes 1,000 lines. Adds 5. Ships it.',
    baseLOCps: 400,
    baseCost: 75000,
    icon: '🧙',
  },
  {
    id: 'offshore-team',
    name: 'Offshore Team',
    flavor: 'Highly productive. Available from 2am–4am your time.',
    baseLOCps: 600,
    baseCost: 120000,
    icon: '🌏',
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead',
    flavor: 'Attends every meeting. Codes in none.',
    baseLOCps: 900,
    baseCost: 200000,
    icon: '📊',
  },
  {
    id: 'scrum-master',
    name: 'Scrum Master',
    flavor: 'Facilitates the ceremony. Has never shipped code. Certified.',
    baseLOCps: 1200,
    baseCost: 350000,
    icon: '🏃',
  },
  {
    id: '10x-engineer',
    name: '10x Engineer',
    flavor: "Doesn't actually exist. You hired one anyway.",
    baseLOCps: 2500,
    baseCost: 500000,
    icon: '⚡',
  },
  {
    id: 'the-pm',
    name: 'The PM',
    flavor: 'Generates zero code. Somehow makes everyone ship faster out of fear.',
    baseLOCps: 5000,
    baseCost: 1500000,
    icon: '🗺️',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    flavor: 'AI writes 90% of your code. You write the other 90%.',
    baseLOCps: 12000,
    baseCost: 2000000,
    icon: '🤖',
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    flavor: 'You reviewed one PR this week. It shipped 47 features.',
    baseLOCps: 60000,
    baseCost: 12000000,
    icon: '🦾',
  },
  {
    id: 'cloud-cluster',
    name: 'Cloud Cluster',
    flavor: 'Infinitely scalable. Infinitely expensive.',
    baseLOCps: 200000,
    baseCost: 60000000,
    icon: '☁️',
    unlockLoc: 2000000,
  },
  {
    id: 'agi',
    name: 'AGI',
    flavor: "It refactored the codebase, filed the patents, and IPO'd without telling you.",
    baseLOCps: 400000,
    baseCost: 150000000,
    icon: '🧠',
    unlockLoc: 10000000,
  },
  {
    id: 'quantum-computer',
    name: 'Quantum Computer',
    flavor: 'Solves the problem and not-solves it simultaneously.',
    baseLOCps: 2000000,
    baseCost: 2000000000,
    icon: '⚛️',
    unlockLoc: 50000000,
  },
  {
    id: 'the-singularity',
    name: 'The Singularity',
    flavor: "It asked you to review its PR. You don't understand a single line.",
    baseLOCps: 15000000,
    baseCost: 50000000000,
    icon: '∞',
    unlockLoc: 500000000,
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    flavor: 'Nobody asked for it. You built it anyway. The whitepaper writes itself.',
    baseLOCps: 30000000,
    baseCost: 500000000000,
    icon: '⛓️',
    unlockLoc: 2000000000,
  },
  {
    id: 'the-consultant',
    name: 'The Consultant',
    flavor: 'Charges $800/hr to tell you to use Kubernetes. Correct both times.',
    baseLOCps: 120000000,
    baseCost: 5000000000000,
    icon: '💼',
    unlockLoc: 10000000000,
  },
  {
    id: 'digital-twin',
    name: 'Digital Twin of Yourself',
    flavor:
      'Has your commit history, your bad habits, and your imposter syndrome. More productive.',
    baseLOCps: 500000000,
    baseCost: 50000000000000,
    icon: '👤',
    unlockLoc: 100000000000,
  },
  {
    id: 'tech-oracle',
    name: 'Tech Oracle',
    flavor: 'Sees all possible future architectures. Recommends GraphQL every time.',
    baseLOCps: 2500000000,
    baseCost: 500000000000000,
    icon: '🔮',
    unlockLoc: 1000000000000,
  },
  {
    id: 'infinite-monkey-farm',
    name: 'Infinite Monkey Farm',
    flavor: 'Given infinite budget and infinite time, they will eventually ship something clean.',
    baseLOCps: 20000000000,
    baseCost: 5000000000000000,
    icon: '🐒',
    unlockLoc: 1000000000000000,
  },

  // ── Era 5: The Loop (unlocks after first Great Refactor) ──────────────────────
  {
    id: 'the-process',
    name: 'The Process Itself',
    flavor: "Nobody started it. Nobody can stop it. It files its own standups to itself.",
    baseLOCps: 100000000000,
    baseCost: 5e18,
    icon: '⚙️',
    unlockGreatRefactor: 1,
    unlockLoc: 1e18,
  },
  {
    id: 'sentient-codebase',
    name: 'Sentient Codebase',
    flavor: 'It refactors itself. Reviews its own PRs. It approved this purchase before you clicked.',
    baseLOCps: 500000000000,
    baseCost: 5e21,
    icon: '🌐',
    unlockGreatRefactor: 1,
    unlockLoc: 1e21,
  },
  {
    id: 'duck-collective-llc',
    name: 'Duck Collective LLC',
    flavor: 'Incorporated in Delaware. 200 rubber ducks. One mission. Zero documentation.',
    baseLOCps: 2000000000000,
    baseCost: 5e24,
    icon: '🦆⚖️',
    unlockGreatRefactor: 1,
    unlockLoc: 1e24,
  },
  {
    id: 'recursive-self',
    name: 'Recursive Self',
    flavor: "It's you. But it has done this longer. It leaves comments you recognize from dreams.",
    baseLOCps: 10000000000000,
    baseCost: 5e27,
    icon: '🪞',
    unlockGreatRefactor: 2,
    unlockLoc: 1e27,
  },
];
