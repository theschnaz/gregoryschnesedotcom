import Icon from './Icon';

export default function Footer({ main }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {main.name}
        </p>
        <ul className="social">
          {main.social.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
