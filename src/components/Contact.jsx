import Icon from './Icon';

export default function Contact({ main }) {
  return (
    <section id="contact" className="contact">
      <div className="container contact-inner">
        <p className="eyebrow">Contact</p>
        <h2>Let's grow something together.</h2>
        <p className="lede">
          Looking for help with growth, paid acquisition, or the code that connects them? I'd love to hear from you.
        </p>
        <div className="hero-actions">
          <a className="btn" href={`mailto:${main.email}`}>
            <Icon name="mail" /> {main.email}
          </a>
          <a className="btn btn-ghost" href={main.resumedownload} target="_blank" rel="noreferrer">
            <Icon name="file" /> View resume
          </a>
        </div>
      </div>
    </section>
  );
}
