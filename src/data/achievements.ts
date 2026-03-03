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

export const ACHIEVEMENTS: Achievement[] = [
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
    id: 'rubber-duck-programmer',
    name: 'Rubber Duck Programmer',
    description: 'Hired your first rubber duck consultant.',
    icon: '🦆',
    condition: ({ producers }) => (producers['rubber-duck'] ?? 0) >= 1,
  },
  {
    id: 'type-a-personality',
    name: 'Type A Personality',
    description: 'Amassed a fleet of 10 mechanical keyboards.',
    icon: '⌨️',
    condition: ({ producers }) => (producers['mechanical-keyboard'] ?? 0) >= 10,
  },
  {
    id: 'stackoverflow-enjoyer',
    name: 'Stack Overflow Enjoyer',
    description: '25 Stack Overflow tabs open simultaneously.',
    icon: '📋',
    condition: ({ producers }) => (producers['stackoverflow-tab'] ?? 0) >= 25,
  },
  {
    id: '10x-team',
    name: '10x Team',
    description: 'Hired at least one of every producer.',
    icon: '🏆',
    condition: ({ producers }) =>
      [
        'rubber-duck',
        'mechanical-keyboard',
        'autocomplete',
        'stackoverflow-tab',
        'junior-dev',
        'senior-dev',
        '10x-engineer',
        'github-copilot',
        'ai-agent',
        'agi',
      ].every((id) => (producers[id] ?? 0) >= 1),
  },
  {
    id: 'big-o-h-no',
    name: 'Big O(h no)',
    description: 'Own 100 of any single producer.',
    icon: '📈',
    condition: ({ producers }) => Object.values(producers).some((count) => count >= 100),
  },
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
    id: 'deploy-on-friday',
    name: 'Deploy on Friday',
    description: 'Bought the Deploy on Fridays upgrade. Brave.',
    icon: '😈',
    condition: ({ upgrades }) => upgrades.includes('deploy-on-fridays'),
  },
  {
    id: 'great-refactor',
    name: 'The Great Refactor',
    description: 'Completed your first prestige.',
    icon: '♻️',
    condition: ({ prestigeCount }) => prestigeCount >= 1,
  },
    {
    id: 'fortune-500-company',
    name: 'Fortune 500 Company',
    description: 'Hired at least 100 of every producer. (Do you even have a life? Go Touch Grass!)',
    icon: '🤯',
    condition: ({ producers }) =>
      [
        'rubber-duck',
        'mechanical-keyboard',
        'autocomplete',
        'stackoverflow-tab',
        'junior-dev',
        'senior-dev',
        '10x-engineer',
        'github-copilot',
        'ai-agent',
        'agi',
      ].every((id) => (producers[id] ?? 0) >= 100),
  },
];
