import { Link } from 'react-router-dom';
import Section from './Section';
import { articles, series } from '../articles';

export default function Writing() {
  return (
    <Section id="writing" kicker="Writing" title={series.name} intro={series.description}>
      <ol className="lesson-grid">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link className="lesson-card" to={`/${a.slug}`}>
              <span className="lesson-number">Lesson {a.lesson}</span>
              <h3>{a.title}</h3>
              <p className="lesson-subtitle">{a.subtitle}</p>
              <p className="lesson-summary">{a.summary}</p>
              <span className="lesson-read">Read lesson →</span>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
