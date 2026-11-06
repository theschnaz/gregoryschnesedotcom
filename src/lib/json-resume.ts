/** JSON Resume (https://jsonresume.org/schema) built from src/data/resume.ts. */
import { certifications, education, experience, profileSummary, projects, skills } from '@/data/resume';
import { site } from '@/site';

const MONTHS: Record<string, string> = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
const isoMonth = (s: string) => {
  const m = s.trim().match(/^([A-Z][a-z]{2}) (\d{4})$/);
  if (m) return `${m[2]}-${MONTHS[m[1]]}`;
  const y = s.trim().match(/^(\d{4})$/);
  return y ? y[1] : undefined;
};
const range = (period: string) => {
  const [start, end] = period.split(/\s+[–-]\s+/);
  return { startDate: isoMonth(start ?? ''), endDate: end && !/present/i.test(end) ? isoMonth(end) : undefined };
};
const abs = (p: string) => new URL(p, site.url).href;
const companyUrls: Record<string, string> = { FMX: site.employer.url, Fleetio: 'https://www.fleetio.com' };

export function jsonResume() {
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: site.name,
      label: `${site.jobTitle}, ${site.employer.name}`,
      image: abs('/gregory-schnese.jpg'),
      email: site.email,
      url: site.url,
      summary: profileSummary,
      profiles: site.social.map((s) => ({
        network: s.name,
        username: s.url.replace(/\/$/, '').split('/').pop(),
        url: s.url,
      })),
    },
    work: experience.map((j) => ({
      name: j.company.replace(/ Inc\.$/, ''),
      position: j.title,
      location: j.location,
      ...(companyUrls[j.company] ? { url: companyUrls[j.company] } : {}),
      ...range(j.period),
      summary: j.bullets[0],
      highlights: j.bullets,
    })),
    education: education.map((e) => ({
      institution: e.school,
      studyType: e.degree.split(' in ')[0],
      area: e.degree.split(' in ')[1],
      ...(e.period ? range(e.period) : {}),
    })),
    certificates: certifications.map((c) => ({ name: c.name, issuer: c.issuer, date: c.date })),
    skills: skills.map((name) => ({ name })),
    projects: projects.map((p) => ({
      name: p.name,
      description: p.description,
      roles: [p.role],
      ...range(p.period),
      url: p.href.startsWith('http') ? p.href : abs(p.href),
    })),
    meta: { canonical: abs('/resume.json'), version: 'v1.0.0', lastModified: new Date().toISOString() },
  };
}
