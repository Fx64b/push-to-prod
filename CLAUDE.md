# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start Vite dev server (localhost:5173)
pnpm build      # tsc -b + Vite production build
pnpm preview    # Serve the production build locally
pnpm check      # Biome checks (lint + format) on src/
pnpm lint       # Biome linter only
pnpm format     # Biome auto-format
```

No test suite exists. There is no single-test runner command.

## Code Style

Biome enforces formatting: 2-space indent, 100-char line width. Run `pnpm check` before committing. TypeScript strict mode is enabled. Path alias `@/` maps to `src/`.

## Architecture Overview

**Stack:** React 18 + TypeScript + Vite + Zustand + Tailwind CSS + Radix UI + Biome

This is a developer-themed idle clicker game ("push to prod"). Players earn Lines of Code (LOC), buy producers, purchase upgrades, and use prestige mechanics to unlock new content.

### State Management

All game state lives in a single Zustand store at `src/store/gameStore.ts` with localStorage persistence. This is the heart of the codebase — it contains all actions (click, tick, buy producers/upgrades, prestige, etc.) and derived computed values.

### Game Loop

`src/hooks/useGameLoop.ts` ticks every 100ms and calls `tick()` on the store, advancing game time. `src/hooks/useOfflineProgress.ts` calculates production earned while the app was closed (capped at 8 hours) and applies it on mount.

### Production Calculations

`src/utils/production.ts` contains:
- `calculateLOCps()` — total LOC/s from all producers + upgrade multipliers
- `calculateClickValue()` — click output
- `calculateSingleProducerLOCps()` — per-producer-type output

These functions are called both inside the store and by UI components for display.

### Data Layer (`src/data/`)

Static game content — producers, upgrades, events, achievements, social posts — lives here as typed data arrays. Adding new content means extending these files and potentially adding corresponding store logic.

- **producers.ts** — 28+ producer units, grouped by era
- **upgrades.ts** / **legacyUpgrades.ts** / **architectureUpgrades.ts** — three tiers of upgrades
- **events.ts** — random timed buff/debuff events

### Prestige Systems (two layers)

1. **Refactor** (1M LOC threshold) — resets core producers/upgrades, awards Legacy Tokens; managed by `RefactorButton.tsx`
2. **Great Refactor** (10B+ LOC) — deeper reset that unlocks new producer eras and the Architecture upgrade shop; managed by `GreatRefactorButton.tsx`

### Key Mechanics

- **Technical Debt** — 0–100 meter; certain producers raise it, reducing total production
- **Tech Stack Pivots** — mutually exclusive bonuses (TypeScript/Rust/PHP/Blockchain) via `PivotButton.tsx`
- **Duck Nesting** — ducks store LOC; enabled by the "Nest Protocol" architecture upgrade
- **Random Events** — Slack-style interruptions that apply timed production modifiers

### Layout

`src/App.tsx` sets the master layout:
- Desktop: 3-column (StatsPanel | game center | Shop)
- Mobile: tab-based single-panel

UI components live in `src/components/game/`. Each component subscribes directly to the Zustand store with selector hooks.

### Design Reference

`GAME_CONCEPT.md` is a comprehensive 36KB design document covering all producer stats, upgrade formulas, era descriptions, and achievement lists. Consult it when adding or balancing content.
