/** Structured resume. Rendered at /resume (indexable HTML) and summarized on /about. */
export const profileSummary =
  'Technical growth leader with 15+ years of experience building and guiding teams to significant results, highlighted by a 10x inbound ARR increase at Fleetio. Skilled in data-driven strategy and in executing the technical work myself.';

export const experience = [
  {
    company: 'FMX',
    title: 'Director of Demand Generation',
    period: '2025 – present',
    location: 'Remote',
    bullets: [
      // TODO(greg): add FMX outcomes once they're shareable.
      'Lead demand generation for a B2B SaaS facilities and maintenance management platform.',
    ],
  },
  {
    company: 'Fleetio',
    title: 'Demand Generation, Senior Manager',
    period: 'Apr 2018 – Sep 2025',
    location: 'Birmingham, AL (Remote)',
    caseStudy: '/work/fleetio',
    bullets: [
      'Doubled the trial-to-paid conversion rate for a B2B SaaS product, significantly improving user activation and long-term value.',
      'Managed a paid acquisition budget of over $4M/year to deliver 10x inbound ARR growth, running and optimizing multichannel campaigns, including SEO content targeting high-intent segments.',
      'Hired and led a cross-functional growth team of product managers, developers, designers and engineers to ideate, prototype and scale growth initiatives.',
    ],
  },
  {
    company: 'CoPromote Inc.',
    title: 'Head of Marketing (Growth)',
    period: 'Sep 2013 – Mar 2018',
    location: 'New York, NY (Remote)',
    caseStudy: '/work/copromote',
    bullets: [
      'Built and led the marketing and growth team, owning acquisition, activation, conversion and retention for 700K+ members.',
      'Integrated growth experiments into product roadmaps with engineering and design; managed a $1M+ paid acquisition budget, optimizing with SQL and BI tools.',
      'Designed product features, ran cohort analysis to improve engagement and LTV, and implemented SEO, producing a 4x increase in member base and SaaS revenue.',
    ],
  },
  {
    company: 'kikin Inc.',
    title: 'Product Manager',
    period: 'Jul 2009 – Sep 2013',
    location: 'New York, NY',
    caseStudy: '/work/kikin',
    bullets: [
      'Led user acquisition and growth marketing, using LTV/cohort analysis and retention experiments in Google Analytics and SQL to scale to 2M+ monthly active users for a desktop browser plugin.',
      'Drove 50K+ installs on a $28K budget, reaching top-25 and top-10 App Store rankings for kikin Browser for iPad through a targeted pre-launch campaign.',
      'Built analytics infrastructure (Excel, PHP, PostgreSQL) for growth metrics and automated reporting; generated 5K+ pre-launch email signups.',
    ],
  },
];

export const projects = [
  {
    name: 'Day: The Dailyness App',
    role: 'Founder',
    period: '2021 – present',
    href: '/projects/day',
    description: 'React Native app that promotes daily practice and rewards users with Bitcoin.',
  },
  {
    name: 'Bitcoin, Borrow, Die',
    role: 'Founder',
    period: 'Dec 2024 – present',
    href: '/projects/bitcoin-borrow-die',
    description: 'Financial modeling tool and weekly newsletter simulating a wealth strategy that uses Bitcoin as collateral.',
  },
  {
    name: 'margin-watch',
    role: 'Founder',
    period: '2025 – present',
    href: '/projects/margin-watch',
    description: 'Loan-to-value monitoring and alerts for Bitcoin-backed loans.',
  },
];

export const education = [
  {
    school: 'New York University',
    degree: 'Master of Science in Management and Systems',
    detail: "Dean's Graduate Fellowship Scholarship",
    period: '2004 – 2007',
  },
  {
    school: 'University of Wisconsin–Milwaukee',
    degree: 'Bachelor of Science in Information Resources',
    period: '2004',
  },
];

export const certifications = [
  { name: 'Google Ads Certification', issuer: 'Google', date: '2024' },
  { name: 'Certified Associate in Project Management (CAPM)', issuer: 'Project Management Institute', date: '2007' },
];

export const skills = [
  'Demand generation',
  'Paid acquisition (search, social, review sites)',
  'Attribution & measurement',
  'Experimentation / A/B testing',
  'Lifecycle & trial conversion',
  'SEO & content',
  'SQL & BI',
  'React / React Native',
  'Building with AI coding agents',
];
