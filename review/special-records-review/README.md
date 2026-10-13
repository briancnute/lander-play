# Mercury Special records design trial

Two interactive alternatives, using fictional completed runs only; no saves or production UI are changed.

- A: game tabs, Present Day difficulty buttons, one compact stats table.
- B: all four top threes grouped by game, with Stats opening the same detail view.
- Both: postcard entry selects its game/difficulty, More stats, all scores, empty state and simulated Close/reopen.
- Present Day supports Easy/Medium/Hard; Bombardment has no difficulty. Data labels follow current mercuryDusk.ts saved metrics. Scores remain separate by game/difficulty, with gold score bests and green metric bests.

Recommendation to trial: A for fast repeat visits; B for destination-level browsing. Cross-planet editing and failure history are outside this focused mockup; no production decision or save migration is implied.

Checked Chromium and WebKit at 1180×760, 390×844, 320×640 and 568×320: both options, game/difficulty switching, more stats, history, caller selection, empty state, Close/reopen and overflow. Inspected desktop and phone captures. Static self-contained HTML; game build and physics suite are not applicable.

Published independently at https://briancnute.github.io/lander-play/review/special-records-review/ .
