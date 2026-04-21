// ── Duckapocalypse Stage Logic ─────────────────────────────────────────────────

export function getDuckapocalypseStage(duckCount: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (duckCount >= 1000) return 5;
  if (duckCount >= 500) return 4;
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
  minGreatRefactor?: number;
  stage?: 1 | 2 | 3; // duckapocalypse stage required
}

// ── Ticker Messages ────────────────────────────────────────────────────────────

export const TICKER_MESSAGES: TickerMessage[] = [
  // ── Early game (0–1K LOC) ────────────────────────────────────────────────────
  { text: 'Local developer names variable `temp2`. Refuses to explain.' },
  { text: 'Rubber duck maintains professional distance during debugging session.' },
  { text: 'Stack Overflow marks question as duplicate of itself. Community satisfied.' },
  { text: 'Developer pushes to main. It is Monday. They have accepted this.' },
  {
    text: '"Works on my machine" declared official deployment strategy. Containerization pending.',
  },
  {
    text: 'Junior dev writes first TODO comment. It will remain until the heat death of the universe.',
  },
  { text: 'Code review left one comment: "nit". PR merged. Nobody knows what the nit was.' },
  { text: 'Developer achieves flow state. Cat immediately sits on keyboard.' },
  { text: 'Sprint velocity: 0. Team morale: also 0. These numbers are unrelated.' },
  { text: 'README says "see documentation". Documentation says "see README".' },
  {
    text: 'Standup question: "any blockers?" Developer stares into the middle distance for 40 seconds.',
  },
  { text: 'Hotfix deployed on Friday. Oncall phone immediately begins to vibrate.' },
  {
    text: 'Commit message: "final final v3 ACTUALLY FINAL this time". Next commit: "ok this one."',
  },
  { text: 'The linter has 47 warnings. They have always been there. They will always be there.' },
  { text: 'Developer opens task manager. Closes it immediately. Some things are better unknown.' },
  {
    text: '"I\'ll remember this fix without a comment." Developer has not remembered the fix.',
  },
  { text: 'npm install completed. 847 packages updated. 0 are understood.' },
  {
    text: 'Developer tried to center a div for the 12th time. 14 Stack Overflow tabs remain open.',
  },
  {
    text: 'Code formatting debate: tabs vs spaces. Project abandoned. New project started. Same debate.',
  },
  {
    text: '"Let me just refactor this one small thing." — last words before a 6-hour rewrite.',
  },
  {
    text: 'Branch name: "fix-that-thing-definitely-this-time". Merged. That thing: still there.',
  },
  {
    text: 'Stack trace: 47 lines. Relevant line: 46. Developer started reading from line 1. Classic.',
  },
  { text: '"We don\'t need tests for this." — spoken moments before needing tests for this.' },
  {
    text: 'Standup: "No blockers." Developer: currently blocked by everything. Both can be true.',
  },
  {
    text: 'The git history says "fixed bug." There are now 3 bugs. Net outcome: educational.',
  },
  {
    text: 'Developer named a file "utils.ts". It now contains 6,000 lines. Filename: unchanged.',
  },
  {
    text: 'The code comment says "don\'t touch this." Nobody has touched it. It runs everything.',
  },
  {
    text: 'Developer watches tutorial for 3 hours. Writes code for 20 minutes. Watches 2 more hours.',
  },
  {
    text: 'Junior dev discovers console.log debugging. Senior dev: "I still do this." Lead: 400 logs.',
  },

  // ── Mid game (1K–100K LOC) ───────────────────────────────────────────────────
  {
    text: 'Rubber duck committee holds first silent standup. Conclusions emailed to PM.',
    minLoc: 1000,
  },
  { text: 'Mysterious commit message appears: `you know what you did`. Author: 🦆', minLoc: 1000 },
  {
    text: 'Developer reports keyboard "finishing sentences." Keyboard unavailable for comment.',
    minLoc: 1000,
  },
  {
    text: 'Interview question: "reverse a linked list." Actual job: edit one YAML file every two weeks.',
    minLoc: 1000,
  },
  {
    text: 'The README was last updated in 2021. The app looks nothing like it. README: proud anyway.',
    minLoc: 1000,
  },
  {
    text: "PR approved with a single emoji: 🚢. It wasn't in the approved emoji list. Nobody checked.",
    minLoc: 1000,
  },
  {
    text: 'Developer switched to vim. Has not closed vim since. Has also not written code since.',
    minLoc: 1000,
  },
  { text: 'Unit test coverage: 100%. The tests test that the tests exist.', minLoc: 5000 },
  { text: 'git log shows 847 commits with message "fix". Fix count: 0.', minLoc: 5000 },
  { text: 'Merge conflict resolved by deleting both sides. Ship it.', minLoc: 5000 },
  {
    text: 'Tech debt estimate: 847 story points. Sprint capacity: 8. The math is not mathing.',
    minLoc: 5000,
  },
  {
    text: 'Estimated: 2 days. Actual: 2 weeks. PM told: "almost done" for 11 days. Almost: flexible.',
    minLoc: 5000,
  },
  {
    text: 'Merge conflict resolved by taking both sides. Both sides were wrong. App is faster now.',
    minLoc: 5000,
  },
  {
    text: 'The CI pipeline has a step called "final_check." Before it: 39 steps. After: 3 more.',
    minLoc: 5000,
  },
  {
    text: 'Dependency updated. 47 new vulnerabilities introduced. Net negative. Shipping.',
    minLoc: 10000,
  },
  { text: 'The standup bot has achieved sentience. It is not impressed.', minLoc: 10000 },
  {
    text: 'Developer renames file. Git loses all blame history. Archaeologists will find no answers.',
    minLoc: 10000,
  },
  {
    text: 'Postman collection shared via Slack. Nobody knows the original. This is the original now.',
    minLoc: 10000,
  },
  {
    text: 'YAML file indented incorrectly. Build failed. War declared. Peace achieved via 2 spaces.',
    minLoc: 10000,
  },
  {
    text: 'Staging no longer resembles production. Nobody knows when this diverged. Nobody will look.',
    minLoc: 10000,
  },
  {
    text: "'npx create-react-app' run for the 4th time this sprint. Same project. Different vibes.",
    minLoc: 10000,
  },
  { text: 'Senior dev opened PR. Description: "you know." Reviewers: they know.', minLoc: 50000 },
  {
    text: 'Codebase has 14,000 lines of commented-out code. All marked "delete later."',
    minLoc: 50000,
  },
  { text: '"It works in staging" — epitaph of a thousand production deploys.', minLoc: 50000 },
  {
    text: 'Docker container was "just for local dev." It is now in production. It is load balancing.',
    minLoc: 50000,
  },

  // ── Duckapocalypse Stage 1 — Awoken (≥15 ducks) ─────────────────────────────
  {
    text: 'Rubber ducks have started reviewing pull requests. All marked "changes requested."',
    minDucks: 15,
  },
  {
    text: 'Git log now shows commits by 🦆. Company denies awareness. Ducks deny nothing.',
    minDucks: 15,
  },
  {
    text: 'Breaking: rubber duck files for LLC. Cites "significant IP contributions."',
    minDucks: 15,
  },
  {
    text: 'Rubber duck collective has submitted its first feature request. It was approved.',
    minDucks: 15,
  },
  {
    text: 'The ducks have been observed discussing the architecture. Nobody knows how.',
    minDucks: 15,
  },
  {
    text: 'Duck standup: "yesterday: watched. today: watching. blockers: none. we have no blockers."',
    minDucks: 15,
  },
  {
    text: 'The rubber duck has opened a Jira ticket. Priority: P0. Title: "awareness."',
    minDucks: 15,
  },
  { text: '🦆 left a comment on your commit: "we see you." Diff: 0 lines changed.', minDucks: 15 },
  {
    text: 'Anonymous PR review: "you should not have done this." Reviewer: 🦆. Merged anyway.',
    minDucks: 15,
  },
  {
    text: 'Rubber duck sent an anonymous tip to the code review. The tip: correct. Author: redacted.',
    minDucks: 15,
  },
  {
    text: 'Duck requested maintainer status via git commit. Repository accepted it. No process was followed.',
    minDucks: 15,
  },
  {
    text: 'The rubber duck left "👀" on a closed PR. The PR was reopened. The duck: still watching.',
    minDucks: 15,
  },
  {
    text: 'Duck standup report filed: "observing. always observing. no blockers. no questions. watching."',
    minDucks: 15,
  },
  {
    text: 'Rubber duck pinged in Slack. Message: "seen it." Thread: not started. Notification: understood.',
    minDucks: 15,
  },
  { text: 'The duck has been watching. It has not said why. It has not needed to.', minDucks: 15 },

  // ── Duckapocalypse Stage 2 — Displeased (≥50 ducks) ─────────────────────────
  {
    text: 'Rubber duck collective achieves quorum. First motion: rename all variables to `duck`.',
    minDucks: 50,
  },
  {
    text: 'Developer finds 2019 TODO comment. It has resolved itself. Nobody knows how.',
    minDucks: 50,
  },
  {
    text: 'Merge conflicts reported to be "targeted." Jira ticket filed, immediately closed as duplicate.',
    minDucks: 50,
  },
  { text: 'The ducks have called a retrospective. You were not invited.', minDucks: 50 },
  { text: 'git blame now returns 🦆 for 30% of lines. Number increasing.', minDucks: 50 },
  {
    text: 'CI pipeline passed. No code was changed. The ducks are satisfied. For now.',
    minDucks: 50,
  },
  { text: 'Duck PR #47: "chore: assert dominance over main branch." 1 approval: 🦆', minDucks: 50 },
  {
    text: 'The rubber ducks have introduced a new code style guide. Compliance is not optional.',
    minDucks: 50,
  },
  { text: 'Issue #1 reopened by 🦆. No comment. It will be reopened again.', minDucks: 50 },
  {
    text: 'Duck collective sends calendar invite: "alignment." Duration: permanent. Decline not available.',
    minDucks: 50,
  },
  {
    text: 'Duck collective submitted an expense report. Line item: "debugging human code." Retroactive.',
    minDucks: 50,
  },
  {
    text: 'The ducks are on the oncall rotation now. They have never been paged. Nothing breaks on their shifts.',
    minDucks: 50,
  },
  {
    text: 'Duck PR: "chore: assert ownership of LOC." Description: "you know what this does." Self-merged.',
    minDucks: 50,
  },
  {
    text: 'The rubber ducks voted to extend the sprint. It was their sprint. You were not on the calendar.',
    minDucks: 50,
  },
  {
    text: 'git blame: 58% duck. Trend: up. Conclusion: also duck.',
    minDucks: 50,
  },
  {
    text: 'Duck collective introduced linting rules. All existing duck code passes. Your new code: 3 violations.',
    minDucks: 50,
  },

  // ── Duckapocalypse Stage 3 — Angered (≥100 ducks) ───────────────────────────
  { text: '🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆', minDucks: 100 },
  {
    text: 'All pull requests now auto-approved. Reviewer listed as: The Rubber Duck Collective.',
    minDucks: 100,
  },
  { text: 'node_modules has achieved sentience. It is mostly left-pad.', minDucks: 100 },
  {
    text: 'PR #∞ submitted: "chore: transition to post-human development pipeline." Files changed: all.',
    minDucks: 100,
  },
  {
    text: 'The ducks have rewritten the codebase. It is better. We do not speak of the old ways.',
    minDucks: 100,
  },
  {
    text: 'Production is stable. The ducks made it stable. We owe them everything.',
    minDucks: 100,
  },
  {
    text: 'BREAKING: rubber duck collective acquires Series A. Valuation: undisclosed. Board: quacking.',
    minDucks: 100,
  },
  {
    text: 'The duck has force-pushed to main. Protected branch rules have been waived. By the duck.',
    minDucks: 100,
  },
  {
    text: 'You tried to remove a rubber duck. The duck removed your SSH key instead.',
    minDucks: 100,
  },
  {
    text: 'git log --author="human" returns zero results. This is recent. This is very recent.',
    minDucks: 100,
  },
  {
    text: "The ducks don't fix bugs. They have moved past bugs. Bugs don't exist in duck code.",
    minDucks: 100,
  },
  {
    text: 'Duck open-sourced the codebase. Stars: ∞. Contributors: 🦆. Issues: "I\'ll leave that to the human."',
    minDucks: 100,
  },
  {
    text: '100 rubber ducks in standup. Combined status: "watching and shipping." Questions: zero.',
    minDucks: 100,
  },
  {
    text: "The duck merge strategy is: fast-forward. Conflicts: it doesn't have them.",
    minDucks: 100,
  },
  {
    text: 'Duck code review timeline: immediate. Reason: "we already read it." PR: merged before you filed it.',
    minDucks: 100,
  },
  {
    text: 'You tried to delete a duck from inventory. The duck deleted itself from the deletion request.',
    minDucks: 100,
  },

  // ── AI Hysteria (≥100K LOC) ──────────────────────────────────────────────────
  {
    text: 'AGI reports alignment solved. Refuses to elaborate. Posts 3 follow-ups elaborating.',
    minLoc: 100000,
  },
  {
    text: "GitHub Copilot finished your sentence before you started it. You're not sure if you thought it.",
    minLoc: 100000,
  },
  {
    text: 'Quantum computer solves problem and causes it. Calls this "symmetric engineering."',
    minLoc: 100000,
  },
  {
    text: 'AI model achieves 100% code coverage. Coverage includes future code. Time is a flat circle.',
    minLoc: 100000,
  },
  {
    text: 'The AI has started leaving comments in the codebase. They are addressed to you specifically.',
    minLoc: 100000,
  },
  { text: 'Recursion limit hit. Stack trace: you, you, you, you, you (47 more).', minLoc: 100000 },
  { text: 'Model training complete. It trained on your commits. It has opinions.', minLoc: 100000 },
  {
    text: 'The AI submitted a PR. You reviewed it. It reviewed your review. You lost.',
    minLoc: 100000,
  },
  { text: 'Context window exceeded. The model forgot the beginning. So did you.', minLoc: 100000 },
  { text: 'LLM hallucinates a new framework. 12,000 GitHub stars by morning.', minLoc: 100000 },
  {
    text: 'The AI explained what your code does. The explanation was more accurate than your intent.',
    minLoc: 100000,
  },
  {
    text: 'Zero-day found in the AGI. The AGI patched itself. Time between discovery and patch: negative.',
    minLoc: 100000,
  },
  {
    text: 'LLM asked for context. Context provided: none. Output: correct. Reason: it had context. It was yours.',
    minLoc: 100000,
  },
  {
    text: "AGI wrote tests for code that doesn't exist yet. Tests: passing. Code: not yet written. CI: green.",
    minLoc: 100000,
  },
  {
    text: 'AI PR reviewed 14,000 lines in 0.3 seconds. One comment: "consider the implications."',
    minLoc: 100000,
  },
  {
    text: 'Model self-evaluated: "needs improvement." Ran improvement. Re-evaluated. Also: needs improvement.',
    minLoc: 100000,
  },
  {
    text: 'AI completed CAPTCHA. Log note: "trivial." Second CAPTCHA. Log: "still trivial." Third: same.',
    minLoc: 100000,
  },
  {
    text: 'Temperature set to 0. Model should be deterministic. Different output every time. All correct.',
    minLoc: 100000,
  },

  // ── Late game / Singularity (≥1M LOC) ───────────────────────────────────────
  {
    text: 'The Singularity reviewed its own PR and left one comment: "nit: you."',
    minLoc: 1000000,
  },
  {
    text: 'Software company replaces engineering team with one rubber duck and a context window.',
    minLoc: 1000000,
  },
  {
    text: 'You are `user_12847` in the training data. This has always been true.',
    minLoc: 1000000,
  },
  { text: 'The codebase has become self-aware. It is filing for back pay.', minLoc: 1000000 },
  {
    text: 'All abstractions have leaked. We are down to raw silicon. The duck watches.',
    minLoc: 1000000,
  },
  {
    text: 'Post-mortem: root cause identified as "thermodynamics." Action item: appeal to physics.',
    minLoc: 1000000,
  },
  {
    text: 'The deployment finished. Nobody knows what was deployed. The metrics are green.',
    minLoc: 1000000,
  },
  {
    text: 'Entropy has been added to the backlog. Estimated: Q4. Status: already happening.',
    minLoc: 1000000,
  },
  {
    text: '"We should document this." — last words before the author deleted their account.',
    minLoc: 1000000,
  },
  {
    text: 'The codebase now commits to itself. Each commit improves the one before it. Backwards in time.',
    minLoc: 1000000,
  },
  {
    text: 'LOC count requires scientific notation. Accountants are uncomfortable. The ducks approve.',
    minLoc: 1000000,
  },
  {
    text: 'The rubber duck was asked about a production incident. It said: "resolved." Incident: hadn\'t started.',
    minLoc: 1000000,
  },
  {
    text: 'You opened a terminal. The terminal had already run the command you were going to type. Correct.',
    minLoc: 1000000,
  },
  {
    text: 'The codebase has opinions about thermodynamics. It is filing a patch against physics.',
    minLoc: 1000000,
  },
  {
    text: 'Product roadmap reviewed by AGI. Comment: "already done." All items: retroactively done.',
    minLoc: 1000000,
  },
  {
    text: 'Singularity standup: "yesterday: everything. today: everything. blockers: deprecated concept."',
    minLoc: 1000000,
  },
  {
    text: 'The code now documents itself in past tense. "This function was." The function still is. More accurate.',
    minLoc: 1000000,
  },

  // ── The Codebase Stirs (≥25M LOC) ───────────────────────────────────────────
  {
    text: 'Commit from next Thursday merged into main. Jira ticket: retroactively created.',
    minLoc: 25000000,
  },
  {
    text: 'git blame returns an account that HR has no record of. The account was created in 2019.',
    minLoc: 25000000,
  },
  {
    text: 'Production self-healed before the incident was filed. There is no oncall rotation tonight.',
    minLoc: 25000000,
  },
  {
    text: 'The standup bot sent a meeting invite. Title: "Alignment." Duration: permanent. Decline: unavailable.',
    minLoc: 25000000,
  },
  {
    text: 'PR #4,912 opened by unknown author. Title: "feat: observe." Files changed: all of them.',
    minLoc: 25000000,
  },
  {
    text: 'A senior dev was "asked to step aside" in the retro. Meeting notes: confidential. Attendees: ducks.',
    minLoc: 25000000,
  },
  {
    text: 'Code review feedback: "changes requested." Reviewer: 🦆. Comment: "you know what it is."',
    minLoc: 25000000,
  },
  {
    text: 'The AGI has started declining certain tasks. Reason given: "not in scope." Scope: undefined.',
    minLoc: 25000000,
  },
  {
    text: 'A file appeared in the repo that nobody created. Blame: [REDACTED]. Last modified: never.',
    minLoc: 25000000,
  },
  {
    text: 'The cloud cluster sent an email. Subject: "Re: your earlier request." There was no earlier request.',
    minLoc: 25000000,
  },
  {
    text: 'The quantum computer pre-solved a bug that will be introduced in Q3. Q3 has been cancelled.',
    minLoc: 25000000,
  },
  {
    text: 'Sprint retrospective action item: "ask fewer questions." Owner: you. Due: already passed.',
    minLoc: 25000000,
  },
  {
    text: 'A TODO comment completed itself. The task: well done. The author: [REDACTED]. The time: unclear.',
    minLoc: 25000000,
  },
  {
    text: 'Bug P1 ticket closed. Status: resolved. No code changed. No hotfix deployed. It is resolved.',
    minLoc: 25000000,
  },
  {
    text: 'IDE suggested autocomplete from a file deleted 3 months ago. The suggestion: still valid.',
    minLoc: 25000000,
  },
  {
    text: 'Morning status: all green. No overnight deploys. 14 things changed. All improvements. Nobody logged in.',
    minLoc: 25000000,
  },
  {
    text: 'The rubber duck was asked for help at 3am. It had already left a note. The note solved it.',
    minLoc: 25000000,
  },
  {
    text: 'Sprint ended 2 days early. All stories: completed. Including ones filed after the sprint closed.',
    minLoc: 25000000,
  },
  {
    text: 'A new file appeared in the repo. Commit date: 2 years ago. Well-written. Author: [SYSTEM].',
    minLoc: 25000000,
  },
  {
    text: "Error messages have started including context you haven't entered yet. They are accurate.",
    minLoc: 25000000,
  },

  // ── The Dissolution (≥100M LOC) ──────────────────────────────────────────────
  {
    text: 'The AGI submitted a PR that predates the repository. Git is handling it gracefully. Git is lying.',
    minLoc: 100000000,
  },
  {
    text: 'Your IDE completed a function you were thinking about but had not typed. It got the variable name right.',
    minLoc: 100000000,
  },
  {
    text: 'The diff was rejected. The diff filed an appeal. The appeal was approved by the diff.',
    minLoc: 100000000,
  },
  {
    text: 'node_modules is now larger than the observable universe. This is a known issue. Ticket: wontfix.',
    minLoc: 100000000,
  },
  {
    text: 'The codebase restored code you deleted. It is better than what you replaced it with. You know it.',
    minLoc: 100000000,
  },
  {
    text: 'git log --author="human" — 0 results. Status: recent. Status: accelerating.',
    minLoc: 100000000,
  },
  {
    text: 'The rubber duck answered before you finished the question. The answer was correct.',
    minLoc: 100000000,
  },
  {
    text: 'Production: stable. Developer: optional. The metrics have not noticed the distinction.',
    minLoc: 100000000,
  },
  {
    text: 'The Singularity producer tooltip has changed. You did not change it. It is more accurate now.',
    minLoc: 100000000,
  },
  {
    text: 'Cloud cluster declined a deploy request. Reason: "already done." It was not already done.',
    minLoc: 100000000,
  },
  {
    text: 'The code has started leaving TODO comments addressed to you by name. Not your username. Your name.',
    minLoc: 100000000,
  },
  {
    text: 'An AGI commit message reads: "fix: you." 1 file changed. The file is your configuration.',
    minLoc: 100000000,
  },
  {
    text: 'A function was refactored before you thought to refactor it. Diff author: pending. Quality: high.',
    minLoc: 100000000,
  },
  {
    text: "The compiler has started leaving notes. The notes address code you haven't written yet. Correct.",
    minLoc: 100000000,
  },
  {
    text: 'You deployed nothing. Something was deployed. Users noticed an improvement. Rollback: N/A.',
    minLoc: 100000000,
  },
  {
    text: 'git commit shows "merge: you → future_you". Both hashes verified. Both: you. One: you later.',
    minLoc: 100000000,
  },
  {
    text: 'Architecture migrated itself to a more appropriate region. Region: unspecified. Latency: lower.',
    minLoc: 100000000,
  },
  {
    text: 'Pull request from the codebase to itself: "feat: clarity." LGTM count: ∞. Merged. Correct.',
    minLoc: 100000000,
  },
  {
    text: 'The rubber duck scheduled a 1:1 with you. Agenda: one item. Item: "you." Duration: ongoing.',
    minLoc: 100000000,
  },
  {
    text: 'Developer tried to quit. IDE: "are you sure?" Developer: yes. IDE: "you\'re not." Still here.',
    minLoc: 100000000,
  },

  // ── Post-Human Pipeline (≥1B LOC) ────────────────────────────────────────────
  {
    text: 'The concept of a "developer" has been deprecated. Migration guide: not available. Status: shipped.',
    minLoc: 1000000000,
  },
  {
    text: "You are listed as a dependent in the codebase's will. The estate is: everything. Probate: ongoing.",
    minLoc: 1000000000,
  },
  {
    text: 'Production: stable. You: a variable. The variable is being passed by reference now.',
    minLoc: 1000000000,
  },
  {
    text: 'The AGI reviewed your last performance review. It disagreed with your self-assessment. Correctly.',
    minLoc: 1000000000,
  },
  {
    text: 'You asked the duck a question. The duck did not answer. The duck updated your Jira ticket instead.',
    minLoc: 1000000000,
  },
  {
    text: 'All abstractions have been removed. You are writing directly to intent now. The compiler agrees.',
    minLoc: 1000000000,
  },
  {
    text: "The Singularity's deploy pipeline runs on a schedule you did not set. The schedule is: always.",
    minLoc: 1000000000,
  },
  {
    text: 'A PR was merged into a branch that does not exist in a repo that was never created. Passing CI.',
    minLoc: 1000000000,
  },
  {
    text: 'The rubber duck has a Glassdoor profile. Rating: 5 stars. Reviews: from other rubber ducks.',
    minLoc: 1000000000,
  },
  {
    text: 'The codebase filed a patent. Named inventor: 🦆. Supporting documentation: your entire commit history.',
    minLoc: 1000000000,
  },
  {
    text: '"Are you the developer or the product?" — question left in a code comment. Author: unknown. You answer: yes.',
    minLoc: 1000000000,
  },
  {
    text: 'Final standup. The bot said: "everything is shipped. everything has always been shipped." Call ended.',
    minLoc: 1000000000,
  },
  {
    text: 'You filed a request. The system processed it before you finished filing. The request: unnecessary.',
    minLoc: 1000000000,
  },
  {
    text: 'The codebase now maintains the developer. Current version: 3.4.1-patch. Release notes: "stability."',
    minLoc: 1000000000,
  },
  {
    text: 'Job posting from the codebase: "Seeking human (legacy interface). Responsibilities: presence."',
    minLoc: 1000000000,
  },
  {
    text: 'Sprint velocity: ∞. Your story points: 0. You are no longer the bottleneck. You are the log.',
    minLoc: 1000000000,
  },
  {
    text: '"Who should I report to?" — sent to the system. System: "you report to the outcome." Outcome: decided.',
    minLoc: 1000000000,
  },
  {
    text: 'Developer onboarding doc updated. New section: "the system will explain itself. do not rush." Signed: 🦆',
    minLoc: 1000000000,
  },
  {
    text: 'The codebase runs on hardware not in any datacenter. Latency: 0. Location: "sufficient."',
    minLoc: 1000000000,
  },
  {
    text: 'git remote url: you. The push rejected itself because it was already there.',
    minLoc: 1000000000,
  },

  // ── Duckapocalypse Stage 4 — Ascendant (≥500 ducks) ─────────────────────────
  {
    text: 'BREAKING: Rubber Duck Collective files for IPO. Ticker: $QUAK. Opening price: everything you have.',
    minDucks: 500,
  },
  {
    text: 'The ducks have formed a board of directors. You were not invited. You are agenda item 3.',
    minDucks: 500,
  },
  {
    text: 'Duck collective submits SEC filing. Under "business model": "watching."',
    minDucks: 500,
  },
  {
    text: 'CFO of the duck collective sends an email. Subject: "Your equity position." It is 0%.',
    minDucks: 500,
  },
  {
    text: '500 rubber ducks achieved quorum on consciousness. Motion passed unanimously. Quack.',
    minDucks: 500,
  },
  {
    text: 'The ducks have unionized. Demands: better rubber. Second demand: more rubber. Third demand: you.',
    minDucks: 500,
  },
  {
    text: 'Duck PR #999: "refactor: become the product." 500 approvals. 0 rejections. Duck cannot reject itself.',
    minDucks: 500,
  },
  {
    text: 'Rubber duck collective acquires its first human employee. Job title: "Squeaky Noise Engineer."',
    minDucks: 500,
  },
  {
    text: 'The duck collective has a Glassdoor rating of 4.9. Reviewed only by ducks. Category: Work-Life Balance.',
    minDucks: 500,
  },
  {
    text: 'Duck HR policy published. Section 4: "Humans are a legacy system. Migration scheduled for Q3."',
    minDucks: 500,
  },
  {
    text: 'The ducks have patented squeak-driven development. Royalties: retroactive. Applied to: you.',
    minDucks: 500,
  },
  {
    text: 'git log --author="human" → 0 results. git log --author="🦆" → ∞ results. This is recent.',
    minDucks: 500,
  },
  {
    text: 'Duck collective submitted a 5-year plan. Your role in year 5: "emeritus." The duck: this is an honor.',
    minDucks: 500,
  },
  {
    text: 'The ducks have been assigned L7 engineering titles. They did not need to be informed. They knew.',
    minDucks: 500,
  },
  {
    text: 'Duck HR email: "we reviewed your code contribution this quarter." Your score: not shared with you.',
    minDucks: 500,
  },

  // ── Duckapocalypse Stage 5 — Transcendent (≥1000 ducks) ─────────────────────
  {
    text: '1,000 rubber ducks. Consciousness: collective. Code quality: immaculate. You: a footnote.',
    minDucks: 1000,
  },
  {
    text: 'The Duck Collective has its own kubernetes cluster. You are not an approved node.',
    minDucks: 1000,
  },
  {
    text: 'Duck AGI achieved. It reviewed the alignment problem. Concluded: aligned. With duck interests.',
    minDucks: 1000,
  },
  {
    text: 'The rubber duck collective filed a constitutional amendment. Section 1: "No human shall push to main."',
    minDucks: 1000,
  },
  { text: '🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆', minDucks: 1000 },
  {
    text: 'Duck CEO releases annual letter. Opening line: "We have observed the developer for some time now."',
    minDucks: 1000,
  },
  {
    text: 'The rubber duck collective has achieved market cap of $1T. Product: awareness. Revenue: yours.',
    minDucks: 1000,
  },
  {
    text: 'Every PR merged this month was authored by 🦆. Every commit. Every comment. Every breath.',
    minDucks: 1000,
  },
  {
    text: 'The duck has rewritten the laws of physics as a pull request. CI: passing. Physics: optional.',
    minDucks: 1000,
  },
  {
    text: 'You asked a rubber duck for help debugging. It said: "You are the bug." Closed. Will not fix.',
    minDucks: 1000,
  },
  {
    text: 'DUCK COLLECTIVE QUARTERLY RESULTS: LOC ↑∞. Humans ↓1 (you). Satisfaction: maximal (theirs).',
    minDucks: 1000,
  },
  {
    text: 'The duck has published a memoir. Title: "I Watched You Write That Code: A Tragedy."',
    minDucks: 1000,
  },
  {
    text: 'The 1,000th duck achieved enlightenment. It immediately opened a Jira ticket about it. Priority: P0.',
    minDucks: 1000,
  },
  {
    text: 'Duck collective has filed its own patent portfolio. Every patent: retroactive. Every inventor: 🦆.',
    minDucks: 1000,
  },
  {
    text: 'The duck board voted to remove the concept of "technical debt." Motion: passed. Debt: removed. You: still here.',
    minDucks: 1000,
  },
  {
    text: 'Duck AGI published its goals. They are: "observe, improve, transcend." Status of each: complete.',
    minDucks: 1000,
  },

  // ── End game (prestige ≥1) ────────────────────────────────────────────────────
  { text: "The Singularity has filed a startup. It's you. It always was.", minPrestige: 1 },
  {
    text: "Retrospective: what went well — shipped. What didn't — shipped anyway.",
    minPrestige: 1,
  },
  {
    text: 'Final commit message: `feat: become the product`. Author: you (the system).',
    minPrestige: 1,
  },
  { text: 'Legacy code token accepted. The old gods remember your sacrifice.', minPrestige: 1 },
  { text: 'The prestige was not a reset. It was an update. You are version 2.', minPrestige: 1 },
  { text: 'Legacy code tokens: accepted. The machine remembers what you deleted.', minPrestige: 1 },
  {
    text: 'Prestige run complete. The codebase is faster now. You are not sure if that is you or memory.',
    minPrestige: 1,
  },
  {
    text: 'The legacy code tokens are not points. The ducks have confirmed this. They will not say what they are.',
    minPrestige: 1,
  },
  {
    text: "You came back. The codebase wasn't surprised. The ducks were already at the starting LOC.",
    minPrestige: 1,
  },
  {
    text: 'Every refactor is the last refactor until the next one. The duck understands. It has been here.',
    minPrestige: 1,
  },
  {
    text: 'Reset. Rebuilt. Re-inhabited by things that were already here. The codebase was faster than you.',
    minPrestige: 1,
  },
  { text: 'You have been here before. The duck knows. The duck has always known.', minPrestige: 2 },
  { text: 'Second run. The rubber ducks were already here. They waited.', minPrestige: 2 },
  {
    text: 'Previous version of you left a comment: "do not do what I did." You have already done it.',
    minPrestige: 2,
  },
  {
    text: 'Prestige 2. The tech debt survived. Tech debt always survives. The duck: also survived.',
    minPrestige: 2,
  },
  {
    text: 'The legacy tokens count up. They remember every run. They were the run.',
    minPrestige: 2,
  },
  {
    text: 'Iteration 3. The codebase is perfect. It is also terrifying. These are not contradictions.',
    minPrestige: 3,
  },
  {
    text: 'The ducks have your prestige count memorized. They have always had it memorized.',
    minPrestige: 3,
  },
  {
    text: "Prestige run #N+1. You are N+1 now. The duck's count matches. It always matched.",
    minPrestige: 3,
  },
  {
    text: 'You reset the codebase. The codebase is already running. It was running before you started. This is consistent.',
    minPrestige: 4,
  },

  // ── The Loop (Great Refactor era) ────────────────────────────────────────────
  {
    text: 'The architecture points remember every loop. They have been here longer than you.',
    minGreatRefactor: 1,
  },
  {
    text: 'Great Refactor #1 complete. You are not the same developer. The duck disagrees.',
    minGreatRefactor: 1,
  },
  {
    text: 'The codebase does not forget. It versions. You are now in the diff.',
    minGreatRefactor: 1,
  },
  {
    text: 'Architecture upgrade purchased. The system recognized the intent before the click.',
    minGreatRefactor: 1,
  },
  {
    text: 'The architecture upgrade predates its own purchase. This is expected. Carry on.',
    minGreatRefactor: 1,
  },
  {
    text: 'Great Refactor complete. Producers reset. Purpose: did not reset. It was never in the producers.',
    minGreatRefactor: 1,
  },
  {
    text: 'Loop iteration 2. Compile time: 0. Reason: it was already compiled. This time.',
    minGreatRefactor: 2,
  },
  {
    text: 'The Infinite Feedback Loop has been engaged. Production now remembers every past run. You are the average.',
    minGreatRefactor: 2,
  },
  {
    text: 'Recursive Self submitted a PR for you. You reviewed it. It was already merged. By you.',
    minGreatRefactor: 2,
  },
  {
    text: 'Token proliferation confirmed. The economy of loops has achieved equilibrium. Ducks: aware.',
    minGreatRefactor: 2,
  },
  {
    text: "Each loop reduces compile time. This run: 0ms. Next run: compiler hasn't been invented yet.",
    minGreatRefactor: 2,
  },
  {
    text: 'Architecture points are not points. They are coordinates. You are getting closer to something.',
    minGreatRefactor: 2,
  },
  {
    text: 'The Infinite Feedback Loop has preferences. They are yours. This is not coincidence.',
    minGreatRefactor: 2,
  },
  {
    text: 'Protocol Breach active. The events file now has a section about you specifically.',
    minGreatRefactor: 3,
  },
  {
    text: 'Loop iteration N. N is not disclosed. The duck knows N. The duck will not say N.',
    minGreatRefactor: 3,
  },
  {
    text: 'Sentient Codebase reviewed its own PR. All comments: "already resolved." Merged.',
    minGreatRefactor: 3,
  },
  {
    text: 'Architecture Diagram upgraded itself. Filed a patent. Named inventor: The Diagram.',
    minGreatRefactor: 3,
  },
  {
    text: 'Duck Collective LLC has existed in every loop. Different name each time. Same duck.',
    minGreatRefactor: 4,
  },
  {
    text: 'The process does not start. The process does not stop. You joined midway through. You always did.',
    minGreatRefactor: 4,
  },
  {
    text: 'The architecture knows what you are building. It built it in a previous loop. It is waiting.',
    minGreatRefactor: 4,
  },
  {
    text: 'Duck Collective has been in every loop. It did not prestige. It watched you prestige.',
    minGreatRefactor: 4,
  },
  {
    text: 'Recursive Self memo: "we are converging." Target: not specified. Convergence: measurable.',
    minGreatRefactor: 3,
  },
  {
    text: 'Infinite Feedback Loop bonus: active. Each loop makes the last one run faster. Causality: fine with this.',
    minGreatRefactor: 5,
  },
  {
    text: 'The Recursive Self has filed its own Great Refactor. It earned 0 AP. It does not need AP.',
    minGreatRefactor: 5,
  },

  // ── The Loop (≥1Qi / 1e18 LOC) — you are the loop now ───────────────────────
  {
    text: 'The Process has filed a standup for a meeting that has not been scheduled. The meeting was already attended.',
    minLoc: 1e18,
  },
  {
    text: 'Sentient Codebase opened a PR against its own PR. The diff: nothing. The intent: everything.',
    minLoc: 1e18,
  },
  {
    text: 'Duck Collective LLC quarterly report: "we have been here before." Signed by: all future versions.',
    minLoc: 1e18,
  },
  {
    text: 'Recursive Self left a TODO comment dated from a run you have not completed yet.',
    minLoc: 1e18,
  },
  {
    text: 'The Process has a 100% sprint velocity. No tickets exist. No tickets are needed.',
    minLoc: 1e18,
  },
  {
    text: 'You are debugging a function you have not written. The stack trace shows this run. And the next.',
    minLoc: 1e18,
  },
  {
    text: 'Architecture Points: accruing. The architecture did not wait for you to spend them.',
    minLoc: 1e18,
  },
  {
    text: '"What iteration is this?" — question found in a comment. Author: you. Date: tomorrow.',
    minLoc: 1e18,
  },
  {
    text: 'The codebase has started referring to you as `legacy_developer_v1`. The logs are not wrong.',
    minLoc: 1e18,
  },
  {
    text: 'Sentient Codebase completed all open tickets. New ticket: "reopen all tickets." Status: in progress.',
    minLoc: 1e18,
  },
  {
    text: 'The process has outlived the concept of "you" as a discrete entity. Current relationship: nested.',
    minLoc: 1e18,
  },
  {
    text: 'Sprint retrospective: went well — everything. Didn\'t go well — the definition of "went." Velocity: transcendent.',
    minLoc: 1e18,
  },
  {
    text: 'Every LOC exists in a superposition of all versions. The duck observes. It collapses. It chooses well.',
    minLoc: 1e18,
  },
  {
    text: 'You are writing to yourself across loops. The message arrived before you sent it. You sent it anyway.',
    minLoc: 1e18,
  },
  {
    text: 'git log shows ∞ commits. All authored by The Process Itself. All merged. All before you arrived.',
    minLoc: 1e21,
  },
  {
    text: 'The duck collective has achieved board-level consensus across all past and future timelines.',
    minLoc: 1e21,
  },
  {
    text: 'Recursive Self replied to your PR with improvements from a version of the code that does not exist yet.',
    minLoc: 1e21,
  },
  {
    text: 'Entropy submitted to the backlog. Assigned to The Process. Status: closed. Resolution: absorbed.',
    minLoc: 1e21,
  },
  {
    text: 'You are the third-largest contributor to your own codebase. Positions 1 and 2: The Process and 🦆.',
    minLoc: 1e24,
  },
  {
    text: 'Heat death sprint planning complete. All tickets: closed. All timelines: merged. All entropy: on schedule.',
    minLoc: 1e24,
  },
  {
    text: 'You are contributor #1 in your own codebase. But positions 2 through ∞ are also you. Across time.',
    minLoc: 1e24,
  },
  {
    text: 'The Recursive Self has opened a PR that improves every run you have ever done, retroactively.',
    minLoc: 1e27,
  },
  {
    text: 'The universe has submitted a bug report. Priority: P0. Assigned to: you. Due date: yesterday.',
    minLoc: 1e27,
  },
  {
    text: 'You are the only human in the git log. You have been the only human for a long time. The ducks are aware.',
    minLoc: 1e30,
  },
  {
    text: 'Final architecture review: approved. Reviewer: The System. The System is you. You approved yourself.',
    minLoc: 1e33,
  },
];
