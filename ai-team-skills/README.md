# AI Team Skills — Setup Guide

This folder contains the full AI Team skill system for AndriWulandika.uk's Claude-powered services. It is stored here (tracked in git) instead of in `.claude/` because this repo's `.gitignore` excludes `.claude/` — anything written only there would be lost when a session ends.

## What's in here

- `CLAUDE.md` — project-level documentation & skill registry
- `skills/` — 7 custom skills (as Markdown instruction files):
  - `ai-team-coordinator.md` — master orchestrator
  - `service-router.md` — routes client requests to the right specialist
  - `content-generator.md` — writing services (proposals, articles, docs)
  - `social-media-manager.md` — content planning, captions, scheduling
  - `compliance-checker.md` — government document validation
  - `qa-reviewer.md` — quality assurance before delivery
  - `project-tracker.md` — project status & timeline tracking
  - `prompt-engineer.md` — designs/improves the other agents' prompts

## How to activate these on your machine

Claude Code (CLI/desktop) reads project skills from `.claude/skills/` and project docs from `.claude/CLAUDE.md`. To activate:

```bash
# From the repo root, on your local machine:
mkdir -p .claude/skills
cp ai-team-skills/CLAUDE.md .claude/CLAUDE.md
cp ai-team-skills/skills/*.md .claude/skills/
```

Since `.claude/` is gitignored, this copy step is a one-time local setup per machine/clone — re-run it after a fresh `git clone`. If you edit a skill going forward, edit the copy under `ai-team-skills/` and re-run the copy (or edit both) so changes survive in version control.

## Using a skill

Once copied into `.claude/skills/`, invoke any skill in a Claude Code session with:

```
/ai-team-coordinator
/service-router
/content-generator
/social-media-manager
/compliance-checker
/qa-reviewer
/project-tracker
/prompt-engineer
```

Each skill file documents its own usage patterns and examples — open the `.md` file directly to read the full instructions Claude follows when that skill is invoked.

## Note on the Gemini-suggested MCP server / claude_desktop_config.json setup

A separate request asked for auto-detecting the local OS, writing to `claude_desktop_config.json`, running `npm install`, etc. That requires access to your local filesystem and terminal — this session runs in an isolated remote container with no access to your computer, so none of those steps could be executed here. If you want a local MCP server (for Excel/Word file generation, SQL queries, etc.) built and wired into Claude Desktop, that needs to be done in a Claude Code session running directly on your machine, using this folder's skill definitions as the specification for what each tool should do.
