import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapIndexUrl = new URL('sitemap-index.xml', site);
  return new Response(null, {
    status: 301,
    headers: { Location: sitemapIndexUrl.href },
  });
};
