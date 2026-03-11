# push to prod — Game Design Document

> *"Every great codebase started with a single keystroke."*

---

## Core Metric

**Lines of Code (LOC)** — the primary currency of the game.

Displayed with abbreviations: 1K, 1M, 1B, 1T, 1Qa…

Secondary metrics shown in sidebar:
- **LOC/s** — Lines of Code per second (auto-production rate)
- **Total LOC ever** — all-time accumulation (for achievements)
- **Commits** — milestone markers every 1,000 LOC

---

## The Clicker

A large **ENTER key** rendered in HTML/CSS (pure CSS box-shadow, border, gradient for keycap look).

Click animation: CSS `transform: translateY(3px) + box-shadow shrink` for a satisfying key-press feel.

Each click = base 1 LOC (modified by upgrades).

---

## Producers (Auto-Typers)

| # | Name | Flavor | Base LOC/s | Base Cost |
|---|------|--------|-----------|-----------|
| 1 | Rubber Duck | "You explain the bug. It judges you silently." | 0.1 | 10 |
| 2 | Mechanical Keyboard | "CLACK CLACK CLACK CLACK CLACK" | 1 | 100 |
| 3 | Autocomplete | "It finishes your sentences. Sometimes correctly." | 5 | 500 |
| 4 | Stack Overflow Tab | "Copy-paste engineering at its finest." | 20 | 2,000 |
| 5 | Junior Dev | "Writes 10x the code for 0.1x the quality." | 100 | 10,000 |
| 6 | Senior Dev | "Deletes 1,000 lines. Adds 5. Ships it." | 400 | 50,000 |
| 7 | 10x Engineer | "Doesn't actually exist. You hired one anyway." | 2,000 | 250,000 |
| 8 | GitHub Copilot | "AI writes 90% of your code. You write the other 90%." | 10,000 | 1,000,000 |
| 9 | AI Agent | "You reviewed one PR this week. It shipped 47 features." | 50,000 | 5,000,000 |
| 10 | AGI | "It refactored the codebase, filed the patents, and IPO'd without telling you." | 250,000 | 25,000,000 |

**Cost scaling**: 1.15× per unit purchased

---

## Upgrades

### Click Upgrades

| Name | Effect | Unlock Condition |
|------|--------|-----------------|
| Standing Desk | Click ×2 | 10 LOC |
| 2 Monitors | Click ×3 | 500 LOC |
| Ergonomic Chair | Click ×4 | 5,000 LOC |
| Energy Drink | Click ×10 | 50,000 LOC |
| The Zone | Click ×25 | 500,000 LOC |

### Producer Upgrades

| Name | Effect | Unlock Condition |
|------|--------|-----------------|
| Dark Mode | Rubber Duck ×2 | Own 1 Rubber Duck |
| Cherry MX Browns | Keyboard ×2 | Own 1 Keyboard |
| GitHub Copilot Free Tier | Autocomplete ×3 | Own 5 Autocompletes |
| LGTM Bot | Junior Dev ×2 | Own 1 Junior Dev |
| git blame --reverse | Senior Dev ×2 | Own 1 Senior Dev |
| The Algorithm | 10x Engineer ×3 | Own 1 10x Engineer |
| GPT-5 | GitHub Copilot ×2 | Own 1 GitHub Copilot |
| Multi-agent Orchestration | AI Agent ×3 | Own 1 AI Agent |
| Recursive Self-Improvement | AGI ×5 | Own 1 AGI |

### Global Multiplier Upgrades

| Name | Effect | Unlock Condition |
|------|--------|-----------------|
| npm install everything | All producers ×1.1 | 1,000 total LOC |
| Deploy on Fridays | All producers ×1.5 | 10,000 total LOC |
| Microservices Architecture | All producers ×2 | 100,000 total LOC |
| Rewrite in Rust | All producers ×3 | 1,000,000 total LOC |
| The Mythical Man-Month (ignored) | All producers ×5 | 10,000,000 total LOC |

---

## Random Events (Slack Notification Style)

Events trigger randomly every 30–120s. Shown as a dismissable banner styled as a Slack message.

| Event | Effect | Duration |
|-------|--------|----------|
| 🔥 Production is down! | LOC/s ×0.5 | 20s |
| ⭐ GitHub stars going viral | LOC burst +500% | 10s |
| 🐛 Bug in production | Click disabled | 10s |
| ☕ Coffee machine broken | LOC/s ×0.8 | 30s |
| 📣 CEO wants a live demo | Click ×10 | 20s |
| 🤝 Merge conflict detected | LOC/s ×0.5 | 15s |
| 📦 npm package deprecated | LOC/s ×0.7 | 20s |
| 🚨 CVE discovered | LOC/s ×0 (halted) | 10s |
| 🗞️ HackerNews front page | LOC/s ×3 | 30s |
| 📝 Code review requested | LOC/s ×0.3 | 30s |

---

## Achievements

Styled as GitHub notification toasts (bottom-right).

| Achievement | Condition |
|-------------|-----------|
| Hello, World! | 10 LOC ever |
| It works on my machine | 1,000 LOC ever |
| SHIP IT | 10,000 LOC ever |
| This is fine 🔥 | 100,000 LOC ever |
| LGTM | 1,000,000 LOC ever |
| 1B Lines Served | 1,000,000,000 LOC ever |
| The Algorithm | 1,000,000,000,000 LOC ever |
| Rubber Duck Programmer | Buy first Rubber Duck |
| Type A Personality | Buy 10 Keyboards |
| Stack Overflow Enjoyer | Buy 25 SO Tabs |
| 10x Team | Own 1 of each producer |
| Big O(h no) | Own 100 of any producer |
| It's Not a Bug, It's a Feature | Trigger first event |
| Monday Morning | Survive 5 negative events |
| Deploy on Friday | Purchase Deploy on Fridays upgrade |
| The Great Refactor | Prestige for the first time |

---

## Prestige: "Refactor"

After reaching 1,000,000 LOC, unlock the **Refactor** button.

- Resetting gives **Legacy Code Tokens (LCT)** = `floor(log10(totalLoc)) - 5`
- LCTs are spent in a permanent "Legacy Panel" for multipliers that survive resets
- Bonuses: "+5% all production per LCT", "Start with Rubber Duck", "Keep first upgrade"
