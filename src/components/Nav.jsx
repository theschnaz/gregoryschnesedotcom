import { useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#writing', label: 'Writing' },
  { href: '#projects', label: 'Projects & Talks' },
];

export default function Nav({ name, email }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#top" onClick={close}>
          {name}
        </a>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="nav-links" className={open ? 'nav-links open' : 'nav-links'}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-small" href={`mailto:${email}`} onClick={close}>
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
