import Section from './Section';

export default function Experience({ work, education, resume }) {
  return (
    <Section id="experience" kicker="Experience" title="Where I've done the work.">
      <ol className="timeline">
        {work.map((job) => (
          <li key={job.company} className="timeline-item">
            <div className="timeline-meta">
              {job.years && <span className="timeline-years">{job.years}</span>}
            </div>
            <div className="timeline-body">
              <h3>
                {job.company}
                {job.title && <span className="timeline-title"> · {job.title}</span>}
              </h3>
              <ul>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="education">
        <h3 className="subhead">Education</h3>
        <ul className="education-list">
          {education.map((ed) => (
            <li key={ed.school}>
              <strong>{ed.school}</strong>
              <span>{ed.degree}</span>
              <span className="muted">{ed.graduated}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="section-cta">
        <a className="text-link" href={resume} target="_blank" rel="noreferrer">
          View the full resume →
        </a>
      </p>
    </Section>
  );
}
