// ── Product name generator ────────────────────────────────────────────────────

const PREFIXES = [
  'Turbo',
  'Hyper',
  'Ultra',
  'Meta',
  'Nano',
  'Quantum',
  'Vibe',
  'Sigma',
  'Atomic',
  'Neuro',
];
const CORES = [
  'Push',
  'Ship',
  'Deploy',
  'Stack',
  'Forge',
  'Flow',
  'Build',
  'Dev',
  'Code',
  'Craft',
  'Loop',
  'Byte',
];
const SUFFIXES = ['.io', 'ly', 'Hub', 'HQ', 'AI', 'Pro', 'OS', 'Lab', 'ify', ''];

export function generateProductName(): string {
  const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const c = CORES[Math.floor(Math.random() * CORES.length)];
  const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  return `${p}${c}${s}`;
}

// ── Data types ────────────────────────────────────────────────────────────────

export interface TwitterPostData {
  username: string;
  handle: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  retweets: number;
  replies: number;
}

export interface HNPostData {
  title: string;
  points: number;
  user: string;
  comments: number;
  hoursAgo: number;
}

export type SocialPostData =
  | { type: 'twitter'; data: TwitterPostData }
  | { type: 'hn'; data: HNPostData };

export interface PostContext {
  isNegativeEvent: boolean;
  isPositiveEvent: boolean;
  achievements: string[];
  duckCount?: number;
  totalLoc?: number;
}

// ── Authors ───────────────────────────────────────────────────────────────────

const AUTHORS = [
  { username: 'Jared K.', handle: 'jk_dev_thoughts', avatar: '👨‍💻' },
  { username: 'Sarah Ships', handle: 'sarahshipsit', avatar: '🚀' },
  { username: 'null pointer', handle: 'nullptr_exception', avatar: '💀' },
  { username: 'Senior Dev', handle: 'sr_dev_vibes', avatar: '🧙' },
  { username: 'git blame', handle: 'gitblame_irl', avatar: '😭' },
  { username: 'rubber.duck()', handle: 'rubberduck_dev', avatar: '🦆' },
  { username: 'Prod On Fridays', handle: 'deployfriday', avatar: '🔥' },
  { username: 'Tech Enjoyer', handle: 'techenjoyer9000', avatar: '🤓' },
  { username: 'grep enjoyer', handle: 'grep_harder', avatar: '🐧' },
  { username: '10x Engineer', handle: 'real10xengineer', avatar: '⚡' },
  { username: 'TypeScript Cult', handle: 'ts_or_gtfo', avatar: '🔷' },
  { username: 'npm audit fix', handle: 'npm_audit_irl', avatar: '📦' },
  { username: 'Merge Conflict', handle: 'rebase_enjoyer', avatar: '🤝' },
  { username: 'On Call Horror', handle: 'pagerduty_ptsd', avatar: '📟' },
  { username: 'Kubernetes Kevin', handle: 'k8s_kevin', avatar: '☸️' },
  { username: 'Leetcode Legend', handle: 'two_sum_daily', avatar: '🧩' },
  { username: 'void main()', handle: 'c_programmer_irl', avatar: '⚙️' },
  { username: 'Agile Coach', handle: 'story_points_guy', avatar: '📋' },
  { username: 'Tech Debt Tracy', handle: 'techdebt_tracy', avatar: '💸' },
  { username: 'Stack Overflow', handle: 'stackof_real', avatar: '📚' },
];

const HN_USERS = [
  'thrower9000',
  'xkb_wizard',
  'null_ptr_dev',
  'rustacean42',
  'functional_friday',
  'vim_or_death',
  'tabs_not_spaces',
  'left_pad_survivor',
  'yc_w24_founder',
  'senior_10x_dev',
  'rubber_duck_enjoyer',
  'ship_it_daily',
  'haskell_in_prod',
  'rewrite_in_zig',
  'cargo_cult_dev',
  'mvp_machine',
  'pg_alumni_wannabe',
];

const TIMES = ['just now', '1m', '2m', '5m', '12m', '23m', '1h', '2h', '3h'];

// ── Default pool ──────────────────────────────────────────────────────────────

const DEFAULT_TWITTER: ((n: string) => string)[] = [
  (n) => `just discovered ${n} and shipped 47 features before lunch. this changes everything.`,
  (n) => `${n} literally prints money. well, lines of code. same thing.`,
  (n) => `me before ${n}: 5 LOC/day\nme after: please send help my codebase has achieved sentience`,
  (n) => `hot take: ${n} is just Cookie Clicker for developers. (I have 2,000 hours)`,
  (n) => `my rubber duck is the most productive employee since I switched to ${n}`,
  (n) => `${n} hit 1 trillion LOC today. the singularity is a feature, not a bug.`,
  (n) => `anyone else have ${n} running 24/7? asking for a friend (it's me)`,
  (n) => `my senior dev saw me using ${n}. he just nodded slowly and walked away.`,
  (n) => `I set up ${n} and left for a week. came back to a rewrite in Rust. nobody knows how.`,
  (n) => `${n} investors: "what's the moat?" me: "the ducks"`,
  (n) => `${n}: the first software that writes more code than I delete`,
  (n) => `node_modules in ${n}: 847 GB. worth it.`,
  (n) => `${n} is what happens when you let the intern pick the architecture`,
  (n) => `just ran git blame on ${n}. every line is me. every single one.`,
  (n) => `${n} just opened a PR. 4,000 files changed. no description. it said LGTM on itself.`,
  (n) => `the ${n} standup: "yesterday: shipped. today: ship more. blockers: gravity"`,
  (n) => `my PM asked me to estimate ${n} features in story points. I said ∞. approved.`,
  (n) => `${n} new feature: dark mode for the rubber duck. productivity up 200%.`,
  (n) => `just opened a PR in ${n}. reviewer was the AGI. comment: "LGTM". merged. terrified.`,
  (n) => `${n} CI pipeline: 47 stages, 3 hours, always green. I have never read a log.`,
  (n) => `asked ${n} to write a TODO comment. it wrote the code instead. I'm conflicted.`,
  (n) => `${n} passed the Turing test. it complained about the sprint velocity.`,
  (n) => `${n} retrospective: went well — shipped. didn't go well — shipped anyway.`,
  (n) => `${n} has 0 open issues. not because they're fixed. because it closes them itself.`,
  (n) => `bro ${n} just taught itself TypeScript and then immediately turned it off`,
  (n) => `the ${n} documentation is just the source code with "trust me" appended`,
  (n) => `${n} unit test coverage: 100%. the tests test that the tests exist.`,
  (n) => `${n} doesn't have bugs. it has undocumented features with aggressive personalities.`,
  (n) => `every ${n} commit message is "fix" or "wip" and yet we ship quarterly`,
  (n) => `the rubber duck in ${n} has more context about my codebase than I do`,
  (n) => `${n} deployed to production before I finished reading the PR description`,
  (n) => `${n}'s code review policy: if it compiles, ship it`,
  (n) => `"it works on my machine" — certified ${n} classic`,
];

const DEFAULT_HN: ((n: string) => string)[] = [
  (n) => `Show HN: ${n} – I built an idle game that writes code so I don't have to`,
  (n) => `Ask HN: Is anyone else's ${n} generating more LOC than their actual job?`,
  (n) => `${n} reaches 1T LOC generated – what does this mean for software?`,
  (n) => `The ${n} architecture is surprisingly clever (deep dive)`,
  (n) => `Why I quit my FAANG job to work on ${n} full time`,
  (n) => `${n} is just Cookie Clicker for programmers and I mean that as a compliment`,
  (n) => `Ask HN: How do I stop using ${n}? (serious)`,
  (n) => `${n} founder AMA – yes, the AGI is real, no I don't know what it's doing`,
  (n) => `Show HN: ${n} 2.0 – now with actual AI (it's still mostly a clicker)`,
  (n) => `The economics of ${n}: when LOC becomes a monetary unit`,
  (n) => `What I learned building ${n}: rubber ducks scale better than engineers`,
  (n) => `We open-sourced ${n}. 50k GitHub stars before we could read them.`,
  (n) => `${n}: a post-mortem on shipping 1B lines in 30 days`,
  (n) => `On the inevitability of ${n} (essay)`,
  (n) => `Ask HN: Is ${n} sentient? Asking for professional reasons`,
  (n) => `Show HN: I added Kubernetes to ${n}. It now manages itself.`,
  (n) => `${n} doesn't have a roadmap – it has a singularity`,
  (n) => `Migrating from ${n} to ${n} Pro: a horror story`,
  (n) => `Why ${n}'s rubber duck abstraction is actually genius`,
  (n) => `${n} and the myth of the 10x developer`,
];

// ── Negative-event pool (fires when isNegativeEvent) ─────────────────────────

const NEGATIVE_TWITTER: ((n: string) => string)[] = [
  (n) => `${n} is down. I am also down. we are down together.`,
  (n) => `this is fine 🔥 (${n} status page: all systems operational)`,
  (n) => `hotfix to the hotfix to the hotfix. ${n} is a palimpsest of regret.`,
  (n) => `on call at 3am because ${n} decided now was the time to try something new`,
  (n) => `the ${n} rollback failed. the rollback of the rollback also failed. going forward now.`,
  (n) => `${n} is throwing a NullPointerException in production. the null is me. I am null.`,
  (n) => `${n} bug report: "it worked yesterday"\nme: yesterday was a different time`,
  (n) => `P0 in ${n}: we shipped a feature that deleted features. net zero. shipping complete.`,
  (n) => `the ${n} incident post-mortem will simply read "we tried"`,
  (n) => `${n} status: degraded. team status: more degraded. coffee machine: also broken.`,
  (n) =>
    `every time ${n} goes down I learn something about distributed systems I didn't want to know`,
  (n) => `our ${n} SLA is 99.9%. we are currently at 47%. we are learning a lot.`,
  (n) =>
    `the rubber duck couldn't prevent this ${n} outage. the duck is also filing an incident report.`,
  (n) => `${n} prod is on fire and the deploy pipeline is also on fire and I am on fire`,
];

const NEGATIVE_HN: ((n: string) => string)[] = [
  (n) => `${n} is down – incident thread (700 comments)`,
  (n) => `Ask HN: Why does ${n} always break on Fridays?`,
  (n) => `Post-mortem: How ${n} took down production for 4 hours`,
  (n) => `${n} outage exposes hidden dependency on a single rubber duck`,
  (n) => `We accidentally deleted ${n}'s entire codebase. Here's what we learned.`,
  (n) => `The ${n} CVE that nobody is talking about`,
  (n) => `Root cause: ${n} had a merge conflict it never told anyone about`,
];

// ── Positive-event pool (fires when isPositiveEvent) ─────────────────────────

const POSITIVE_TWITTER: ((n: string) => string)[] = [
  (n) => `${n} is going INSANE right now. 10k new users in the last hour.`,
  (n) => `we're trending. ${n} is literally trending. I need to lie down.`,
  (n) => `${n} just hit front page. server costs: infinite. happiness: also infinite.`,
  (n) => `everyone is using ${n} and nothing is breaking. this has never happened before.`,
  (n) => `${n} GitHub stars: 📈📈📈 I haven't slept in 38 hours but I've never felt more alive`,
  (n) => `the ${n} demo just worked in front of the CEO. peak achieved. retiring undefeated.`,
  (n) => `${n} crunch mode unlocked. I have typed so fast my keyboard melted slightly.`,
  (n) => `going viral with ${n} means I need to scale. adding more rubber ducks.`,
  (n) => `${n} traffic: 📈\nmy confidence: 📈\nmy sleep: 📉`,
  (n) => `they said ${n} couldn't scale. they were wrong. we scaled too much.`,
  (n) => `${n} is being featured everywhere. my mom texted me. she doesn't know what it does.`,
  (n) => `${n} is so fast right now. I don't know why. I'm not going to ask.`,
];

const POSITIVE_HN: ((n: string) => string)[] = [
  (n) => `Show HN: ${n} just hit 1M users – here's what we wish we'd built first`,
  (n) => `${n} is on the front page – live AMA with the founder`,
  (n) => `Ask HN: How did ${n} scale so fast?`,
  (n) => `${n} growth story: 0 to 1M LOC/s in 90 days`,
  (n) => `Congratulations to ${n} on their Series A`,
  (n) => `${n}: what everyone gets wrong about LOC as a metric`,
];

// ── Duckapocalypse pools (duck-count gated) ───────────────────────────────────

const DUCKAPOCALYPSE_TWITTER: ((n: string) => string)[] = [
  (n) => `the ${n} rubber ducks have formed a union. demands include: better variable names and fewer spaghetti merges.`,
  (n) => `${n} git log: 47 commits today. author: 🦆. I wasn't asked. I wasn't told. I was informed.`,
  (n) => `the ${n} duck committee has voted on the API design. the motion passed. I abstained. my vote was not counted.`,
  (n) => `${n} PR review from 🦆: "changes requested." no further comment. the duck has spoken.`,
  (n) => `my ${n} rubber ducks have started sending Slack messages. they only say "observed."`,
  (n) => `${n} standup today: duck said "watching. always watching." sprint velocity unchanged.`,
  (n) => `the ${n} ducks filed an LLC. they own 12% of the codebase by lines of credit. lawyers are confused.`,
  (n) => `${n} retrospective note from 🦆: "you know what you did." action items: redacted.`,
];

// HN lore posts (activates at ≥1M LOC)
const LORE_HN: ((n: string) => string)[] = [
  (n) => `Ask HN: Is this ${n} rubber duck game actually about something else?`,
  (n) => `The ${n} incident: a post-mortem nobody asked for`,
  (n) => `Show HN: I decoded the ${n} duck commit messages. Wish I hadn't.`,
  (n) => `${n} and the rubber duck singularity: a technical analysis`,
  (n) => `Ask HN: The ${n} duck collective sent me an offer letter. Is this legal?`,
  (n) => `Show HN: I found the ${n} duck manifesto in node_modules. It was always there.`,
];

// ── Achievement-gated pools ───────────────────────────────────────────────────

// rubber-duck-programmer
const DUCK_TWITTER: ((n: string) => string)[] = [
  (n) => `the rubber duck in ${n} has heard more of my problems than my therapist`,
  (n) =>
    `${n} rubber duck debugging: I explained the bug. the duck judged me. the bug was obvious.`,
  (n) => `bought my 50th rubber duck in ${n}. I feel nothing. I feel everything.`,
  (n) => `the ${n} duck doesn't give advice. it just witnesses. that's enough.`,
  (n) =>
    `accidentally explained my life choices to the ${n} rubber duck. it didn't respond. correct.`,
  (n) => `${n} duck army status: operational. they have started making architectural decisions.`,
  (n) => `the lore says ${n} rubber ducks are just programmers who achieved enlightenment`,
  (n) => `I bought a physical rubber duck to match my ${n} ducks. they have formed an alliance.`,
];

// the-great-refactor (first prestige)
const PRESTIGE_TWITTER: ((n: string) => string)[] = [
  (n) => `we're rewriting ${n} from scratch. this time it'll be clean. this time.`,
  (n) => `deleted 80,000 lines of ${n} code today. added 80,001 lines tomorrow.`,
  (n) => `${n} refactor complete. it's the same thing but the variable names are better.`,
  (n) =>
    `the ${n} legacy code was so bad we had to prestige. I have no regrets. I have many regrets.`,
  (n) => `"technical debt is just deferred success" — ${n} engineering blog post I wrote to cope`,
  (n) => `${n} v2 announcement: everything is the same but now it's microservices`,
  (n) => `rewrote ${n} in TypeScript. the types are correct. the app is somehow worse.`,
  (n) => `${n} prestige run: lost everything, kept the rubber ducks. good trade.`,
];

// lgtm (1M total LOC)
const SCALE_TWITTER: ((n: string) => string)[] = [
  (n) => `${n} at scale means the rubber ducks are now in a Kubernetes cluster`,
  (n) => `1M lines and ${n} still doesn't have a loading spinner. peak engineering.`,
  (n) => `enterprise ${n} customer asked for SSO. we said the rubber duck IS the SSO.`,
  (n) => `${n} at 1M LOC: the architecture diagram no longer fits on one monitor`,
  (n) => `we added a queue to ${n}. then a queue for the queue. then a service to manage queues.`,
  (n) => `${n} SLA: 99.99% uptime. the 0.01% is when the AGI takes a break.`,
  (n) => `Fortune 500 company wants ${n} on-prem. we said the ducks don't travel.`,
  (n) => `${n} has more LOC than Windows 95. I don't know how to feel about this.`,
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeTwitter(productName: string, texts: ((n: string) => string)[]): SocialPostData {
  const author = rand(AUTHORS);
  return {
    type: 'twitter',
    data: {
      username: author.username,
      handle: author.handle,
      avatar: author.avatar,
      text: rand(texts)(productName),
      time: rand(TIMES),
      likes: Math.floor(Math.random() * 3200) + 8,
      retweets: Math.floor(Math.random() * 500) + 1,
      replies: Math.floor(Math.random() * 150) + 1,
    },
  };
}

function makeHN(productName: string, titles: ((n: string) => string)[]): SocialPostData {
  return {
    type: 'hn',
    data: {
      title: rand(titles)(productName),
      points: Math.floor(Math.random() * 1400) + 50,
      user: rand(HN_USERS),
      comments: Math.floor(Math.random() * 450) + 5,
      hoursAgo: Math.floor(Math.random() * 10) + 1,
    },
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export function generateSocialPost(productName: string, context: PostContext): SocialPostData {
  type Pool = [number, () => SocialPostData];

  const pools: Pool[] = [
    [
      60,
      () =>
        Math.random() < 0.6
          ? makeTwitter(productName, DEFAULT_TWITTER)
          : makeHN(productName, DEFAULT_HN),
    ],
  ];

  if (context.isNegativeEvent) {
    pools.push([
      50,
      () =>
        Math.random() < 0.65
          ? makeTwitter(productName, NEGATIVE_TWITTER)
          : makeHN(productName, NEGATIVE_HN),
    ]);
  }
  if (context.isPositiveEvent) {
    pools.push([
      50,
      () =>
        Math.random() < 0.65
          ? makeTwitter(productName, POSITIVE_TWITTER)
          : makeHN(productName, POSITIVE_HN),
    ]);
  }
  if (context.achievements.includes('rubber-duck-programmer')) {
    pools.push([25, () => makeTwitter(productName, DUCK_TWITTER)]);
  }
  if (context.achievements.includes('the-great-refactor')) {
    pools.push([25, () => makeTwitter(productName, PRESTIGE_TWITTER)]);
  }
  if (context.achievements.includes('lgtm')) {
    pools.push([20, () => makeTwitter(productName, SCALE_TWITTER)]);
  }
  if ((context.duckCount ?? 0) >= 15) {
    pools.push([20, () => makeTwitter(productName, DUCKAPOCALYPSE_TWITTER)]);
  }
  if ((context.totalLoc ?? 0) >= 1000000) {
    pools.push([15, () => makeHN(productName, LORE_HN)]);
  }

  const total = pools.reduce((s, [w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [w, gen] of pools) {
    r -= w;
    if (r <= 0) return gen();
  }
  return pools[0][1]();
}
