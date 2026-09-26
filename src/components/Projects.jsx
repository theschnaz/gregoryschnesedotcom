import Section from './Section';

export default function Projects({ projects }) {
  return (
    <Section id="projects" kicker="Projects & Talks" title="Things I've built and presented.">
      <ul className="project-grid">
        {projects.map((p) => (
          <li key={p.title}>
            <a className="project-card" href={p.url} target="_blank" rel="noreferrer">
              <div className="project-image">
                <img src={`/images/portfolio/${p.image}`} alt="" loading="lazy" />
              </div>
              <div className="project-body">
                <span className="project-type">{p.type}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
