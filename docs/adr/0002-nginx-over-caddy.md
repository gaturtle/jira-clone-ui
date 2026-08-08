# nginx over Caddy as the deployment web server

Status: accepted

Given the self-managed VPS deployment in ADR-0001, we need a web server on the droplet to serve the static build (and later act as a reverse proxy once a domain exists). We chose **nginx** over **Caddy**, even though Caddy's automatic Let's Encrypt TLS would have been a more convenient fit for the "add a domain later" plan and required less config. The deciding factor is that the underlying goal is learning transferable server-ops skills: nginx is the far more common server encountered in tutorials, job postings, and other projects, so the config and mental model built here carry over elsewhere, whereas Caddy's convenience is comparatively narrow. TLS setup will require a manual step (e.g. Certbot) when a domain is eventually added, instead of Caddy's zero-config automatic HTTPS — that's an accepted cost of this choice.
