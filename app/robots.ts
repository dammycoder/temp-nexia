import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helper';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/careers',
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}