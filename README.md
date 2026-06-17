This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment on Netlify (bydt-official.netlify.app)

The site is configured for static export:
- `next.config.ts` sets `output: 'export'` and unoptimized images.
- `netlify.toml` sets build command `npm run build` and publish directory `out`. Strong security + long-term cache headers for images.

To deploy reliably:
1. Commit + push text/config changes to `main` on GitHub (HonorYourExperiences/bydt).
2. Netlify auto-deploys from GitHub. 
3. **Critical for first/new visual updates**: After pushing, in Netlify UI run "Clear cache and deploy site" (this ensures new blueprint/paper/gold styles and image paths are live).
4. **Images (binaries)**: The jpg/png hero + og files in `public/images/` must be uploaded manually to the GitHub repo via web UI (drag to public/images) because GitHub MCP pushes focus on text. Once committed, they deploy with the site. Local dev + builds use them immediately.

Visual language is now deeply embedded: cream paper bg + texture, aerospace navy, gold signal lines, blueprint traces on sections/cards, proof-artifact styling on Visual World section, hand-drawn accents.

Current live: https://bydt-official.netlify.app/

Autonomous improvement loop runs until no measurable gains in fidelity, consistency, or deploy robustness.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
