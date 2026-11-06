import { site } from '@/site';
import { certifications, education, skills } from '@/data/resume';

export const personId = `${site.url}/#person`;

/**
 * schema.org Person. Every fact here must also be visible on the site
 * (home, about, resume, facts). Rich, specific entity data helps search
 * engines and AI assistants tie these facts to the right person.
 */
export function person() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    givenName: 'Gregory',
    familyName: 'Schnese',
    alternateName: [site.shortName, 'theschnaz'],
    url: site.url,
    mainEntityOfPage: `${site.url}/about`,
    image: `${site.url}/gregory-schnese.jpg`,
    email: `mailto:${site.email}`,
    description: site.description,
    disambiguatingDescription: `${site.descriptor}: ${site.jobTitle} at ${site.employer.name}; previously Fleetio, CoPromote and kikin.`,
    jobTitle: site.jobTitle,
    worksFor: { '@type': 'Organization', name: site.employer.name, url: site.employer.url },
    hasOccupation: {
      '@type': 'Occupation',
      name: site.jobTitle,
      occupationalCategory: '11-2021.00 Marketing Managers',
      skills: skills.join(', '),
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'New York University', url: 'https://www.nyu.edu' },
      { '@type': 'CollegeOrUniversity', name: 'University of Wisconsin–Milwaukee', url: 'https://uwm.edu' },
    ],
    hasCredential: [
      ...education.map((e) => ({
        '@type': 'EducationalOccupationalCredential',
        name: e.degree,
        credentialCategory: 'degree',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: e.school },
      })),
      ...certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        dateCreated: c.date,
      })),
    ],
    knowsAbout: [
      'Demand generation',
      'B2B SaaS growth',
      'Paid acquisition',
      'Account-based marketing',
      'Lifecycle marketing',
      'Conversion rate optimization',
      'Marketing attribution',
      'A/B testing',
      'Growth team leadership',
      'React',
      'React Native',
      'Bitcoin',
    ],
    sameAs: site.social.map((s) => s.url),
  };
}

/** FAQPage for /facts. Answers are plain text and match the visible page. */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
    about: { '@id': personId },
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

/** VideoObject for the intro video (og:video on home and about). */
export function introVideo() {
  const v = site.introVideo;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${site.name} — intro`,
    description: site.description,
    thumbnailUrl: new URL(v.poster, site.url).href,
    contentUrl: new URL(v.mp4, site.url).href,
    uploadDate: '2026-11-01',
    duration: 'PT8S',
    width: v.width,
    height: v.height,
    author: { '@id': personId },
  };
}
