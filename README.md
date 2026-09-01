# ZodOps

Personal site for a security architect: long-form notes on DevOps, containers, DSPM/DLP, and cloud security.

This is a static Next.js site. You can run it on your laptop, host it on **GitLab Pages** with the domain you already bought, or publish it to Vercel. There is no database and no login.

## Run it locally

You need Node.js 22+.

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). Edit a file, save, and the page reloads.

To serve the production static build (the same files GitLab Pages publishes):

```bash
npm run build
npm start
```

## Where to edit

| What you want to change | File |
| --- | --- |
| Name, email, LinkedIn, location | `src/lib/site.ts` |
| Articles and topics | `src/lib/content.ts` |
| Home page layout | `src/app/page.tsx` |
| Header / footer | `src/components/site-header.tsx`, `src/components/site-footer.tsx` |
| Colors and type | `src/app/globals.css` |

Add a new article by appending an object to `articles` in `src/lib/content.ts`. The writing index, topic pages, and article URLs update from that list.

## Host on GitLab Pages (with your domain)

Yes — that is what this repo is set up for. GitLab Pages serves the static files produced by `npm run build`. `.gitlab-ci.yml` already defines the `pages` job.

1. Create a new project on GitLab and push this repository.
2. Wait for the pipeline on the default branch (`main`). When it is green, GitLab publishes the site.
3. The first URL looks like `https://<group>.gitlab.io/<project>/`.
4. Attach the domain you already purchased:
   - GitLab → **Settings → Pages → New domain** → enter `zodops.com` (or whatever you bought).
   - GitLab shows the DNS records to create. Typical cases:
     - **Apex domain** (`zodops.com`): `A` / `AAAA` records to GitLab Pages, or a `CNAME`/`ALIAS` if your DNS host supports it.
     - **www**: `CNAME` to `namespace.gitlab.io`.
   - After DNS propagates, GitLab issues a Let’s Encrypt certificate. Turn on **Force HTTPS**.

If the GitLab URL includes a project path (`/zodops/`) and you are **not** using a custom domain yet, set `basePath` in `next.config.ts` to that path so assets load. With a custom domain pointed at Pages, leave `basePath` empty (the current default).

### Custom domain vs project path

| Setup | `next.config.ts` |
| --- | --- |
| Custom domain (`https://zodops.com`) | no `basePath` (default here) |
| Project Pages URL only (`https://group.gitlab.io/repo`) | `basePath: "/repo"` |

## Host on Vercel

This app is a standard Next.js project, so Vercel works too. Import the repo, keep the defaults, and add the same custom domain under Vercel → Project → Settings → Domains. Either Pages or Vercel is enough; you do not need both.

## Build output

```bash
npm run build
```

Static files land in `out/`. Any static host (S3, Cloudflare Pages, nginx) can serve that folder. GitLab CI moves `out/` to `public/` because Pages expects that name.

## Contact form

The contact page opens a `mailto:` draft to the address in `src/lib/site.ts`. A static host cannot send email by itself. If you want the form to post without a mail client, plug in [Formspree](https://formspree.io) or a similar endpoint later.
