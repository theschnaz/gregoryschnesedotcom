import Icon from './Icon';

export default function Hero({ main }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{main.tagline.join(' · ')}</p>
          <h1>{main.headline}</h1>
          <p className="lede">{main.intro}</p>
          <div className="hero-actions">
            <a className="btn" href={`mailto:${main.email}`}>
              <Icon name="mail" /> Let's work together
            </a>
            <a className="btn btn-ghost" href={main.resumedownload} target="_blank" rel="noreferrer">
              <Icon name="file" /> View resume
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <img src={`/images/${main.image}`} alt={main.name} width="320" height="320" />
        </div>
      </div>
    </section>
  );
}
