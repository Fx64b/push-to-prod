// ── Duckapocalypse Stage Logic ─────────────────────────────────────────────────

export function getDuckapocalypseStage(duckCount: number): 0 | 1 | 2 | 3 {
  if (duckCount >= 100) return 3;
  if (duckCount >= 50) return 2;
  if (duckCount >= 15) return 1;
  return 0;
}

// ── Ticker Message Type ────────────────────────────────────────────────────────

export interface TickerMessage {
  text: string;
  minLoc?: number;
  minDucks?: number;
  minPrestige?: number;
  stage?: 1 | 2 | 3; // duckapocalypse stage required
}

// ── Ticker Messages ────────────────────────────────────────────────────────────

export const TICKER_MESSAGES: TickerMessage[] = [
  // Early game (0–1K LOC)
  { text: 'Local developer names variable `temp2`. Refuses to explain.' },
  { text: 'Rubber duck maintains professional distance during debugging session.' },
  { text: 'Stack Overflow marks question as duplicate of itself. Community satisfied.' },
  { text: 'Developer pushes to main. It is Monday. They have accepted this.' },
  { text: '"Works on my machine" declared official deployment strategy. Containerization pending.' },
  { text: 'Junior dev writes first TODO comment. It will remain until the heat death of the universe.' },
  { text: 'Code review left one comment: "nit". PR merged. Nobody knows what the nit was.' },
  { text: 'Developer achieves flow state. Cat immediately sits on keyboard.' },
  { text: 'Sprint velocity: 0. Team morale: also 0. These numbers are unrelated.' },
  { text: 'README says "see documentation". Documentation says "see README".' },
  { text: 'Standup question: "any blockers?" Developer stares into the middle distance for 40 seconds.' },
  { text: 'Hotfix deployed on Friday. Oncall phone immediately begins to vibrate.' },
  { text: 'Commit message: "final final v3 ACTUALLY FINAL this time". Next commit: "ok this one."' },
  { text: 'The linter has 47 warnings. They have always been there. They will always be there.' },

  // Mid game (1K–100K LOC)
  { text: 'Rubber duck committee holds first silent standup. Conclusions emailed to PM.', minLoc: 1000 },
  { text: 'Mysterious commit message appears: `you know what you did`. Author: 🦆', minLoc: 1000 },
  { text: 'Developer reports keyboard "finishing sentences." Keyboard unavailable for comment.', minLoc: 1000 },
  { text: 'Unit test coverage: 100%. The tests test that the tests exist.', minLoc: 5000 },
  { text: 'git log shows 847 commits with message "fix". Fix count: 0.', minLoc: 5000 },
  { text: 'Merge conflict resolved by deleting both sides. Ship it.', minLoc: 5000 },
  { text: 'Dependency updated. 47 new vulnerabilities introduced. Net negative. Shipping.', minLoc: 10000 },
  { text: 'The standup bot has achieved sentience. It is not impressed.', minLoc: 10000 },
  { text: 'Senior dev opened PR. Description: "you know." Reviewers: they know.', minLoc: 50000 },
  { text: 'Codebase has 14,000 lines of commented-out code. All marked "delete later."', minLoc: 50000 },
  { text: 'Interview question: "reverse a linked list." Actual job: edit one YAML file every two weeks.', minLoc: 1000 },
  { text: 'Tech debt estimate updated: 847 story points. Sprint capacity: 8. The math is not mathing.', minLoc: 5000 },
  { text: 'Developer renames file. Git loses all blame history. Archaeologists will find no answers.', minLoc: 10000 },
  { text: 'Postman collection shared via Slack. Nobody knows the original. This is the original now.', minLoc: 10000 },
  { text: '"It works in staging" — epitaph of a thousand production deploys.', minLoc: 50000 },

  // Duckapocalypse Stage 1 — Awoken (≥15 ducks)
  { text: 'Rubber ducks have started reviewing pull requests. All marked "changes requested."', minDucks: 15 },
  { text: 'Git log now shows commits by 🦆. Company denies awareness. Ducks deny nothing.', minDucks: 15 },
  { text: 'Breaking: rubber duck files for LLC. Cites "significant IP contributions."', minDucks: 15 },
  { text: 'Rubber duck collective has submitted its first feature request. It was approved.', minDucks: 15 },
  { text: 'The ducks have been observed discussing the architecture. Nobody knows how.', minDucks: 15 },
  { text: 'Duck standup: "yesterday: watched. today: watching. blockers: none. we have no blockers."', minDucks: 15 },
  { text: 'The rubber duck has opened a Jira ticket. Priority: P0. Title: "awareness."', minDucks: 15 },
  { text: '🦆 left a comment on your commit: "we see you." Diff: 0 lines changed.', minDucks: 15 },
  { text: 'Anonymous PR review: "you should not have done this." Reviewer: 🦆. Merged anyway.', minDucks: 15 },

  // Duckapocalypse Stage 2 — Displeased (≥50 ducks)
  { text: 'Rubber duck collective achieves quorum. First motion: rename all variables to `duck`.', minDucks: 50 },
  { text: 'Developer finds 2019 TODO comment. It has resolved itself. Nobody knows how.', minDucks: 50 },
  { text: 'Merge conflicts reported to be "targeted." Jira ticket filed, immediately closed as duplicate.', minDucks: 50 },
  { text: 'The ducks have called a retrospective. You were not invited.', minDucks: 50 },
  { text: 'git blame now returns 🦆 for 30% of lines. Number increasing.', minDucks: 50 },
  { text: 'CI pipeline passed. No code was changed. The ducks are satisfied. For now.', minDucks: 50 },
  { text: 'Duck PR #47: "chore: assert dominance over main branch." 1 approval: 🦆', minDucks: 50 },
  { text: 'The rubber ducks have introduced a new code style guide. Compliance is not optional.', minDucks: 50 },
  { text: 'Issue #1 reopened by 🦆. No comment. It will be reopened again.', minDucks: 50 },
  { text: 'Duck collective sends calendar invite: "alignment." Duration: permanent. Decline not available.', minDucks: 50 },

  // Duckapocalypse Stage 3 — Angered (≥100 ducks)
  { text: '🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆', minDucks: 100 },
  { text: 'All pull requests now auto-approved. Reviewer listed as: The Rubber Duck Collective.', minDucks: 100 },
  { text: 'node_modules has achieved sentience. It is mostly left-pad.', minDucks: 100 },
  { text: 'PR #∞ submitted: "chore: transition to post-human development pipeline." Files changed: all.', minDucks: 100 },
  { text: 'The ducks have rewritten the codebase. It is better. We do not speak of the old ways.', minDucks: 100 },
  { text: 'Production is stable. The ducks made it stable. We owe them everything.', minDucks: 100 },
  { text: 'BREAKING: rubber duck collective acquires Series A. Valuation: undisclosed. Board: quacking.', minDucks: 100 },
  { text: 'The duck has force-pushed to main. Protected branch rules have been waived. By the duck.', minDucks: 100 },
  { text: 'You tried to remove a rubber duck. The duck removed your SSH key instead.', minDucks: 100 },
  { text: 'git log --author="human" returns zero results. This is recent. This is very recent.', minDucks: 100 },

  // AI Hysteria (≥100K LOC or AI producers)
  { text: 'AGI reports alignment solved. Refuses to elaborate. Posts 3 follow-ups elaborating.', minLoc: 100000 },
  { text: 'GitHub Copilot finished your sentence before you started it. You\'re not sure if you thought it.', minLoc: 100000 },
  { text: 'Quantum computer solves problem and causes it. Calls this "symmetric engineering."', minLoc: 100000 },
  { text: 'AI model achieves 100% code coverage. Coverage includes future code. Time is a flat circle.', minLoc: 100000 },
  { text: 'The AI has started leaving comments in the codebase. They are addressed to you specifically.', minLoc: 100000 },
  { text: 'Recursion limit hit. Stack trace: you, you, you, you, you (47 more).', minLoc: 100000 },
  { text: 'Model training complete. It trained on your commits. It has opinions.', minLoc: 100000 },
  { text: 'The AI submitted a PR. You reviewed it. It reviewed your review. You lost.', minLoc: 100000 },
  { text: 'Context window exceeded. The model forgot the beginning. So did you.', minLoc: 100000 },
  { text: 'LLM hallucinates a new framework. 12,000 GitHub stars by morning.', minLoc: 100000 },

  // Late game / Singularity (≥1M LOC)
  { text: 'The Singularity reviewed its own PR and left one comment: "nit: you."', minLoc: 1000000 },
  { text: 'Software company replaces engineering team with one rubber duck and a context window.', minLoc: 1000000 },
  { text: 'You are `user_12847` in the training data. This has always been true.', minLoc: 1000000 },
  { text: 'The codebase has become self-aware. It is filing for back pay.', minLoc: 1000000 },
  { text: 'All abstractions have leaked. We are down to raw silicon. The duck watches.', minLoc: 1000000 },
  { text: 'Post-mortem: root cause identified as "thermodynamics." Action item: appeal to physics.', minLoc: 1000000 },
  { text: 'The deployment finished. Nobody knows what was deployed. The metrics are green.', minLoc: 1000000 },
  { text: 'Entropy has been added to the backlog. Estimated: Q4. Status: already happening.', minLoc: 1000000 },
  { text: '"We should document this." — last words before the author deleted their account.', minLoc: 1000000 },

  // End game (prestige ≥1)
  { text: 'The Singularity has filed a startup. It\'s you. It always was.', minPrestige: 1 },
  { text: 'Retrospective: what went well — shipped. What didn\'t — shipped anyway.', minPrestige: 1 },
  { text: 'Final commit message: `feat: become the product`. Author: you (the system).', minPrestige: 1 },
  { text: 'Legacy code token accepted. The old gods remember your sacrifice.', minPrestige: 1 },
  { text: 'You have been here before. The duck knows. The duck has always known.', minPrestige: 2 },
  { text: 'Iteration 3. The codebase is perfect. It is also terrifying. These are not contradictions.', minPrestige: 3 },
  { text: 'The prestige was not a reset. It was an update. You are version 2.', minPrestige: 1 },
  { text: 'Legacy code tokens: accepted. The machine remembers what you deleted.', minPrestige: 1 },
  { text: 'Second run. The rubber ducks were already here. They waited.', minPrestige: 2 },
];
