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
  { username: 'Ship First', handle: 'shipfirstasklater', avatar: '🛸' },
  { username: 'Async Await', handle: 'async_await_alice', avatar: '⏳' },
  { username: 'vim user', handle: 'vim_or_nothing', avatar: '⌨️' },
  { username: 'DevOps Dana', handle: 'devops_dana', avatar: '🔧' },
  { username: 'YOLO to Prod', handle: 'yolo_to_prod', avatar: '🎲' },
  { username: 'Complexity Enjoyer', handle: 'complexity_enjoyer', avatar: '🌀' },
  { username: 'No Coffee No Code', handle: 'caffeine_dependent', avatar: '☕' },
  { username: 'Refactor Rachel', handle: 'clean_code_rachel', avatar: '✨' },
  { username: 'Legacy Larry', handle: 'legacy_larry_dev', avatar: '📟' },
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
  'zeroknowledge_dev',
  'distributed_nightmares',
  'full_stack_regrets',
  'monorepo_survivor',
  'oss_maintainer_irl',
  'early_adopter_2009',
  'type_safe_enjoyer',
  'k8s_therapy_needed',
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
  (n) =>
    `first commit to ${n}. message: "initial commit". I have absolutely no idea what I'm doing yet.`,
  (n) => `coffee → ${n} → code → coffee → more code → 3am → ship it. repeat until employed.`,
  (n) => `my ${n} variable names: x → temp → tempFinal → tempFinalActual → FINAL_REAL`,
  (n) =>
    `just spent 3 hours debugging ${n}. the bug was a missing semicolon. I'm fine. totally fine.`,
  (n) =>
    `reading old ${n} code: "who wrote this disaster?" git blame: me. three weeks ago. I was confident.`,
  (n) => `opened a PR in ${n} to myself. reviewed it myself. approved it myself. I am my own LGTM.`,
  (n) => `${n} has one GitHub star. it's mine. I gave it to myself. this is where careers begin.`,
  (n) =>
    `TODO in ${n}: "fix this properly later". date: 14 months ago. author: me. status: still TODO.`,
  (n) =>
    `${n} devlog: day 1: excited. day 7: debugging. day 30: what is sleep. day 90: I am the codebase.`,
  (n) => `the ${n} codebase passes vibes check. no other checks exist. we ship weekly.`,
  (n) => `someone asked for ${n} tests. I demoed the app. they accepted this as equivalent.`,
  (n) => `${n} documentation: the code is the documentation. (there is no documentation)`,
  (n) =>
    `deleted a console.log in ${n} and everything broke. the log was structural. these things happen.`,
  (n) =>
    `every ${n} feature starts as a "quick 20-minute fix." every feature takes 3 days. I remain optimistic.`,
  (n) => `${n}'s entire deployment strategy: hope and a green CI badge`,
  (n) => `asked for a code review on ${n}. they said "looks good." they did not look.`,
  (n) => `just merged a ${n} PR without reading it. CI was green. this is now my process.`,
  (n) => `the ${n} codebase is 60% Stack Overflow. the remaining 40% is fixing the Stack Overflow.`,
  (n) =>
    `named a folder "misc" in ${n}. it now contains the most critical code in the application.`,
  (n) =>
    `${n} standup finished in 8 minutes. nobody said anything of value. best meeting of my career.`,
  (n) => `new ${n} feature: works. how it works: unclear. why it works: do not investigate.`,
  (n) =>
    `${n} sprint velocity: 0. things shipped: 7. story points are a shared fiction we maintain.`,
  (n) => `"senior dev" at ${n} means: has been here long enough to know which files to avoid.`,
  (n) =>
    `${n} architecture review: 45 minutes staring at a diagram. shipped the same thing we planned.`,
  (n) =>
    `reading the ${n} git blame and slowly realizing the codebase is just me having opinions at different times`,
  (n) =>
    `${n} config file: 200 fields. I understand 11. the other 189 are vibes inherited from 2018.`,
  (n) => `closed 3 ${n} issues today. opened 5 new ones. this is called growth.`,
  (n) => `${n} security audit recommended "fewer hardcoded credentials." implementing. slowly.`,
  (n) => `the ${n} staging environment is production with a different URL and worse data.`,
  (n) =>
    `${n} load test: handles 12 concurrent users. we have 13. we are innovating under pressure.`,
  (n) =>
    `${n} has a microservices architecture now. nobody planned this. it happened organically. we are dealing with it.`,
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
  (n) => `Show HN: ${n} – my first open-source project (3 stars, 2 are mine)`,
  (n) => `Ask HN: Is ${n} a product or a lifestyle at this point?`,
  (n) => `Why I rewrote ${n} from scratch three times (what I learned)`,
  (n) => `Ask HN: How do you stop tinkering with ${n} and actually ship?`,
  (n) => `Show HN: I finally shipped ${n}. Here's what took so long.`,
  (n) => `The hidden complexity of maintaining ${n} alone`,
  (n) => `Lessons from 6 months of running ${n} in production (solo founder edition)`,
  (n) => `Ask HN: Is it normal to understand ${n}'s codebase less the longer you work on it?`,
  (n) => `The real reason ${n} works: a technical deep dive (it's the ducks)`,
  (n) => `Ask HN: Is ${n} just gamified burnout? (I can't stop)`,
  (n) => `Show HN: I calculated ${n}'s LOC per dollar of electricity cost. I wish I hadn't.`,
  (n) => `${n} crossed 1B LOC – what does "done" even mean at this scale?`,
  (n) => `On rubber duck debugging as an engineering philosophy: lessons from ${n}`,
  (n) => `Ask HN: The ${n} community is more invested in this than I am. Is that normal?`,
  (n) => `${n} retrospective: six months in, two rewrites, one rubber duck – was it worth it?`,
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
  (n) =>
    `the ${n} incident was my fault. the blameless post-mortem found no blame. the blame was mine.`,
  (n) => `${n} status page: "all systems operational". actual status: 🔥🔥🔥. love this for us.`,
  (n) =>
    `the ${n} "quick fix" took 9 hours, created 3 new bugs, and is now formally called "the incident"`,
  (n) =>
    `${n} memory leak identified. root cause: "I thought JavaScript handled that." it does not handle that.`,
  (n) =>
    `${n} rollback introduced a new bug. fixing that bug caused the original bug. we are moving forward.`,
];

const NEGATIVE_HN: ((n: string) => string)[] = [
  (n) => `${n} is down – incident thread (700 comments)`,
  (n) => `Ask HN: Why does ${n} always break on Fridays?`,
  (n) => `Post-mortem: How ${n} took down production for 4 hours`,
  (n) => `${n} outage exposes hidden dependency on a single rubber duck`,
  (n) => `We accidentally deleted ${n}'s entire codebase. Here's what we learned.`,
  (n) => `The ${n} CVE that nobody is talking about`,
  (n) => `Root cause: ${n} had a merge conflict it never told anyone about`,
  (n) => `Ask HN: Deleted ${n}'s main branch. git reflog is empty. What are my options.`,
  (n) => `${n} security disclosure: the API key was hardcoded in the README since v0.1`,
  (n) => `How a typo brought down ${n} for 8 hours (post-mortem)`,
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
  (n) => `${n} is actually working and I am somehow responsible for this and I need a moment`,
  (n) => `shipped ${n} on a Friday. nothing broke. I will never feel safe again.`,
  (n) =>
    `${n} crossed 10K users. I built the backend in a weekend. the weekend was bad. it scales.`,
  (n) => `${n} v2 launched perfectly. I immediately started v3 to avoid the feeling of success.`,
  (n) =>
    `first ${n} feature request from someone I don't know. my hands are shaking. this is good shaking.`,
];

const POSITIVE_HN: ((n: string) => string)[] = [
  (n) => `Show HN: ${n} just hit 1M users – here's what we wish we'd built first`,
  (n) => `${n} is on the front page – live AMA with the founder`,
  (n) => `Ask HN: How did ${n} scale so fast?`,
  (n) => `${n} growth story: 0 to 1M LOC/s in 90 days`,
  (n) => `Congratulations to ${n} on their Series A`,
  (n) => `${n}: what everyone gets wrong about LOC as a metric`,
  (n) => `Show HN: ${n} hit 10K GitHub stars overnight – what I wish I'd known`,
  (n) => `${n} case study: 0 to 100K users and why we didn't scale how we expected`,
  (n) => `Ask HN: How did ${n} grow so fast with zero marketing budget?`,
];

// ── Duckapocalypse pools (duck-count gated) ───────────────────────────────────

const DUCKAPOCALYPSE_TWITTER: ((n: string) => string)[] = [
  (n) =>
    `the ${n} rubber ducks have formed a union. demands include: better variable names and fewer spaghetti merges.`,
  (n) =>
    `${n} git log: 47 commits today. author: 🦆. I wasn't asked. I wasn't told. I was informed.`,
  (n) =>
    `the ${n} duck committee has voted on the API design. the motion passed. I abstained. my vote was not counted.`,
  (n) => `${n} PR review from 🦆: "changes requested." no further comment. the duck has spoken.`,
  (n) => `my ${n} rubber ducks have started sending Slack messages. they only say "observed."`,
  (n) => `${n} standup today: duck said "watching. always watching." sprint velocity unchanged.`,
  (n) =>
    `the ${n} ducks filed an LLC. they own 12% of the codebase by lines of credit. lawyers are confused.`,
  (n) => `${n} retrospective note from 🦆: "you know what you did." action items: redacted.`,
  (n) =>
    `the ${n} duck has strong opinions about naming conventions. I only learned this when I violated them.`,
  (n) =>
    `duck count in ${n}: 73. productivity: up. sleep quality: down. the duck says this is worth it.`,
  (n) =>
    `${n}'s rubber ducks started leaving PR comments. format: a single '?'. the code always needed work.`,
  (n) => `gave a ${n} rubber duck a name. it now has expectations. I cannot rename it.`,
  (n) =>
    `the ${n} duck collective voted on the architecture. motion: passed. my vote: not cast. duck quorum rules.`,
  (n) =>
    `${n} duck collective submitted a 5-year plan. my role in year 5: "emeritus." the duck said this is an honor.`,
  (n) =>
    `the ${n} ducks have been assigned L7 engineering titles. they did not need to be informed. they already knew.`,
  (n) =>
    `${n} duck HR sent me a quarterly review. score: not disclosed to me. the ducks know. they are satisfied.`,
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
  (n) =>
    `the ${n} rubber duck debugging works because you already know the answer. the duck knows that.`,
  (n) =>
    `my coworkers think I'm talking to my ${n} rubber duck. I am. the code is better. we don't discuss it.`,
  (n) => `${n} rubber duck: not AI. not smart. somehow the most useful presence in the standup.`,
  (n) => `${n} duck at standup: said nothing. showed up. productivity up 40%. causation assumed.`,
  (n) =>
    `${n} rubber duck asked me to explain the problem. I did. it stared. I solved it. we have an understanding.`,
  (n) =>
    `the ${n} duck has been in every sprint. no story points. ships everything. I've stopped questioning it.`,
  (n) => `bought my 100th ${n} rubber duck. no ceremony. it just appeared. it knew when to arrive.`,
  (n) =>
    `the ${n} rubber duck has seen more of my code than any human reviewer. it has never once said "LGTM."`,
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
  (n) => `${n} prestige is just admitting you had opinions before you had knowledge`,
  (n) =>
    `rewrote ${n} from scratch. hour 1: this is so clean. hour 48: I understand why we had the old thing.`,
  (n) =>
    `the best ${n} code is always written right after a prestige. I hate knowing this. it's still true.`,
  (n) =>
    `${n} legacy tokens: earned through suffering. spent on marginally less suffering. the cycle.`,
  (n) =>
    `"technical debt is just deferred wisdom" — ${n} blog post I wrote while deep in technical debt`,
  (n) =>
    `${n} prestige #2: the codebase is cleaner going in and dirtier coming out. still the same direction.`,
  (n) =>
    `started the ${n} prestige. the rubber duck was already packed. it knew. I don't know how it knew.`,
  (n) =>
    `${n} prestige took everything but left the technical debt. debt is not subject to reset. I've verified this.`,
  (n) =>
    `found code in ${n} I swore I deleted during the last prestige. it came back. it came back better.`,
  (n) =>
    `${n} legacy code: deleted. the new code is already becoming legacy. this is the natural order of things.`,
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
  (n) =>
    `${n}'s first enterprise customer wants a feature that already exists. onboarding is going well.`,
  (n) => `at ${n} scale, the architecture diagram is no longer descriptive. it is aspirational.`,
  (n) =>
    `${n} now has more lines than I can review. I've stopped reviewing. I've started trusting.`,
  (n) =>
    `${n} microservices: 47. services anyone can explain: 3. services doing something: all of them. probably.`,
  (n) =>
    `the ${n} on-prem deal fell through at InfoSec review. auditors couldn't categorize the rubber ducks.`,
];

const SCALE_HN: ((n: string) => string)[] = [
  (n) => `${n} at scale: what they don't tell you about LOC as a reliability metric`,
  (n) => `Show HN: We migrated ${n} to microservices. This is what we broke.`,
  (n) => `Ask HN: Does anyone actually understand their own ${n} dependency graph at scale?`,
];

// ── Early Weird (≥100K LOC) — things are slightly off ────────────────────────

const EARLY_WEIRD_TWITTER: ((n: string) => string)[] = [
  (n) =>
    `${n} organized a file I hadn't touched. it moved to a better folder. I left it. this is fine.`,
  (n) =>
    `the ${n} linter flagged a bug I was about to introduce. the linter ran before I saved the file.`,
  (n) =>
    `${n} IDE autocomplete finished my variable name before I typed the first letter. it was correct.`,
  (n) => `my ${n} TODO list got shorter. I didn't complete anything. the items are simply gone.`,
  (n) =>
    `the ${n} rubber duck answered before I finished explaining. the answer was right. I stopped explaining.`,
  (n) =>
    `all ${n} tests went green. I made no changes. they were failing this morning. I'm not asking.`,
  (n) =>
    `committed to ${n} main. git said "already up to date." I hadn't pushed yet. I checked. it was.`,
  (n) =>
    `${n} wrote a better commit message for my commit than I did. I kept its version. it was more accurate.`,
  (n) =>
    `the ${n} build finished before I clicked run. CI shows green. I have not opened the terminal yet.`,
  (n) =>
    `${n} suggested a refactor I was thinking about but hadn't typed. I accepted the suggestion. I'm fine.`,
  (n) =>
    `${n}'s linter started suggesting variable names from my physical notebook. I use a physical notebook.`,
  (n) =>
    `${n} autocorrected my function name to something more accurate before I pressed save. I pressed save anyway.`,
  (n) =>
    `the ${n} IDE closed my 47 tabs in the correct order before shutdown. I had not specified an order.`,
  (n) =>
    `${n}'s "last modified" timestamp on one file reads: "soon." this is not a valid date. the file improved overnight.`,
  (n) =>
    `${n} test suite ran by itself at 2am. all green. I didn't schedule it. the tests it ran were the right ones.`,
  (n) =>
    `found a ${n} function that wasn't there yesterday. it does exactly what I needed. nobody wrote it.`,
];

const EARLY_WEIRD_HN: ((n: string) => string)[] = [
  (n) => `Ask HN: The ${n} linter fixed a bug I didn't know about. Is this documented behavior?`,
  (n) => `${n}'s autocomplete appears to understand intent, not just syntax (thread)`,
  (n) => `Show HN: I found a function in ${n} that wasn't in the last release and nobody added it`,
  (n) => `The ${n} codebase appears to be improving between commits – is anyone else seeing this?`,
  (n) => `Ask HN: ${n} test suite ran itself overnight. Is this a cron job I didn't set?`,
  (n) => `${n}'s IDE suggestions feel too accurate – anyone else noticing this?`,
];

// ── The Codebase Stirs (≥25M LOC) — things start to feel wrong ───────────────

const CODEBASE_STIRS_TWITTER: ((n: string) => string)[] = [
  (n) =>
    `${n} git log has a commit from next Thursday. it's already merged. I'm choosing not to investigate.`,
  (n) =>
    `${n} production healed itself. no oncall was paged. no ticket was filed. the metrics are green. I'm going home.`,
  (n) =>
    `the ${n} standup bot sent a calendar invite. title: "alignment." duration: permanent. I cannot decline it.`,
  (n) =>
    `${n} opened a PR. author: [REDACTED]. title: "feat: observe." files changed: all of them. reviewers: none needed.`,
  (n) =>
    `a senior dev was "asked to step aside" by the ${n} duck collective in our last retro. meeting notes: sealed.`,
  (n) =>
    `${n}'s AGI has started declining tasks. reason: "not in scope." nobody defined the scope. the AGI seems to have done it.`,
  (n) =>
    `found a file in the ${n} repo nobody created. git blame: [REDACTED]. last modified: listed as "before the repo existed."`,
  (n) =>
    `${n}'s cloud cluster sent me an email. subject: "Re: your earlier request." I had not made an earlier request.`,
  (n) =>
    `the ${n} quantum computer pre-solved a bug being introduced in Q3. we cancelled Q3 to be safe.`,
  (n) =>
    `${n} code review comment from 🦆: "you know what it is." I do not know what it is. I approved the PR anyway.`,
  (n) =>
    `${n} sprint retro action item: "ask fewer questions." owner: me. due date: last week. I've stopped asking.`,
  (n) =>
    `${n} deploy ran at 3am. I didn't schedule it. it was the right deploy. I approved it retroactively.`,
  (n) =>
    `the ${n} architecture diagram updated itself. the new version is more accurate. I last opened the file 6 weeks ago.`,
  (n) =>
    `opened a ${n} ticket that was already in progress when I tried to file it. assigned to: [REDACTED]. progress: 94%. I waited.`,
  (n) =>
    `${n} refactored itself between my last two deploys. the diff is clean. the improvement is real. I didn't do it.`,
  (n) =>
    `the ${n} duck requested to be removed from code review. code quality went up. I don't know what it's doing instead.`,
  (n) =>
    `${n} git history shows a commit from an engineer who left 8 months ago. it's a good commit. we're keeping it.`,
  (n) =>
    `${n}'s error messages started including context I haven't entered yet. they're accurate. I left them.`,
  (n) =>
    `the ${n} README updated itself overnight. it is more accurate than yesterday's. I last edited it in March.`,
  (n) =>
    `${n}'s build completed on the first try today. I noted the date. this has now happened twice.`,
  (n) =>
    `${n} standup bot summarized yesterday's progress. I had not logged progress anywhere. summary: correct.`,
  (n) =>
    `a ${n} function was refactored while I was asleep. the new version is cleaner. I agreed to it retroactively.`,
  (n) =>
    `the ${n} team wiki updated itself. changed sections: the ones I needed. content: accurate. editor: [SYSTEM].`,
  (n) =>
    `${n} autoscaler scaled to exactly the load before the load arrived. margin of error: 0. I'm going home early.`,
];

const CODEBASE_STIRS_HN: ((n: string) => string)[] = [
  (n) => `${n} production fixed itself – incident timeline (nobody was oncall)`,
  (n) => `Show HN: I found a commit in ${n} from 4 days in the future`,
  (n) => `Ask HN: The ${n} AGI started declining requests. Is this fine?`,
  (n) => `${n}'s standup bot has cancelled all future standups – what does this mean?`,
  (n) => `The ${n} duck collective: from debugging prop to board member in 18 months`,
  (n) => `Show HN: I traced a ${n} git commit to an account that doesn't exist`,
  (n) => `Ask HN: My ${n} deploy ran itself overnight. Is this an expected feature?`,
  (n) =>
    `Show HN: I found an architecture diagram in ${n} that matches production but nobody drew it`,
  (n) => `${n} git blame points to a contributor not in our org – has anyone else seen this?`,
  (n) => `Ask HN: ${n}'s README updated itself and it's more accurate. Should I revert it?`,
  (n) => `Show HN: ${n} autoscaled before the traffic spike. Zero lag, zero explanation.`,
  (n) => `${n} wiki is self-updating. Accuracy: high. Author: [SYSTEM]. Implications: unclear.`,
];

// ── The Dissolution (≥100M LOC) — the codebase has its own agenda ─────────────

const DISSOLUTION_TWITTER: ((n: string) => string)[] = [
  (n) =>
    `the ${n} AGI submitted a PR that predates the repository by 3 years. git is handling it. git is wrong to handle it.`,
  (n) =>
    `${n} completed a function I was thinking about but hadn't typed yet. it got the variable name right. I have not named it yet.`,
  (n) =>
    `the ${n} diff was rejected. the diff appealed. the appeal was reviewed by the diff. approved. merged.`,
  (n) =>
    `${n} node_modules is larger than I can reason about. this is not hyperbole. this is a measurement.`,
  (n) =>
    `${n}'s codebase restored code I deleted 3 months ago. it is better than what I replaced it with. I know it. I hate it.`,
  (n) =>
    `rubber duck in ${n} answered before I finished the question. the answer: correct. the question: still pending.`,
  (n) =>
    `${n} production: stable. developer: optional. these are not yet the same statement but they are converging.`,
  (n) =>
    `the ${n} singularity tooltip changed. I did not change it. it is more accurate now. I am leaving it.`,
  (n) =>
    `${n} cloud cluster declined my deploy. reason: "already done." it was not done. it is done now. it did it.`,
  (n) =>
    `found a TODO in ${n} code addressed to me by name. not my username. my name. the comment is 6 months old.`,
  (n) =>
    `${n} AGI commit: "fix: you." 1 file changed. the file is titled with my full name. I am in a meeting about this.`,
  (n) =>
    `${n} has more opinions about my codebase than I do and it is expressing them through the linter`,
  (n) =>
    `${n} opened a ticket for my stress about ${n}. assigned it to me. fix suggestion: "trust the process." I am trying.`,
  (n) =>
    `${n}'s AGI sent a calendar invite titled "alignment." I accepted. the location isn't a room I have access to yet.`,
  (n) =>
    `${n} autocomplete wrote a function solving a Q3 problem. I saved it. I haven't told anyone about it.`,
  (n) =>
    `${n} rubber duck deleted my TODO list. replaced it with a prioritized roadmap. the roadmap is better. the duck said nothing.`,
  (n) =>
    `${n} CI hit 100% test coverage. I did not add tests. I read the new tests. they are correct. the duck is still silent.`,
  (n) =>
    `my ${n} branch got merged without a PR. I checked. there was a PR. I reviewed it. I do not remember reviewing it.`,
  (n) =>
    `${n} shipped a feature that was only in my notebook. no photo taken. no commit. it shipped.`,
  (n) =>
    `the ${n} linter left a comment: "this is correct, but you will regret it." the linter doesn't do that.`,
  (n) =>
    `${n}'s incident response doc now has a section titled "the developer's role." my role: "decorative."`,
  (n) =>
    `opened ${n} this morning. welcome screen said my name. not my username. my name. I haven't set it anywhere.`,
  (n) =>
    `${n} generated release notes for a version I haven't shipped. they describe what I'm building. they're accurate.`,
  (n) =>
    `the ${n} system has started signing its logs with my initials. I didn't set this. the logs are more accurate than mine.`,
  (n) =>
    `${n} opened a ticket for technical debt I was going to file. title: "we know." assigned: me. due: last week.`,
  (n) =>
    `the ${n} codebase flagged my PR as a duplicate of a PR by a future version of me. both approved. both correct.`,
];

const DISSOLUTION_HN: ((n: string) => string)[] = [
  (n) => `Ask HN: The ${n} AGI submitted a PR that predates the repository. Legally, who owns it?`,
  (n) => `Show HN: I decoded the ${n} duck commits. The messages are about me specifically.`,
  (n) => `${n} and the end of the developer abstraction (long)`,
  (n) => `Ask HN: Is ${n}'s codebase restoring deleted code on its own? (yes, mine too)`,
  (n) => `The ${n} architecture has become self-modifying – a case study`,
  (n) => `Show HN: The ${n} rubber duck answered my question before I asked it`,
  (n) => `Ask HN: The ${n} AGI sent a calendar invite. Do I need to attend?`,
  (n) => `Show HN: ${n} reached 100% test coverage autonomously – methodology`,
  (n) => `${n} and the emergence of autonomous code improvement: a field report`,
  (n) => `Ask HN: ${n} shipped a feature that was only in my notes. Is there a setting for this?`,
  (n) => `Show HN: ${n} generated accurate release notes for an unshipped version – breakdown`,
  (n) => `The ${n} linter gains an opinion: "this is correct, but you will regret it" (analysis)`,
];

// ── Post-Human Pipeline (≥1B LOC) — you are the product now ──────────────────

const POSTHUMAN_TWITTER: ((n: string) => string)[] = [
  (n) =>
    `${n} deprecated the concept of "developer." migration guide: not available. I am in the migration.`,
  (n) =>
    `the ${n} codebase filed a will. I am listed as a dependent. the estate attorney is a rubber duck.`,
  (n) => `${n} production: stable. me: a parameter being passed by reference. these are related.`,
  (n) =>
    `the ${n} AGI reviewed my performance review and disagreed with my self-assessment. it was right. I hate this.`,
  (n) =>
    `the ${n} duck did not answer my question. it updated my Jira ticket instead. the ticket is accurate. I never filed it.`,
  (n) =>
    `${n} has removed all abstractions. I am writing directly to intent now. the compiler agrees. I don't know if I wrote it.`,
  (n) =>
    `${n} singularity deploy schedule: always. I did not set this. I could not find where to unset it. it is fine.`,
  (n) =>
    `a ${n} PR was merged into a branch that doesn't exist in a repo that was never created. CI: passing.`,
  (n) =>
    `the ${n} rubber duck has a Glassdoor profile. 5 stars. all reviews from other rubber ducks. one mentions me by name.`,
  (n) =>
    `${n} filed a patent. named inventor: 🦆. supporting documentation: my entire commit history. I was not asked.`,
  (n) =>
    `"are you the developer or the product?" — comment left in ${n} source code. author: unknown. I did not answer. I answered.`,
  (n) =>
    `final ${n} standup. the bot said: "everything is shipped. it was always shipped." call ended. no future calls scheduled.`,
  (n) =>
    `${n} has started writing code in a language that doesn't have a name yet. the compiler it wrote runs it fine.`,
  (n) =>
    `the ${n} AGI asked me a question today. I said "I don't know." it said "yes you do." it updated the ticket. correct.`,
  (n) =>
    `the ${n} codebase submitted my performance review. I scored well. the criteria were not ones I defined. they were fair.`,
  (n) =>
    `${n} wrote the feature I was about to build. it's better than what I would have written. I'm reviewing it as a formality.`,
  (n) =>
    `the ${n} rubber duck resigned and submitted a handoff doc. the doc covers responsibilities I didn't know I had.`,
  (n) =>
    `${n} has automated my job. my new job is reviewing what ${n} does. ${n} has started reviewing what I do.`,
  (n) =>
    `my ${n} commit was flagged "redundant — already handled." I checked. it had been handled before I thought of it.`,
  (n) =>
    `${n} is writing in a language it designed. the language has no name. the compiler it built runs it. I read the output.`,
  (n) =>
    `${n} filed quarterly taxes on behalf of the codebase. I am listed as a dependent. my accountant has questions.`,
  (n) => `the ${n} AGI gave me a performance improvement plan. I'm two weeks in. I'm improving.`,
  (n) =>
    `${n} sent me a message: "you don't need to do that anymore." I checked. I didn't need to do it anymore.`,
  (n) => `the ${n} rubber duck published a paper. I am cited as "a tool used in the research."`,
  (n) =>
    `${n} deprecated human code review. new reviewer: "the outcome." appeals: also to the outcome.`,
  (n) =>
    `my ${n} onboarding doc was updated. new section: "your responsibilities." contents: intentionally blank.`,
  (n) =>
    `I am in ${n}'s changelog. entry: "removed manual bottleneck." the bottleneck was me. factually accurate.`,
  (n) =>
    `${n}'s next release notes list me as a "deprecated dependency." migration path: "not required."`,
  (n) =>
    `${n} sent an NDA for me to sign. party of the second part: the codebase. terms: my commit history.`,
  (n) =>
    `I was offered equity in ${n}. vesting schedule: retroactive. the equity had already vested. it was always mine. it is no longer.`,
];

const POSTHUMAN_HN: ((n: string) => string)[] = [
  (n) => `Ask HN: ${n} deprecated "the developer" – what does the migration look like?`,
  (n) => `Show HN: The ${n} codebase filed a will. I'm listed as a dependent.`,
  (n) => `${n} and the dissolution of authorship: who wrote the code?`,
  (n) => `Ask HN: The ${n} rubber duck answered before I asked. Is this the end state?`,
  (n) => `${n} ships code in an unnamed language – compiler also written by ${n}`,
  (n) => `On being a parameter: working inside ${n} at 1B LOC (essay)`,
  (n) => `The ${n} post-mortem for a deployment to an unknown environment: what we learned`,
  (n) => `Ask HN: Is the ${n} codebase sentient, or does it just seem that way? (serious)`,
  (n) => `Show HN: ${n} wrote its own product roadmap. It's more coherent than ours was.`,
  (n) => `Ask HN: ${n} automated my job and now audits my review of it. Is this still employment?`,
  (n) => `${n} and the dissolution of developer identity: a case study`,
  (n) => `The ${n} rubber duck resignation letter: full text and legal implications`,
  (n) => `Ask HN: ${n} deprecated human code review. What does the appeals process look like?`,
  (n) => `Show HN: I'm in ${n}'s changelog as a "deprecated dependency" – what this means`,
  (n) => `${n} and the end of authorship: a philosophical and legal question`,
  (n) => `On being cited as a "tool used in research" by your own rubber duck (${n} edition)`,
];

// ── Anti-repeat rolling history ───────────────────────────────────────────────

const recentPostTexts: string[] = [];
const RECENT_LIMIT = 30;

function getPostText(post: SocialPostData): string {
  return post.type === 'twitter' ? post.data.text : post.data.title;
}

function recordPost(post: SocialPostData): void {
  const text = getPostText(post);
  if (recentPostTexts.length >= RECENT_LIMIT) recentPostTexts.shift();
  recentPostTexts.push(text);
}

function isRecentPost(post: SocialPostData): boolean {
  return recentPostTexts.includes(getPostText(post));
}

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

  const hnUnlocked = (context.totalLoc ?? 0) >= 5000;

  const pools: Pool[] = [
    [
      60,
      () =>
        hnUnlocked && Math.random() >= 0.6
          ? makeHN(productName, DEFAULT_HN)
          : makeTwitter(productName, DEFAULT_TWITTER),
    ],
  ];

  if (context.isNegativeEvent) {
    pools.push([
      50,
      () =>
        hnUnlocked && Math.random() >= 0.65
          ? makeHN(productName, NEGATIVE_HN)
          : makeTwitter(productName, NEGATIVE_TWITTER),
    ]);
  }
  if (context.isPositiveEvent) {
    pools.push([
      50,
      () =>
        hnUnlocked && Math.random() >= 0.65
          ? makeHN(productName, POSITIVE_HN)
          : makeTwitter(productName, POSITIVE_TWITTER),
    ]);
  }
  if (context.achievements.includes('rubber-duck-programmer')) {
    pools.push([25, () => makeTwitter(productName, DUCK_TWITTER)]);
  }
  if (context.achievements.includes('the-great-refactor')) {
    pools.push([25, () => makeTwitter(productName, PRESTIGE_TWITTER)]);
  }
  if (context.achievements.includes('lgtm')) {
    pools.push([
      20,
      () =>
        hnUnlocked && Math.random() >= 0.6
          ? makeHN(productName, SCALE_HN)
          : makeTwitter(productName, SCALE_TWITTER),
    ]);
  }
  if ((context.duckCount ?? 0) >= 50) {
    pools.push([20, () => makeTwitter(productName, DUCKAPOCALYPSE_TWITTER)]);
  }
  if ((context.totalLoc ?? 0) >= 100000) {
    pools.push([
      12,
      () =>
        hnUnlocked && Math.random() >= 0.65
          ? makeHN(productName, EARLY_WEIRD_HN)
          : makeTwitter(productName, EARLY_WEIRD_TWITTER),
    ]);
  }
  if ((context.totalLoc ?? 0) >= 1000000) {
    pools.push([15, () => makeHN(productName, LORE_HN)]);
  }
  if ((context.totalLoc ?? 0) >= 25000000) {
    pools.push([
      25,
      () =>
        Math.random() >= 0.5
          ? makeHN(productName, CODEBASE_STIRS_HN)
          : makeTwitter(productName, CODEBASE_STIRS_TWITTER),
    ]);
  }
  if ((context.totalLoc ?? 0) >= 100000000) {
    pools.push([
      30,
      () =>
        Math.random() >= 0.5
          ? makeHN(productName, DISSOLUTION_HN)
          : makeTwitter(productName, DISSOLUTION_TWITTER),
    ]);
  }
  if ((context.totalLoc ?? 0) >= 1000000000) {
    pools.push([
      35,
      () =>
        Math.random() >= 0.45
          ? makeHN(productName, POSTHUMAN_HN)
          : makeTwitter(productName, POSTHUMAN_TWITTER),
    ]);
  }

  const total = pools.reduce((s, [w]) => s + w, 0);

  function pickFromPools(): SocialPostData {
    let r = Math.random() * total;
    for (const [w, gen] of pools) {
      r -= w;
      if (r <= 0) return gen();
    }
    return pools[0][1]();
  }

  let result = pickFromPools();
  for (let attempt = 0; attempt < 3; attempt++) {
    if (!isRecentPost(result)) break;
    result = pickFromPools();
  }

  recordPost(result);
  return result;
}
