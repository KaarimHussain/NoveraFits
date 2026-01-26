import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/account/', // Private routes usually disallowed
        },
        sitemap: 'https://noverafits.com/sitemap.xml',
    };
}
