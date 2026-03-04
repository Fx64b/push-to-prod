export interface Producer {
  id: string;
  name: string;
  flavor: string;
  baseLOCps: number;
  baseCost: number;
  icon: string;
  /** Hide in shop until this much total LOC has been earned. Omit = always visible. */
  unlockLoc?: number;
}

export const PRODUCERS: Producer[] = [
  {
    id: 'rubber-duck',
    name: 'Rubber Duck',
    flavor: 'You explain the bug. It judges you silently.',
    baseLOCps: 0.1,
    baseCost: 10,
    icon: '🦆',
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
    id: 'senior-dev',
    name: 'Senior Dev',
    flavor: 'Deletes 1,000 lines. Adds 5. Ships it.',
    baseLOCps: 400,
    baseCost: 75000,
    icon: '🧙',
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
    id: '10x-engineer',
    name: '10x Engineer',
    flavor: "Doesn't actually exist. You hired one anyway.",
    baseLOCps: 2500,
    baseCost: 500000,
    icon: '⚡',
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
];
