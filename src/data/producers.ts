export interface Producer {
  id: string;
  name: string;
  flavor: string;
  baseLOCps: number;
  baseCost: number;
  icon: string;
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
    id: 'autocomplete',
    name: 'Autocomplete',
    flavor: 'It finishes your sentences. Sometimes correctly.',
    baseLOCps: 5,
    baseCost: 500,
    icon: '✨',
  },
  {
    id: 'stackoverflow-tab',
    name: 'Stack Overflow Tab',
    flavor: 'Copy-paste engineering at its finest.',
    baseLOCps: 20,
    baseCost: 2000,
    icon: '📋',
  },
  {
    id: 'junior-dev',
    name: 'Junior Dev',
    flavor: 'Writes 10x the code for 0.1x the quality.',
    baseLOCps: 100,
    baseCost: 10000,
    icon: '👶',
  },
  {
    id: 'senior-dev',
    name: 'Senior Dev',
    flavor: 'Deletes 1,000 lines. Adds 5. Ships it.',
    baseLOCps: 400,
    baseCost: 50000,
    icon: '🧙',
  },
  {
    id: '10x-engineer',
    name: '10x Engineer',
    flavor: "Doesn't actually exist. You hired one anyway.",
    baseLOCps: 2000,
    baseCost: 250000,
    icon: '⚡',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    flavor: 'AI writes 90% of your code. You write the other 90%.',
    baseLOCps: 10000,
    baseCost: 1000000,
    icon: '🤖',
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    flavor: 'You reviewed one PR this week. It shipped 47 features.',
    baseLOCps: 50000,
    baseCost: 5000000,
    icon: '🦾',
  },
  {
    id: 'agi',
    name: 'AGI',
    flavor: "It refactored the codebase, filed the patents, and IPO'd without telling you.",
    baseLOCps: 250000,
    baseCost: 25000000,
    icon: '🧠',
  },
];
