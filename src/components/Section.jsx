export default function Section({ id, kicker, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <div className="section-head">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2>{title}</h2>
          {intro && <p className="section-intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
