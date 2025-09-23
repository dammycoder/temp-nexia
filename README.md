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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Strapi Setup

Set the following environment variables in a `.env.local` file:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# Optional if using a public API token for content
NEXT_PUBLIC_STRAPI_TOKEN=
# Or use a server-only token instead of NEXT_PUBLIC_STRAPI_TOKEN
# STRAPI_TOKEN=
```

### Helpers available

- `lib/strapi.ts` exports `strapiFetch` which prefixes the base URL, adds the Authorization header if a token is provided or present in env, serializes `query` via `qs`, and normalizes errors.
- `lib/fetch.ts` exports `fetchData(url, authToken?, { query, headers })` which supports relative Strapi paths and flattens attributes using your existing utility.

### Usage examples

Client/server safe fetch with `strapiFetch`:

```ts
import { strapiFetch, buildPopulateAll } from "@/lib/strapi";

type Article = { title: string; slug: string };

export async function getArticles() {
  return strapiFetch<{ data: { id: number; attributes: Article }[] }>(
    "/api/articles",
    { query: buildPopulateAll(2) }
  );
}
```

Using `fetchData` with a relative path and query:

```ts
import { fetchData } from "@/lib/fetch";

export async function getHomepage() {
  return fetchData("/api/homepage", undefined, {
    query: { populate: { blocks: { populate: "deep" } } },
  });
}
```
