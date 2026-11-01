import { site } from '@/site';

export const personId = `${site.url}/#person`;

/** schema.org Person. Every fact here must also be visible on the site. */
export function person() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    image: `${site.url}/gregory-schnese.jpg`,
    email: `mailto:${site.email}`,
    description: site.description,
    jobTitle: site.jobTitle,
    worksFor: { '@type': 'Organization', name: site.employer.name, url: site.employer.url },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'New York University' },
      { '@type': 'CollegeOrUniversity', name: 'University of Wisconsin–Milwaukee' },
    ],
    knowsAbout: [
      'Demand generation',
      'B2B SaaS growth',
      'Paid acquisition',
      'Conversion rate optimization',
      'Marketing attribution',
      'A/B testing',
      'React Native',
      'Bitcoin',
    ],
    sameAs: site.social.map((s) => s.url),
  };
}

/** Google's documented ProfilePage markup with Person as mainEntity. */
export function profilePage(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: new URL(path, site.url).href,
    dateModified: new Date().toISOString(),
    mainEntity: person(),
  };
}

export function article(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    author: { '@id': personId, '@type': 'Person', name: site.name, url: site.url },
  };
}
