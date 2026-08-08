# Self-managed VPS deployment instead of free static hosting

Status: accepted

jira-clone-ui is a pure static SPA (Vite + React, no backend, no database, no env vars) — a free static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages) would serve it with zero server management and no cost. We're deliberately deploying it to a self-managed $6/mo VPS droplet instead, because the goal is to learn real CI/CD and server-ops mechanics (SSH access, a reverse proxy, deploy scripting, firewalling) using this repo as the practice subject — not just to get the app online. Anyone reading the deploy pipeline and wondering "why isn't this just on Vercel?" — this is why.

The resulting deployment shape, all decided together as one design:

- **Trigger**: GitHub Actions deploys automatically on every push/merge to `main`. Pull requests run a separate required check (lint + build, no deploy).
- **Transport**: the built `dist/` folder is rsync'd/scp'd directly from the GitHub Actions runner to the droplet over SSH — no Docker image or registry, since the artifact is static files with no runtime. Revisit this if a backend project ever joins the same server.
- **Release strategy**: atomic releases — each deploy rsyncs into a fresh timestamped folder (`/srv/<app>/releases/<timestamp>/`), then a `current` symlink is flipped once the sync completes; the web server always serves via `current`. This gives instant rollback (re-point the symlink to a prior release) and avoids a partial-file window during deploy. The deploy script auto-prunes old releases, keeping the last 5, to protect the droplet's disk. Rollback itself is a manual/documented runbook step (SSH in, flip the symlink, reload the web server) — no dedicated rollback workflow, since rollbacks should be rare on a solo learning project.
- **Server access**: a dedicated non-root `deploy` user with SSH-key-only auth (private key stored as a GitHub Actions secret); root SSH login is disabled.
- **Hardening**: `ufw` enabled (default-deny, explicit allows for SSH and the app's exposed port), plus `fail2ban` to block repeated failed SSH attempts.
- **No domain yet**: the app is served off the droplet's bare IP for now. A domain name and Let's Encrypt TLS are a deferred follow-up, not part of this decision.
- **Multi-app routing**: the droplet is intended to host more than one project over time, but since there's no domain yet to route by Host header, each app gets its own port (e.g. this app on `:8081`) rather than reverse-proxy path-based routing today. Path-based routing was rejected because this app's client-side router (`react-router`) would need `basename` configuration to work under a subpath, for no real benefit before a domain exists. Domain-based reverse-proxy routing is the intended migration path once a real domain is added.
- **Toolchain reproducibility**: `.nvmrc` pins Node 20 LTS (the repo previously had no `engines`/`.nvmrc` at all); the GitHub Actions workflow reads it via `actions/setup-node`'s `node-version-file` so CI and local dev can't drift apart.
- **Failure visibility**: GitHub's default workflow-failure notification (UI/email) is relied on; no Slack/Discord webhook. Revisit if this becomes a team project.

See ADR-0002 for the choice of nginx over Caddy as the web/reverse-proxy server.
