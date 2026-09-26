import Section from './Section';

export default function About({ main, skills }) {
  return (
    <Section id="about" kicker="About" title="Data, code, and a little bit of poker.">
      <div className="about-grid">
        <div className="about-copy">
          {main.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <aside className="poker-card">
            <span className="poker-suit" aria-hidden="true">♠</span>
            <p>{main.poker}</p>
          </aside>
        </div>
        <div className="skills">
          {skills.map((group) => (
            <div key={group.group} className="skill-group">
              <h3>{group.group}</h3>
              <ul className="tags">
                {group.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
