---
description: Sync unsynced entries from lessons-learned.md to the brain wiki.
---

Sync this project's `lessons-learned.md` to the brain vault at `~/All Claude/brain`.

This project's wiki page: `wiki/projects/hansmyrhytta.md`.

## Steps

1. Read `lessons-learned.md` in this project's root. Find entries under Technical / Process / Tool that start with `[ ]`. If there are none, stop and tell the user there's nothing to sync.

2. Read `~/All Claude/brain/CLAUDE.md` and `~/All Claude/brain/wiki/index.md` to refresh wiki conventions and the current page list.

3. For each unsynced lesson, decide where it belongs:
   - **Existing page covers it** (concept, tool, or this project's page) → update that page. Add this project's `lessons-learned.md` to `sources:` if appropriate.
   - **Transferable, standalone** → create `wiki/lessons/<slug>.md` per the page schema in `~/All Claude/brain/CLAUDE.md`.
   - **Project-specific only** → fold into `wiki/projects/hansmyrhytta.md` under Decisions / Open threads / Recent work.
   Always cross-link with `[[wikilinks]]` where it strengthens the graph.

4. Bump `updated:` to today on `wiki/projects/hansmyrhytta.md` and on any other wiki page touched.

5. Append a section to `~/All Claude/brain/log.md` with today's date listing what was synced and which pages were created or updated.

6. Refresh `~/All Claude/brain/hot.md` with a short note about the sync.

7. In this project's `lessons-learned.md`, flip each synced entry from `[ ]` to `[x]` (preserve the entry text — only change the marker).

8. From `~/All Claude/brain`, run `git add -A && git commit -m "wiki: sync lessons from hansmyrhytta"`.

## Don'ts

- Never modify files in `~/All Claude/brain/raw/` — that layer is immutable.
- Don't edit `[x]` entries in `lessons-learned.md`. Only flip `[ ]` → `[x]`.
- Don't commit changes in this project's repo — that's the user's call.
- Don't push the wiki to a remote unless the user explicitly asks.
