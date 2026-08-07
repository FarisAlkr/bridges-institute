# Pointing bridges-eng.com at the new site

The client's old WordPress site. Moving it is safe, but the order matters.

## What we checked first

|                |                                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| Nameservers    | `ns1/2/3.wordpress.com` — DNS is managed at WordPress.com                               |
| A records      | `192.0.78.x` — WordPress.com hosting                                                    |
| **MX records** | **none** — _no email on this domain_, so nothing to break                               |
| Indexed URLs   | 6 (`/`, `/about/`, `/schools/`, `/contact-partnership/`, `/apply-now/`, `/contribute/`) |

The missing MX is the important one. Repointing a domain that carries email silently
kills the mail; this one carries none, so the move is low-risk.

## Recommended: 301 redirect, not a second copy of the site

Redirect `bridges-eng.com` → `bridges-institute.com` rather than serving the site on
both. A permanent redirect passes the old domain's search history and backlinks to the
new domain; serving both splits them between two addresses instead.

## Steps

1. **Back up the WordPress site first.** WordPress.com → Tools → Export. Once DNS moves
   the old site is off the web, and the export is the only copy of that content.
2. **Confirm with the client** that the WordPress site is meant to disappear, and check
   whether he is still paying for that hosting — it can be cancelled afterwards. Keep the
   domain _registration_ either way, or the address is lost.
3. **Add the domain in Vercel**: `vercel domains add bridges-eng.com bridges-institute`
   (and `www.bridges-eng.com`).
4. **In WordPress.com DNS**, replace the A records with Vercel's (`vercel domains inspect`
   prints the current value — do not copy it from memory).
   _Cleaner alternative:_ move the nameservers to Cloudflare, alongside
   bridges-institute.com, so both domains are managed in one place.
5. **In Vercel → Settings → Domains**, set `bridges-eng.com` to **Redirect to
   bridges-institute.com**, with the path preserved.
6. **Legacy paths are already handled** in `vercel.json`: `/apply-now` → `/teach` and
   `/contact-partnership` → `/contact`. `/about`, `/schools` and `/contribute` match the
   new site already.

## Afterwards

- `bridges-eng.com/apply-now/` should land on `bridges-institute.com/teach`.
- Keep the redirect permanently. Deleting it later strands every old link.
- `SITE_URL` stays `bridges-institute.com` — it is the canonical domain and does not change.
