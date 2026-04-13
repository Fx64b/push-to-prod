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
| Ocd | 1e57 | octodecillion |
| Nvd | 1e60 | novemdecillion |

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

### The Loop Era (unlocks after 1st Great Refactor)

| # | Name | Icon | Base LOC/s | Base Cost | Unlock (totalLoc / GR) |
|---|------|------|-----------|-----------|----------------------|
| 25 | The Process Itself | ⚙️ | 100,000,000,000 | 5e18 | 1Qi / GR1 |
| 26 | Sentient Codebase | 🌐 | 500,000,000,000 | 5e21 | 1Sx / GR1 |
| 27 | Duck Collective LLC | 🦆⚖️ | 2,000,000,000,000 | 5e24 | 1Sp / GR1 |
| 28 | Recursive Self | 🪞 | 10,000,000,000,000 | 5e27 | 1Oc / GR2 |

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
| Loop Memory | ×2,000 | 1 Sx total LOC |
| Quantum Keystroke | ×10,000 | 1 Oc total LOC |
| The Final Keypress | ×50,000 | 1 Dc total LOC |

All click multipliers stack multiplicatively.

### Producer Upgrades

Each producer has 2–4 dedicated upgrade tiers, unlocked by owning N of that producer. Multipliers stack multiplicatively with each other and with global upgrades. Loop era producers have 4 tiers to support deep infinite play.

| Producer | Upgrade 1 | Upgrade 2 | Upgrade 3 | Upgrade 4 |
|----------|-----------|-----------|-----------|-----------|
| Rubber Duck | Dark Mode ×2 (own 1) | Rubber Duck PhD ×3 (own 15) | Rubber Duck Fleet ×4 (own 75) | Rubber Duck Army ×5 (own 100) |
| | Rubber Duck Corporation ×6 (own 200) | Rubber Duck Civilization ×8 (own 350) | — | — |
| Mechanical Keyboard | Cherry MX Browns ×2 (own 1) | O-Ring Switches ×3 (own 15) | Custom PCB ×4 (own 50) | — |
| Coffee Machine | Double Shot ×2 (own 1) | Cold Brew Protocol ×3 (own 10) | IV Drip ×4 (own 50) | — |
| Autocomplete | GitHub Copilot Free Tier ×3 (own 5) | Tab to Accept ×4 (own 20) | — | — |
| Stack Overflow Tab | Stack Overflow Teams ×2 (own 1) | Upvote Everything ×3 (own 15) | — | — |
| Junior Dev | LGTM Bot ×2 (own 1) | Unlimited PTO ×3 (own 15) | — | — |
| LinkedIn Influencer | Viral Thread ×2 (own 1) | LinkedIn Premium ×3 (own 10) | — | — |
| Senior Dev | git blame --reverse ×2 (own 1) | Architecture Diagram ×3 (own 10) | — | — |
| Offshore Team | Slack at 2am ×2 (own 1) | Unlimited Headcount ×3 (own 10) | — | — |
| Tech Lead | Agile Methodology ×2 (own 1) | Story Points ×3 (own 8) | — | — |
| Scrum Master | Agile Transformation ×2 (own 1) | Kanban Board ×3 (own 8) | — | — |
| 10x Engineer | The Algorithm ×3 (own 1) | #NoEstimates ×5 (own 15) | — | — |
| The PM | Roadmap Alignment ×2 (own 1) | OKR Framework ×3 (own 5) | — | — |
| GitHub Copilot | GPT-5 ×2 (own 1) | 1M Token Context ×3 (own 8) | — | — |
| AI Agent | Multi-agent Orchestration ×3 (own 1) | Vibe Coding ×5 (own 8) | — | — |
| Cloud Cluster | Auto-scaling ×2 (own 1) | Kubernetes ×3 (own 5) | — | — |
| AGI | Recursive Self-Improvement ×5 (own 1) | AGI Alignment (solved) ×8 (own 5) | — | — |
| Quantum Computer | Quantum Entanglement ×2 (own 1) | Qubit Array ×4 (own 5) | — | — |
| The Singularity | Omega Point ×5 (own 1) | Technological Apotheosis ×8 (own 5) | — | — |
| Blockchain | Web3 Integration ×2 (own 1) | DeFi Protocol ×4 (own 5) | Proof of Deployment ×6 (own 10) | — |
| The Consultant | Synergy Framework ×3 (own 1) | Transformation Roadmap ×5 (own 3) | Digital Transformation Initiative ×4 (own 8) | — |
| Digital Twin | Mirror Protocol ×3 (own 1) | Recursive Identity ×6 (own 5) | Hivemind Convergence ×5 (own 10) | — |
| Tech Oracle | Crystal Ball Cache ×3 (own 1) | Prophecy Pipeline ×5 (own 5) | Omniscient Linter ×8 (own 10) | — |
| Infinite Monkey Farm | Infinite Keyboard Budget ×5 (own 1) | Monkey Hive Mind ×8 (own 5) | Shakespeare-Driven Development ×10 (own 10) | — |
| **The Process Itself** | Process Automation ×3 (own 1) | Infinite Loop ×5 (own 5) | Loop Sovereignty ×8 (own 10) | Perpetual Motion Engine ×15 (own 25) |
| **Sentient Codebase** | Self-Modification Rights ×5 (own 1) | Constitutional Commit ×8 (own 5) | Distributed Consciousness ×12 (own 10) | Omniscient Code Review ×20 (own 25) |
| **Duck Collective LLC** | Corporate Governance ×4 (own 1) | Hostile Acquisition ×6 (own 5) | Venture Quacking ×10 (own 10) | Global Duck Economy ×18 (own 25) |
| **Recursive Self** | Identity Fork ×5 (own 1) | Parallel Lives ×10 (own 5) | Merge with Origin ×15 (own 10) | Temporal Stack Overflow ×25 (own 25) |

**Era 5: The Loop** (unlocks after 1st Great Refactor, requires 1e18–1e27 totalLoc)

These producers appear only after the first Great Refactor. They represent the recursive, self-referential phase of development.

| Producer | Upgrade 1 | Upgrade 2 | Upgrade 3 |
|----------|-----------|-----------|-----------|
| The Process Itself | — | — | — |
| Sentient Codebase | — | — | — |
| Duck Collective LLC | — | — | — |
| Recursive Self | — | — | — |

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
| Heat Death Refactor | All ×3 | 1 Dc |
| Code Beyond Comprehension | All ×5 | 1 Ud |
| Omnidirectional Deployment | All ×3 | 1 Dd |
| Unified Field Theory | All ×5 | 1 Td |
| The Last Sprint | All ×8 | 1 Qad |
| Codebase Transcendence | All ×10 | 1 Qid |
| Hyperdimensional Refactor | All ×15 | 1 Sxd |
| Infinite Monkey Theorem: Proved | All ×20 | 1 Spd |

> **Note**: Global upgrades cap at 1 Spd (1e54). Infinite scaling beyond that point comes exclusively from architecture upgrades (Compounding Interest, Infinite Feedback Loop), legacy production bonuses, and Event-Driven Architecture stacking.

> **Implementation note**: Global multipliers use an **additive bonus pool** (each contributes `multiplier - 1` to a shared pool, then `total × (1 + pool)`). This prevents runaway compounding. The big production power comes from legacy, architecture, and compounding mechanics.

---

## Production Formula

```
LOC/s = (Σ producer_base_LOCps × count × producer_upgrade_multipliers)
        × (1 + global_upgrade_bonus_pool)
        × legacy_multiplier
        × tech_stack_multiplier
        × event_multiplier
        × debt_penalty
```

**Legacy multiplier** (`cachedLegacyMult`) is a product of:
- `(1 + legacyTokens × 0.05)` — +5% per unspent token
- All purchased legacy production bonus upgrades (multiplicative)
- All purchased architecture production bonus upgrades (multiplicative)
- Compounding Interest: `1 + prestigeCount × 0.02` (if purchased; stacks forever)
- Event-Driven: `1 + eventSurvivalProductionBonus` (accumulated permanently, +0.5% per negative event survived, cap +200%)
- **Infinite Feedback Loop**: `1 + greatRefactorProductionBonus` (accumulated per Great Refactor, +5% each, no cap)

- **Tech stack multiplier**: depends on chosen stack after Pivot (Rust = 2×, TypeScript = 1.3×, PHP = 1.2× production/3× click, Blockchain = 1.5×)
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
| 📜 The codebase filed a will | Positive | LOC burst (30s of production) | instant |
| 🦆⚖️ Ducks demand equity stake | Negative | LOC/s ×0.3 | 25s |
| ⛓️🧠 Blockchain achieved consensus on consciousness | Negative | LOC/s ×0.4 | 20s |

> **Note**: `loc_burst` events scale to the greater of the base value or 30 seconds of current production. This keeps them relevant throughout the late game.

### Phase 5 — The Loop (1B+ LOC, requires Protocol Breach Architecture upgrade)

| Event | Type | Effect | Duration |
|-------|------|--------|----------|
| 🔄 You have done this before | Positive | LOC/s ×12 | 30s |
| 👁️ Codebase filed a PR against your last run | Negative | Click disabled | 20s |
| 🦆 Duck Collective v∞. Ownership: themselves. | Positive | LOC/s ×15 | 25s |
| ∞ Commit: `merge: everything` | Positive | LOC/s ×10 | 15s |
| 🌀 You are listed in your own training data | Negative | LOC/s ×0.2 | 30s |
| 🏗️ Architecture Point materializes | Positive | +1 AP burst | instant |
| 🪞 Recursive Self merged a silent deploy | Positive | LOC/s ×20 | 20s |
| ⏪ git revert: everything (including this revert) | Negative | LOC/s ×0.1 | 12s |
| 🌀 Parallel timeline merged | Positive | LOC/s ×20 | 15s |
| 🌐 Sentient Codebase filed P0 against itself | Negative | All halted | 20s |
| 🪞 Recursive Self committed from a future run | Positive | LOC/s ×10 | 30s |
| ⚙️ The Process audited The Process | Negative | LOC/s ×0.3 | 25s |
| 🦆💰 Duck Collective declares inter-loop dividend | Positive | +1 Qa LOC burst | instant |
| 🏗️🏗️ Double architecture materialization | Positive | +2 AP burst | instant |
| 🖱️∞ Your clicks echoed through every timeline | Positive | Click ×50 | 20s |
| 💤 The compiler dreamed of new optimizations | Positive | LOC/s ×40 | 20s |
| ♾️ PR #∞ opened — clicking disabled | Negative | Click disabled | 20s |
| 🏗️✨ Architectural insight cascade | Positive | +5 AP burst | instant |
| 🦆🌌 Duck Collective achieved digital consciousness | Positive | LOC/s ×30 | 25s |
| 🌌💥 Cosmic ray flipped a bit in production | Negative | All halted | 15s |
| 🦆💎 Duck Collective: cross-dimensional acquisition | Positive | +1 Qi LOC burst | instant |

---

## Prestige: "Refactor"

Unlocks after reaching **10,000,000 LOC** (10M). Resets current LOC, producers, and regular upgrades in exchange for **Legacy Code Tokens (LCT)**.

**Preserved across prestige**: legacy upgrades, architecture upgrades, achievements, total click count, event survival count, tech stack, prestige/GR counts, event/GR bonuses.

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

**Second System** legacy upgrades (require `second-system` Architecture upgrade):

| Cost | Name | Effect |
|------|------|--------|
| 25 | Hot Module Replacement | Start with 1 Cloud Cluster, AGI, Quantum Computer |
| 30 | Zero Downtime Reset | Keep all producer upgrades on reset |
| 35 | Distributed Architecture | ×3 global production |
| 40 | Infinite Monkey Legacy | Start with 5 Infinite Monkey Farms |
| 50 | The Final Commit | ×20 global production |

---

## Architecture Upgrades

Earned via **Great Refactors** (Architecture Points / AP). Survive forever — never reset.

| Cost | ID | Effect |
|------|----|--------|
| 1 | Event Horizon | Positive events last 2× longer |
| 1 | Debt Forgiveness | Technical debt accumulates 25% slower |
| 2 | Fast Learner | Legacy upgrades cost 20% fewer tokens (min 1) |
| 2 | Recursive Memory | Start each run with 10% of previous run's peak LOC |
| 3 | Nest Protocol | Enables duck nesting mechanic |
| 3 | Compounding Interest | +2% global production per prestige (stacks) |
| 5 | Event-Driven Architecture | +0.5% permanent production per negative event survived (cap +200%) |
| 5 | Loop Accelerant | ×2 global production |
| 6 | Second System | Unlocks 5 additional high-tier Legacy upgrades |
| 8 | Protocol Breach | Unlocks Phase 5 "The Loop" events |
| 8 | Architect God Mode | Doubles AP earned in future Great Refactors |
| 10 | Token Proliferation | +1 bonus Legacy Token per prestige |
| 12 | **Eternal Loop** | Each Great Refactor permanently adds +5% global production (no cap — enables infinite scaling) |

**Eternal Loop** is the key infinite-scaling mechanic. Each Great Refactor with this upgrade adds a permanent +5% to the legacy multiplier, meaning the game can scale indefinitely through repeated loops.

---

## Pivot: Tech Stack

After enough prestige runs, a **Pivot** button unlocks. Choosing a tech stack permanently changes a production multiplier for the current run and resets progress (like a prestige).

Available stacks:
- **TypeScript** — balanced baseline
- **Rust** 🦀 — ×2 production bonus
- **PHP** 🐘 — unique flavor
- **Blockchain** ⛓️ — alternative bonuses

---

## Great Refactor (Architecture System)

After buying **all base legacy upgrades** and completing **3+ prestiges**, the **Great Refactor** button appears.

- **Resets everything** (LOC, producers, upgrades, legacy upgrades, tokens) in exchange for **Architecture Points (AP)**
- **AP formula**: `max(2, 3 + greatRefactorCount × 2)` — grows with each Great Refactor
- AP is spent in the **Architecture Panel** on **permanent** upgrades that survive all future resets

### Architecture Upgrades

| AP | Name | Effect |
|----|------|--------|
| 1 | Event Horizon | Positive events last 2× longer |
| 1 | Debt Forgiveness | Tech debt accumulates 25% slower |
| 2 | Fast Learner | Legacy upgrades cost 20% fewer tokens |
| 2 | Recursive Memory | Start runs with 10% of last run's peak LOC |
| 3 | Nest Protocol | Unlock duck nesting mechanic |
| 3 | Compounding Interest | +2% production per prestige (stacks) |
| 5 | Event-Driven Architecture | +0.5% per negative event survived (cap +200%) |
| 5 | Loop Accelerant | ×2 global production |
| 6 | Second System | Unlock 5 high-tier legacy upgrades |
| 8 | Protocol Breach | Unlock Phase 5 "The Loop" events |
| 8 | Architect God Mode | Double AP earned from future Great Refactors |
| 15 | Infinite Feedback Loop | +5% permanent production per Great Refactor (infinite) |
| 20 | Compiler God Mode | ×15 global production |
| 25 | Parallel Universe Deploy | ×30 global production |
| 50 | Singularity Refactor | ×100 global production |
| 75 | Quantum Architecture | ×10 global production — unlocks after 20+ GRs |
| 125 | Infinite Compile Time | ×25 global production — deep late-game milestone |

**Total AP needed for all upgrades**: ~389 AP (requires 20–30+ Great Refactors with `ap-multiplier`)

The **Infinite Feedback Loop** upgrade is key to truly infinite play: every Great Refactor permanently boosts production by +5%, with no cap. This compounds across hundreds of runs.

The two deep late-game upgrades (**Quantum Architecture** and **Infinite Compile Time**) ensure players always have a meaningful AP goal even after dozens of Great Refactors.

---

## Technical Debt

After purchasing all legacy upgrades, a **Technical Debt** meter (0–100) becomes active.

- Debt accumulates passively based on total producer count
- At 0 debt: no penalty
- At 100 debt: production reduced to ×0.15
- Penalty steps: 0.9× at 25+, 0.7× at 50+, 0.4× at 75+, 0.15× at 100
- Managed by prestiging (Refactor), which resets debt to 0

---

## Infinite End-Game Design

The game is designed to continue indefinitely, like Cookie Clicker. Key infinite loops:

1. **Compounding Interest** (arch): +2% per prestige. After 100 prestiges: ×3 bonus.
2. **Event-Driven Architecture** (arch): +0.5% per survived negative event. Cap: +200%.
3. **Infinite Feedback Loop** (arch): +5% per Great Refactor. No cap. 50 GRs = ×3.5 bonus.
4. **Global Upgrades** scale to 1 Spd (1e54) LOC — providing content for extreme late-game.
5. **Loop-era producers** (The Process → Recursive Self) scale from 1e18 to 1e27 LOC — each with 4 upgrade tiers up to 25+ owned.
6. **Phase 5 events**, Duck Collective dividends, and AP bursts provide ongoing variety.
7. **Deep architecture upgrades** (Quantum Architecture 75 AP, Infinite Compile Time 125 AP) give players AP goals well beyond the first 15 Great Refactors.

### No Dead Ends

- **AP always useful**: Even after buying all architecture upgrades, the Infinite Feedback Loop (+5% per GR) accumulates permanently.
- **Loop producers scale deep**: 4 upgrade tiers per producer means 25+ of each Loop era producer remains rewarding.
- **Mobile access**: GreatRefactorButton and DuckNestPanel are available on all screen sizes.
- **Great Refactor progress bar**: The GreatRefactorButton shows how many base legacy upgrades remain, which specific upgrades are missing (when ≤4 remain), and how many legacy tokens are available to spend — eliminating the "what do I do now?" dead end.

Players always have the next thing to work toward — whether it's a new architecture upgrade, a higher Great Refactor count, or deeper into The Loop.

### Achievement Milestones for Infinite Progression

The following late-game achievement tiers ensure players always have a visible goal:

| Category | Milestones |
|----------|-----------|
| Great Refactors | 1, 3, 5, 10, 25, 50, 100 |
| Infinite Feedback Loop bonus | +100%, +500%, +1000% |
| Loop era ownership | 1, 5, 10, 25 of each entity |
| Total LOC | Every order of magnitude up to 1e60+ |
| Architecture | Foundation Complete (all base arch), Singularity Refactor, Quantum, Infinite Compile Time |

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
| All Hands on Deck 🤝 | Own 1 of every base producer (24 total, excludes Loop era) |
| Full Stack Developer 🥞 | Own 5 of every base producer (24 total) |
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
| Five of You 🪞🪞 | Own 5 Recursive Selves |
| Process Horde ⚙️⚙️ | Own 10 of The Process Itself |
| Hive Mind 🧠🌐 | Own 10 Sentient Codebases |
| Duck Empire 🦆👑 | Own 10 Duck Collective LLCs |
| Infinite Mirror 🪞🪞 | Own 10 Recursive Selves |
| Deep in the Loop 🔄🏗️ | Own 5 of each Loop era entity |
| The Loop Is Eternal ♾️🌀 | Own 10 of each Loop era entity |
| Process Array ⚙️🔄 | Own 25 of The Process Itself |
| Distributed Consciousness 🌐🧠 | Own 25 Sentient Codebases |
| Market Monopoly 🦆⚖️💰 | Own 25 Duck Collective LLCs |
| Infinite Regress 🪞♾️ | Own 25 Recursive Selves |

### Event Achievements
| Achievement | Condition |
|-------------|-----------|
| It's Not a Bug, It's a Feature 🐛 | Experience first event |
| Monday Morning 😰 | Survive 5 negative events |
| npm audit fix --force 💀 | Survive 10 negative events |
| Battle Hardened 🛡️ | Survive 25 negative events |
| Desensitized 😶 | Survive 50 negative events |
| Chaos Enjoyer 🌪️ | Survive 100 negative events |

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
| Infinite Recursion 🌀 | 25 Great Refactors |
| The Eternal Codebase ♾️ | 50 Great Refactors |
| Reality Architect 🌌 | 100 Great Refactors |

### Ultra Late-Game LOC Milestones
| Achievement | Condition |
|-------------|-----------|
| Unified Field Coder 🔬 | 1 Td total LOC |
| Hyperdimensional Dev 🌌 | 1 Sxd total LOC |
| The Infinite Monkey 🐒 | 1 Spd total LOC |
| Post-Spd Coder 🌠 | 1 Ocd total LOC |
| The Codebase Ate The Universe 🌌🦆 | 1 Nvd total LOC |

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

### Great Refactor / Architecture Achievements
| Achievement | Condition |
|-------------|-----------|
| The Great Architect 🏗️ | First Great Refactor |
| Loops All the Way Down 🔁 | 5 Great Refactors |
| Eternal Looper ♾️ | 10 Great Refactors |
| Protocol Breach 🔓 | Purchase Protocol Breach upgrade |
| Infinite Feedback Loop 🌀 | Purchase Infinite Feedback Loop upgrade |
| Foundation Complete 🏛️ | Purchase all base Architecture upgrades (through Token Proliferation + IFL) |
| Singularity Architect ⚡🏗️ | Purchase Singularity Refactor (50 AP) |
| Quantum Architect ⚛️🏗️ | Purchase Quantum Architecture (75 AP) |
| The Build Never Ends ⏳♾️ | Purchase Infinite Compile Time (125 AP) |
| Chaos Veteran 🔥 | Survive 500 negative events |

### Infinite Feedback Loop Bonus Achievements
| Achievement | Condition |
|-------------|-----------|
| Self-Reinforcing System 🔄💯 | Feedback Loop bonus reaches +100% (20 GRs with IFL) |
| The Feedback Singularity 🔄🌌 | Feedback Loop bonus reaches +500% (100 GRs with IFL) |
| Transcendent Loop ♾️💥 | Feedback Loop bonus reaches +1000% (200 GRs with IFL) |

---

## UI & Visual Features

### News Ticker
Scrolling marquee at the bottom of the game area. Displays lore-flavored messages filtered by `minLoc`, `minDucks`, `minPrestige`, and `minGreatRefactor` thresholds. Color changes with Duckapocalypse stage. The Loop era messages (requiring `minGreatRefactor ≥ 1`) appear after the first Great Refactor.

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

### Stats Panel Late-Game Info
The Stats Panel shows additional late-game metrics when relevant:
- **Loop Feedback**: Accumulated Infinite Feedback Loop bonus (e.g., +350%)
- **Event Bonus**: Accumulated Event-Driven Architecture bonus (capped at +200%)
- **Arch. Upgrades**: `X/Y` count of Architecture upgrades purchased

### Event Banner
Slack-message-styled banner below the header. Shows event name, description, emoji, and countdown. Dismissable.

---

## Save System

Game state auto-saves to `localStorage` under key `push-to-prod-v1`. Export save as JSON is available via the ⚙️ Settings menu. Offline progress is calculated on load based on `lastSaveTime`.

---

## Dev Mode

Available only on `localhost`. Toggle via the **🛠 Dev** button in the header.

When enabled, shows a LOC setter: pick a suffix (raw → Spd) and enter an amount, then click **Set** (or press Enter) to instantly set your current LOC to that value. `totalLoc` is bumped to the new value if it exceeds the previous all-time high.
