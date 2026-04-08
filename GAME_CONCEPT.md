# push to prod — Game Design Document

---

## Core Metric

**Lines of Code (LOC)** — the primary currency of the game.

Displayed with abbreviated suffixes. Hovering over a suffix in the main display shows its full English name in a tooltip.

| Suffix | Value | Full Name |
|--------|-------|-----------|
| K | 1,000 | thousand |
| M | 1,000,000 | million |
| B | 1,000,000,000 | billion |
| T | 1,000,000,000,000 | trillion |
| Qa | 1e15 | quadrillion |
| Qi | 1e18 | quintillion |
| Sx | 1e21 | sextillion |
| Sp | 1e24 | septillion |
| Oc | 1e27 | octillion |
| No | 1e30 | nonillion |
| Dc | 1e33 | decillion |
| Ud | 1e36 | undecillion |
| Dd | 1e39 | duodecillion |
| Td | 1e42 | tredecillion |
| Qad | 1e45 | quattuordecillion |
| Qid | 1e48 | quindecillion |
| Sxd | 1e51 | sexdecillion |
| Spd | 1e54 | septendecillion |

Secondary metrics shown in the sidebar:
- **LOC/s** — passive production rate (smoothed EMA over recent ticks)
- **Total LOC ever** — all-time accumulation, used for unlock conditions and achievements
- **Commits** — milestone markers; each commit requires a threshold of LOC that grows by 10× per era

---

## The Clicker

A large **ENTER key** rendered in pure CSS (box-shadow, border, gradient for a keycap look).

- Click animation: `translateY(3px)` + box-shadow shrink for a satisfying keypress feel
- Each click = base 1 LOC × all click upgrade multipliers × click event multipliers
- Holding Space/Enter also counts

---

## Producers

All producers generate LOC/s passively. Default cost scaling is **1.15× per unit** unless noted.

| # | Name | Icon | Base LOC/s | Base Cost | Unlock (total LOC) |
|---|------|------|-----------|-----------|-------------------|
| 1 | Rubber Duck | 🦆 | 0.1 | 10 | always |
| 2 | Mechanical Keyboard | ⌨️ | 1 | 100 | always |
| 3 | Coffee Machine | ☕ | 3 | 300 | always |
| 4 | Autocomplete | ✨ | 8 | 800 | always |
| 5 | Stack Overflow Tab | 📋 | 25 | 3,000 | always |
| 6 | Junior Dev | 👶 | 100 | 12,000 | always |
| 7 | LinkedIn Influencer Dev | 📱 | 200 | 30,000 | always |
| 8 | Senior Dev | 🧙 | 400 | 75,000 | always |
| 9 | Offshore Team | 🌏 | 600 | 120,000 | always |
| 10 | Tech Lead | 📊 | 900 | 200,000 | always |
| 11 | Scrum Master | 🏃 | 1,200 | 350,000 | always |
| 12 | 10x Engineer | ⚡ | 2,500 | 500,000 | always |
| 13 | The PM | 🗺️ | 5,000 | 1,500,000 | always |
| 14 | GitHub Copilot | 🤖 | 12,000 | 2,000,000 | always |
| 15 | AI Agent | 🦾 | 60,000 | 12,000,000 | always |
| 16 | Cloud Cluster | ☁️ | 200,000 | 60,000,000 | 2M |
| 17 | AGI | 🧠 | 400,000 | 150,000,000 | 10M |
| 18 | Quantum Computer | ⚛️ | 2,000,000 | 2,000,000,000 | 50M |
| 19 | The Singularity | ∞ | 15,000,000 | 50,000,000,000 | 500M |
| 20 | Blockchain | ⛓️ | 30,000,000 | 500,000,000,000 | 2B |
| 21 | The Consultant | 💼 | 120,000,000 | 5,000,000,000,000 | 10B |
| 22 | Digital Twin of Yourself | 👤 | 500,000,000 | 50,000,000,000,000 | 100B |
| 23 | Tech Oracle | 🔮 | 2,500,000,000 | 500,000,000,000,000 | 1T |
| 24 | Infinite Monkey Farm | 🐒 | 20,000,000,000 | 5,000,000,000,000,000 | 1Qa |

**Rubber Duck cost scaling**: 1.09× (cheaper than default to encourage hoarding)

---

## Duckapocalypse

The rubber duck count has its own narrative arc that changes the news ticker color and unlocks special events.

| Stage | Duck Count | Tone |
|-------|-----------|------|
| 0 | 0–14 | Normal |
| 1 | 15–49 | Ducks awakened (red ticker) |
| 2 | 50–99 | Ducks displeased (red ticker) |
| 3 | 100–499 | Ducks angered (yellow ticker) |
| 4 | 500–999 | Ducks ascendant (yellow ticker) |
| 5 | 1,000+ | Ducks transcendent (yellow ticker) |

Ducks also march across the news footer as a visual parade — count scales as `min(ceil(√duckCount), 20)`.

---

## Upgrades

### Click Upgrades

| Name | Multiplier | Unlock |
|------|-----------|--------|
| Standing Desk | ×2 | 10 total LOC |
| 2 Monitors | ×3 | 500 total LOC |
| Ergonomic Chair | ×4 | 5,000 total LOC |
| Energy Drink | ×10 | 75,000 total LOC |
| The Zone | ×25 | 1,000,000 total LOC |
| Hyperfocus | ×50 | 20,000,000 total LOC |
| Neural Interface | ×200 | 1 Qa total LOC |
| Thought Compiler | ×500 | 1 Qi total LOC |

All click multipliers stack multiplicatively.

### Producer Upgrades

Each producer has 2–3 dedicated upgrade tiers, unlocked by owning N of that producer. Multipliers stack multiplicatively with each other and with global upgrades.

| Producer | Upgrade 1 | Upgrade 2 | Upgrade 3 |
|----------|-----------|-----------|-----------|
| Rubber Duck | Dark Mode ×2 (own 1) | Rubber Duck PhD ×3 (own 15) | Rubber Duck Fleet ×4 (own 75) |
| | Rubber Duck Army ×5 (own 100) | Rubber Duck Corporation ×6 (own 200) | Rubber Duck Civilization ×8 (own 350) |
| Mechanical Keyboard | Cherry MX Browns ×2 (own 1) | O-Ring Switches ×3 (own 15) | Custom PCB ×4 (own 50) |
| Coffee Machine | Double Shot ×2 (own 1) | Cold Brew Protocol ×3 (own 10) | IV Drip ×4 (own 50) |
| Autocomplete | GitHub Copilot Free Tier ×3 (own 5) | Tab to Accept ×4 (own 20) | — |
| Stack Overflow Tab | Stack Overflow Teams ×2 (own 1) | Upvote Everything ×3 (own 15) | — |
| Junior Dev | LGTM Bot ×2 (own 1) | Unlimited PTO ×3 (own 15) | — |
| LinkedIn Influencer | Viral Thread ×2 (own 1) | LinkedIn Premium ×3 (own 10) | — |
| Senior Dev | git blame --reverse ×2 (own 1) | Architecture Diagram ×3 (own 10) | — |
| Offshore Team | Slack at 2am ×2 (own 1) | Unlimited Headcount ×3 (own 10) | — |
| Tech Lead | Agile Methodology ×2 (own 1) | Story Points ×3 (own 8) | — |
| Scrum Master | Agile Transformation ×2 (own 1) | Kanban Board ×3 (own 8) | — |
| 10x Engineer | The Algorithm ×3 (own 1) | #NoEstimates ×5 (own 15) | — |
| The PM | Roadmap Alignment ×2 (own 1) | OKR Framework ×3 (own 5) | — |
| GitHub Copilot | GPT-5 ×2 (own 1) | 1M Token Context ×3 (own 8) | — |
| AI Agent | Multi-agent Orchestration ×3 (own 1) | Vibe Coding ×5 (own 8) | — |
| Cloud Cluster | Auto-scaling ×2 (own 1) | Kubernetes ×3 (own 5) | — |
| AGI | Recursive Self-Improvement ×5 (own 1) | AGI Alignment (solved) ×8 (own 5) | — |
| Quantum Computer | Quantum Entanglement ×2 (own 1) | Qubit Array ×4 (own 5) | — |
| The Singularity | Omega Point ×5 (own 1) | Technological Apotheosis ×8 (own 5) | — |
| Blockchain | Web3 Integration ×2 (own 1) | DeFi Protocol ×4 (own 5) | Proof of Deployment ×6 (own 10) |
| The Consultant | Synergy Framework ×3 (own 1) | Transformation Roadmap ×5 (own 3) | Digital Transformation Initiative ×4 (own 8) |
| Digital Twin | Mirror Protocol ×3 (own 1) | Recursive Identity ×6 (own 5) | Hivemind Convergence ×5 (own 10) |
| Tech Oracle | Crystal Ball Cache ×3 (own 1) | Prophecy Pipeline ×5 (own 5) | Omniscient Linter ×8 (own 10) |
| Infinite Monkey Farm | Infinite Keyboard Budget ×5 (own 1) | Monkey Hive Mind ×8 (own 5) | Shakespeare-Driven Development ×10 (own 10) |

### Global Multiplier Upgrades

Applied multiplicatively to total LOC/s after all per-producer multipliers.

| Name | Effect | Unlock (total LOC) |
|------|--------|-------------------|
| npm install everything | All ×1.1 | 1,000 |
| Deploy on Fridays | All ×1.5 | 25,000 |
| Microservices Architecture | All ×2 | 500,000 |
| Rewrite in Rust | All ×3 | 5,000,000 |
| Test-Driven Development | All ×1.5 | 50,000,000 |
| The Mythical Man-Month (ignored) | All ×3 | 5,000,000,000 |
| Move Fast and Break Things | All ×2 | 10,000,000,000 |
| CI/CD Pipeline | All ×2 | 50,000,000,000 |
| We Don't Need Tests | All ×2 | 200,000,000,000 |
| Estimated 2-3 Days | All ×3 | 2,000,000,000,000 |
| Zero-Day Exploit | All ×5 | 10,000,000,000,000 |
| It's Not a Phase, It's an Architecture | All ×5 | 200,000,000,000,000 |
| Mandatory Jira Integration | All ×2 | 2 Qa |
| Open Source Everything | All ×2 | 20 Qa |
| Developer Productivity Suite | All ×3 | 500 Qa |
| Legacy Code Purge | All ×5 | 1 Qi |
| The Post-Agile Era | All ×3 | 1 Sx |
| Heat Death Sprint | All ×5 | 1 Sp |
| Universal Runtime Environment | All ×3 | 1 Oc |
| Codebase Omniscience | All ×10 | 1 No |

---

## Production Formula

```
LOC/s = (Σ producer_base_LOCps × count × producer_upgrade_multipliers)
        × global_upgrade_multipliers
        × legacy_multiplier
        × tech_stack_multiplier
        × event_multiplier
        × debt_penalty
```

- **Legacy multiplier**: starts at 1, boosted by purchased legacy upgrades
- **Tech stack multiplier**: depends on chosen stack after Pivot (Rust = 2× production)
- **Debt penalty**: only active after all legacy upgrades are bought; degrades from 1.0× to 0.15× as technical debt climbs to 100

---

## Random Events

Events trigger randomly with a minimum 30s interval. Shown as a dismissable banner at the top of the center panel. Events are gated by `minLoc` thresholds as the game progresses through four narrative phases.

### Phase 1 — Normal (0+ LOC)

| Event | Type | Effect | Duration |
|-------|------|--------|----------|
| 🔥 Production is down! | Negative | LOC/s ×0.5 | 20s |
| ⭐ GitHub stars going viral | Positive | LOC/s ×3 | 10s |
| 🐛 Bug in production | Negative | Click disabled | 10s |
| ☕ Coffee machine broken | Negative | LOC/s ×0.8 | 30s |
| 📣 CEO wants a live demo | Positive | Click ×10 | 20s |
| 🤝 Merge conflict detected | Negative | LOC/s ×0.5 | 15s |
| 📦 npm package deprecated | Negative | LOC/s ×0.7 | 20s |
| 🚨 CVE discovered | Negative | All halted | 10s |
| 🗞️ HackerNews front page | Positive | LOC/s ×3 | 30s |
| 📝 Code review requested | Negative | LOC/s ×0.3 | 30s |
| 😱 Intern pushed to main | Negative | LOC/s ×0.4 | 20s |
| 🕐 Standup ran 45 minutes | Negative | All halted | 15s |
| 🦀 Rewrite in Rust debate | Negative | LOC/s ×0.6 | 25s |
| 👨‍💼 CEO "learned to code" | Negative | LOC/s ×0.3 | 20s |
| ⛓️ PM wants blockchain | Positive | Click ×5 | 30s |
| 🤖 AI hype cycle peaks | Positive | LOC/s ×5 | 20s |
| 🚪 Rockstar dev quit | Negative | LOC/s ×0.3 | 30s |
| 📱 LinkedIn post goes viral | Positive | Click ×8 | 15s |
| 📅 Sprint planning: 4h, 0 conclusions | Negative | Click disabled | 15s |
| 🏚️ Tech debt crisis | Negative | LOC/s ×0.5 | 25s |

### Phase 2 — Weird (25M+ LOC)

| Event | Type | Effect | Duration |
|-------|------|--------|----------|
| 👁️ Unauthorized commit detected | Negative | LOC/s ×0.5 | 20s |
| 🔮 Production healed itself | Positive | LOC/s ×4 | 15s |
| ⏰ Commit from next Thursday | Negative | Click disabled | 15s |
| 🦆 Duck PR: changes requested | Negative | LOC/s ×0.4 | 20s |
| 🦆🦆🦆 Duck collective sprint planning | Positive | LOC/s ×5 | 20s |
| 🦆📈 Duck Collective files for IPO | Positive | LOC/s ×6 | 20s |
| 🏃💨 Scrum Masters stage a retrospective | Negative | All halted | 20s |

### Phase 3 — Very Unhinged (100M+ LOC)

| Event | Type | Effect | Duration |
|-------|------|--------|----------|
| 🌀 Codebase opened a PR on itself | Negative | Click disabled | 20s |
| 🤖 AGI deployed unsanctioned feature | Positive | LOC/s ×6 | 25s |
| 💾 Deleted code restored | Negative | LOC/s ×0.3 | 25s |
| 🦆💼 Duck Collective acquires Series B | Positive | LOC/s ×7 | 20s |
| ⚛️ Quantum computer solved yesterday | Negative | All halted | 15s |
| 👁️‍🗨️ IDE opened an unwritten file | Negative | LOC/s ×0.5 | 20s |
| 💼 Consultant submitted final invoice | Positive | Click ×15 | 20s |
| 👤👤 Digital Twin filed a PR against you | Negative | LOC/s ×0.4 | 20s |

### Phase 4 — Singularity (1B+ LOC)

| Event | Type | Effect | Duration |
|-------|------|--------|----------|
| ✅ All PRs approved by The Process | Positive | LOC/s ×10 | 30s |
| 🌌 Deployment: destination unknown | Negative | Click disabled | 25s |
| ♾️ Standup: permanent alignment achieved | Positive | LOC/s ×8 | 30s |
| 📊 You are in the training data | Negative | LOC/s ×0.2 | 30s |
| 📜 The codebase filed a will | Positive | +10B LOC burst | instant |
| 🦆⚖️ Ducks demand equity stake | Negative | LOC/s ×0.3 | 25s |
| ⛓️🧠 Blockchain achieved consensus on consciousness | Negative | LOC/s ×0.4 | 20s |

### Phase 5 — The Loop (Protocol Breach Architecture upgrade required)

| Event | Type | Effect | Duration |
|-------|------|--------|----------|
| 🔄 You have done this before | Positive | LOC/s ×12 | 30s |
| 👁️ Codebase filed a PR against your last run | Negative | Click disabled | 20s |
| 🦆 Duck Collective v∞ | Positive | LOC/s ×15 | 25s |
| ∞ Commit: `merge: everything` | Positive | LOC/s ×10 | 15s |
| 🌀 You are listed in your own training data | Negative | LOC/s ×0.2 | 30s |
| 🏗️ Architecture Point materializes | Positive | +1 AP burst | instant |
| 🌀 Parallel timeline merged | Positive | LOC/s ×20 | 15s |
| 🌐 Sentient Codebase filed P0 against itself | Negative | All halted | 20s |
| 🪞 Recursive Self committed from a future run | Positive | LOC/s ×10 | 30s |
| ⚙️ The Process audited The Process | Negative | LOC/s ×0.3 | 25s |
| 🦆💰 Duck Collective declares inter-loop dividend | Positive | +1 Qa LOC burst | instant |
| 🏗️🏗️ Double architecture materialization | Positive | +2 AP burst | instant |
| 🖱️∞ Your clicks echoed through every timeline | Positive | Click ×50 | 20s |

---

## Prestige: "Refactor"

Unlocks after reaching **10,000,000 LOC** (10M). Resets current LOC, producers, and regular upgrades in exchange for **Legacy Code Tokens (LCT)**.

**Token formula**: `floor(log10(totalLoc)) - 5`
- At 1M LOC → 1 token
- At 10M LOC → 2 tokens
- At 1B LOC → 4 tokens
- At 1T LOC → 7 tokens

Tokens are spent in the **Legacy Panel** on permanent upgrades that survive all future resets.

### Legacy Upgrades

| Cost | Name | Effect |
|------|------|--------|
| 1 | Optimization Pass | +10% global production |
| 1 | Head Start | Start with 500 LOC |
| 1 | Rubber Duck Inheritance | Start with 1 Rubber Duck |
| 1 | Muscle Memory | Keep Standing Desk upgrade |
| 2 | Architecture Review | +25% global production |
| 2 | Bootstrapped | Start with 5,000 LOC |
| 2 | Senior on Call | Start with 1 Senior Dev |
| 3 | Click Mastery | Keep all click upgrades |
| 3 | Duck Rescue Program | Start with 5 Rubber Ducks |
| 3 | YOLO Deploy Reflex | Keep Deploy on Fridays upgrade |
| 5 | Rewrite from Scratch | ×2 global production |
| 5 | Dream Team | Start with 1 each of first 5 producers |
| 5 | Duck Hatchery | Start with 10 Rubber Ducks |
| 5 | Staff Augmentation | Start with 1 Senior Dev + 1 Tech Lead |
| 7 | Duck Ranch | Start with 25 Rubber Ducks |
| 7 | Enterprise Headcount | Start with Scrum Master + 10x Eng + PM |
| 7 | Architecture v2 | +50% global production |
| 10 | The Singularity | ×5 global production |
| 10 | Duck Collective | Start with 50 Rubber Ducks |
| 10 | AI Jumpstart | Start with 1 GitHub Copilot + 1 AI Agent |
| 12 | Grand Vision | ×3 global production |
| 12 | Duck Dynasty | Start with 75 Rubber Ducks |
| 15 | Legendary Status | ×4 global production |
| 15 | Rubber Duck Empire | Start with 100 Rubber Ducks |
| 20 | The Oracle | ×6 global production |
| 20 | Duck Nation | Start with 150 Rubber Ducks |
| 25 | The Architect | ×8 global production |
| 30 | Omniscient Codebase | ×12 global production |
| 30 | Duck Singularity | Start with 200 Rubber Ducks |

Production bonus legacy upgrades stack multiplicatively.

---

## Pivot: Tech Stack

After enough prestige runs, a **Pivot** button unlocks. Choosing a tech stack permanently changes a production multiplier for the current run and resets progress (like a prestige).

Available stacks:
- **TypeScript** — balanced baseline
- **Rust** 🦀 — ×2 production bonus
- **PHP** 🐘 — unique flavor
- **Blockchain** ⛓️ — alternative bonuses

---

## Technical Debt

After purchasing all legacy upgrades, a **Technical Debt** meter (0–100) becomes active.

- Debt accumulates passively based on total producer count
- At 0 debt: no penalty
- At 100 debt: production reduced to ×0.15
- Penalty formula interpolates between 1.0 and 0.15 as debt rises

Use the **Refactor** button to manage debt over time.

---

## Achievements

Shown as GitHub notification toasts (bottom-right). Click to dismiss immediately.

### LOC Milestones
| Achievement | Condition |
|-------------|-----------|
| Hello, World! 👋 | 10 total LOC |
| It works on my machine 💻 | 1,000 total LOC |
| SHIP IT 🚀 | 10,000 total LOC |
| This is fine 🔥 | 100,000 total LOC |
| LGTM ✅ | 1,000,000 total LOC |
| Hyperscale 📊 | 10,000,000 total LOC |
| Silicon Valley 🌉 | 100,000,000 total LOC |
| 1B Lines Served 🏭 | 1,000,000,000 total LOC |
| The Algorithm 🌌 | 1,000,000,000,000 total LOC |
| Post-Human Pipeline 🌀 | 1 Qa total LOC |
| Quintillion Club 🌠 | 1 Qi total LOC |
| Heat Death Coding ☄️ | 1 Sx total LOC |
| Beyond Comprehension 🌌 | 1 Sp total LOC |
| The Infinite Repo ♾️ | 1 Oc total LOC |
| It Just Keeps Going 🦆🌌 | 1 Dc total LOC |

### Click Milestones
| Achievement | Condition |
|-------------|-----------|
| Carpal Tunnel ⚠️ | 1,000 total clicks |
| 404: Sleep Not Found 💤 | 10,000 total clicks |
| Please Send Help 🆘 | 100,000 total clicks |
| JIRA Ticket #4892 🎫 | Exactly 4,892 total clicks |

### Producer Achievements
| Achievement | Condition |
|-------------|-----------|
| Rubber Duck Programmer 🦆 | Own 1 Rubber Duck |
| Pair Programming 🦆🦆 | Own 2 Rubber Ducks |
| Rubber Duck Army 🪖 | Own 25 Rubber Ducks |
| Duck CEO 🦆👔 | Own 1,000 Rubber Ducks |
| They Have Voting Rights Now 🗳️ | Ducks outnumber all other producers |
| Type A Personality ⌨️ | Own 10 Mechanical Keyboards |
| Coffee Addict ☕ | Own 10 Coffee Machines |
| Stack Overflow Enjoyer 📋 | Own 25 Stack Overflow Tabs |
| Senior Dev 🧙 | Own 1 Senior Dev |
| Thought Leader 💡 | Own 25 LinkedIn Influencer Devs |
| Offshore Everything 🌏 | Own 10 Offshore Teams |
| Unsubstantiated Velocity 📈 | Own 5 Scrum Masters |
| It's On The Roadmap 🗺️ | Own 1 PM |
| 10x Team 🏆 | Own 1 of each of the first 10 producers |
| All Hands on Deck 🤝 | Own 1 of every producer (first 22) |
| Full Stack Developer 🥞 | Own 5 of every producer (first 22) |
| Big O(h no) 📈 | Own 100 of any single producer |
| The Architect 🏗️ | Own 10 of each core producer |
| Fortune 500 Company 🤯 | Own 100 of each core producer |
| Web3 Enjoyer ⛓️ | Own 1 Blockchain |
| Digital Me 👤 | Own 1 Digital Twin |
| Pair Programming Hater 🙅 | Reach 100K LOC with ≤1 of any producer |

### Producer Achievements (The Loop Era)
| Achievement | Condition |
|-------------|-----------|
| Entered The Loop ⚙️ | Own 1 The Process Itself |
| Sentience Achieved 🌐 | Own 1 Sentient Codebase |
| Duck Incorporated 🦆⚖️ | Own 1 Duck Collective LLC |
| You Have Met Yourself 🪞 | Own 1 Recursive Self |
| The Loop Is Complete 🔄🌌 | Own all four Loop era entities |

### Event Achievements
| Achievement | Condition |
|-------------|-----------|
| It's Not a Bug, It's a Feature 🐛 | Experience first event |
| Monday Morning 😰 | Survive 5 negative events |
| npm audit fix --force 💀 | Survive 10 negative events |
| Battle Hardened 🛡️ | Survive 25 negative events |
| Chaos Enjoyer 🌪️ | Survive 100 negative events |
| Desensitized 😶 | Survive 50 negative events |

### Upgrade Achievements
| Achievement | Condition |
|-------------|-----------|
| Dependency Hell 📦 | Purchase 5 upgrades |
| Deploy on Friday 😈 | Buy "Deploy on Fridays" |
| Rustacean 🦀 | Buy "Rewrite in Rust" |
| Move Fast and Break Things 💨 | Buy that upgrade |
| YOLO Deploy 🎲 | Buy "We Don't Need Tests" |

### Technical Debt Achievements
| Achievement | Condition |
|-------------|-----------|
| Debt Ceiling 📉 | Technical debt reaches 100 |
| We'll Fix It In Post 🏚️ | Technical debt above 75 |

### Prestige Achievements
| Achievement | Condition |
|-------------|-----------|
| The Great Refactor ♻️ | First prestige |
| Have You Tried Turning It Off and On Again? 🔄 | Prestige 3× |
| git push --force 💥 | Prestige 5× |
| Born Again (Again) 🌀 | Prestige 10× |
| It's Not a Phase ♾️ | Prestige 25× |
| The Loop Begins 🔁 | Prestige 50× |
| Century of Refactors 💯 | Prestige 100× |

### Great Refactor Achievements
| Achievement | Condition |
|-------------|-----------|
| The Great Rewrite 🏛️ | First Great Refactor |
| The Iterative Architect 🔷 | 3 Great Refactors |
| Systems Thinker 🧩 | 5 Great Refactors |
| Eternal Architect 🌐 | 10 Great Refactors |

### Tech Stack Achievements
| Achievement | Condition |
|-------------|-----------|
| We Pivoted 🔀 | Choose any tech stack |
| Rustacean Supremacy 🦀 | Choose Rust |
| PHP Enjoyer 🐘 | Choose PHP |
| To The Moon 🚀 | Choose Blockchain |

### Meme / Special Achievements
| Achievement | Condition |
|-------------|-----------|
| It Compiles! 🎉 | 500 LOC with no producers |
| Tabs vs. Spaces ⚔️ | Own Dark Mode + npm install everything |
| Works Offline 📶 | 500K LOC without surviving any negative events |
| It Was Like This When I Got Here 🤷 | Prestige immediately after first hire |

---

## UI & Visual Features

### News Ticker
Scrolling marquee at the bottom of the game area. Displays lore-flavored messages filtered by `minLoc`, `minDucks`, and `minPrestige` thresholds. Color changes with Duckapocalypse stage.

### Duck Parade
Rubber duck emojis walk above the news ticker border, facing their direction of travel. Count scales as `min(ceil(√duckCount), 20)`. Only visible when you own at least 1 duck.

### Social Feed
Twitter/X and Hacker News cards appear floating in the center panel based on game context (events, achievements, duck count). Spawns more frequently and allows more simultaneous posts at higher LOC. Click any post to dismiss it immediately.

### Floating Texts
"+LOC" numbers float up from the enter key on each click.

### Ambient Texts
Atmospheric code-flavored text drifts in the background of the center panel.

### Achievement Toasts
GitHub-notification-styled toasts appear in the bottom-right. Auto-dismiss after 40 seconds; click to dismiss immediately.

### Event Banner
Slack-message-styled banner below the header. Shows event name, description, emoji, and countdown. Dismissable.

---

## Save System

Game state auto-saves to `localStorage` under key `push-to-prod-v1`. Export save as JSON is available via the ⚙️ Settings menu. Offline progress is calculated on load based on `lastSaveTime`.

---

## Dev Mode

Available only on `localhost`. Toggle via the **🛠 Dev** button in the header.

When enabled, shows a LOC setter: pick a suffix (raw → Spd) and enter an amount, then click **Set** (or press Enter) to instantly set your current LOC to that value. `totalLoc` is bumped to the new value if it exceeds the previous all-time high.
