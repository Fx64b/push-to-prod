export type EventEffectType =
  | 'locps_multiplier'
  | 'click_multiplier'
  | 'loc_burst'
  | 'click_disabled'
  | 'halt';

export interface GameEvent {
  id: string;
  emoji: string;
  title: string;
  description: string;
  effectType: EventEffectType;
  effectValue: number; // multiplier or burst amount
  duration: number; // seconds
  isNegative: boolean;
}

export const EVENTS: GameEvent[] = [
  {
    id: 'production-down',
    emoji: '🔥',
    title: 'Production is down!',
    description: 'The site is on fire. LOC/s halved while you fight the blaze.',
    effectType: 'locps_multiplier',
    effectValue: 0.5,
    duration: 20,
    isNegative: true,
  },
  {
    id: 'github-viral',
    emoji: '⭐',
    title: 'GitHub stars going viral',
    description: 'The repo is trending! LOC/s ×3 as contributors flood in.',
    effectType: 'locps_multiplier',
    effectValue: 3,
    duration: 10,
    isNegative: false,
  },
  {
    id: 'bug-in-production',
    emoji: '🐛',
    title: 'Bug in production',
    description: "Clicking disabled — you're too busy fixing P0s to write new code.",
    effectType: 'click_disabled',
    effectValue: 0,
    duration: 10,
    isNegative: true,
  },
  {
    id: 'coffee-machine-broken',
    emoji: '☕',
    title: 'Coffee machine broken',
    description: 'Productivity drops. LOC/s ×0.8 until someone orders beans.',
    effectType: 'locps_multiplier',
    effectValue: 0.8,
    duration: 30,
    isNegative: true,
  },
  {
    id: 'ceo-demo',
    emoji: '📣',
    title: 'CEO wants a live demo',
    description: 'Crunch mode activated! Click value ×10.',
    effectType: 'click_multiplier',
    effectValue: 10,
    duration: 20,
    isNegative: false,
  },
  {
    id: 'merge-conflict',
    emoji: '🤝',
    title: 'Merge conflict detected',
    description: 'HEAD is detached. Half your team is stuck. LOC/s ×0.5.',
    effectType: 'locps_multiplier',
    effectValue: 0.5,
    duration: 15,
    isNegative: true,
  },
  {
    id: 'npm-deprecated',
    emoji: '📦',
    title: 'npm package deprecated',
    description: 'Critical dependency removed from npm. LOC/s ×0.7.',
    effectType: 'locps_multiplier',
    effectValue: 0.7,
    duration: 20,
    isNegative: true,
  },
  {
    id: 'cve-discovered',
    emoji: '🚨',
    title: 'CVE discovered in your stack',
    description: 'All production halted for emergency patching.',
    effectType: 'halt',
    effectValue: 0,
    duration: 10,
    isNegative: true,
  },
  {
    id: 'hackernews-frontpage',
    emoji: '🗞️',
    title: 'HackerNews front page',
    description: 'The hype is real. LOC/s ×3 for the next 30 seconds.',
    effectType: 'locps_multiplier',
    effectValue: 3,
    duration: 30,
    isNegative: false,
  },
  {
    id: 'code-review',
    emoji: '📝',
    title: 'Code review requested',
    description: 'Waiting for LGTM... LOC/s ×0.3 while you block on feedback.',
    effectType: 'locps_multiplier',
    effectValue: 0.3,
    duration: 30,
    isNegative: true,
  },
];
