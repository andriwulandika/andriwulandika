# andriwulandika

Static site repo with two Cloudflare Pages projects:

- `site/` — main site
- `tools/` — planning/reporting tools for Indonesian local government (Renstra,
  Renja, LKjIP, etc.), including Cloudflare Pages Functions under
  `tools/functions/`

No build step; `package.json` only carries `sharp` as a dev dependency for
image generation scripts.

## Ponytail

This repo enables the [Ponytail](https://github.com/DietrichGebert/ponytail)
plugin at project scope via `.claude/settings.json` (`extraKnownMarketplaces`
+ `enabledPlugins`). It keeps Claude on the smallest solution that actually
works: reuse before writing, stdlib/native features before a dependency, one
line before a component.

Opening this repo in Claude Code prompts you once to install the marketplace
and trust the plugin. After that it's always on (default mode: `full`) — no
extra setup.

Commands:

- `/ponytail [lite|full|ultra|off]` — change intensity
- `/ponytail-review [target]` — flag over-engineering in a diff
- `/ponytail-audit [target]` — scan for existing code bloat
- `/ponytail-debt` — list deferred simplifications
- `/ponytail-help` — full command reference

Say "stop ponytail" or "normal mode" to turn it off for a session.
