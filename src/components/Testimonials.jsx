import Section from './Section';

// Renders only when resume.json has real testimonials in it.
export default function Testimonials({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <Section id="testimonials" kicker="Kind words" title="What people I've worked with say.">
      <ul className="quote-grid">
        {items.map((t) => (
          <li key={t.name}>
            <blockquote className="quote">
              <p>“{t.text}”</p>
              <footer>
                <strong>{t.name}</strong>
                {t.role && <span className="muted">{t.role}</span>}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </Section>
  );
}
