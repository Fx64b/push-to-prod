# push to prod

> Every great codebase started with a single keystroke.

An incremental idle clicker game with a developer theme. Click the ENTER key to write Lines of Code (LOC), buy producers to automate output, and purchase upgrades to scale production. Random events, achievements, and a prestige system keep things interesting.

## Gameplay

- Click the ENTER key (or hold it) to generate LOC
- Buy producers — from a Rubber Duck to AGI — that generate LOC/s automatically
- Unlock upgrades that multiply click value or producer output
- Survive random Slack-style events that buff or nerf production
- Prestige via "Refactor" at 1M LOC to earn Legacy Code Tokens for permanent bonuses

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (custom GitHub dark palette)
- Zustand with `persist` middleware for localStorage save/load
- Radix UI primitives for tooltips and tabs

## Development

```bash
pnpm install
pnpm dev
```

Runs at `http://localhost:5173`. No backend, no accounts — all state lives in `localStorage`.


## Contributing

Feel free to create and issue or PR to fix a bug or add a feature.

If you want to change something regarding the game concept (new upgrades, different functionality), please first open an issue with a description instead of implementing it.