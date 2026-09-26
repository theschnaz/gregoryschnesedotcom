import YieldAndBounty from './YieldAndBounty';
import MetricsInMetrics from './MetricsInMetrics';
import AbTesting from './AbTesting';

export const series = {
  name: 'Market like Schnese',
  description: 'A series of growth marketing lessons: the modern standard for SaaS growth and marketing.',
};

export const articles = [
  {
    slug: 'yields-and-bounties',
    lesson: 1,
    title: 'Yield and Bounty',
    subtitle: 'The Framework for Paid SaaS Growth',
    summary:
      "Focus on events higher in your funnel when you don't generate enough of the events you want to directly influence.",
    Body: YieldAndBounty,
  },
  {
    slug: 'metrics-in-metrics',
    lesson: 2,
    title: 'Metrics in Metrics',
    subtitle: 'Find the Winning Segments Within',
    summary: 'Your metrics are the sum of their parts. Find the best parts and focus on them.',
    Body: MetricsInMetrics,
  },
  {
    slug: 'how-to-run-a-proper-ab-test',
    lesson: 3,
    title: 'How to Run a Proper A/B Test',
    subtitle: 'Sample sizes, significance, and picking tests worth running',
    summary: 'Tests are hard and people are bad at them. Learn how to be better at running A/B tests.',
    Body: AbTesting,
  },
];
