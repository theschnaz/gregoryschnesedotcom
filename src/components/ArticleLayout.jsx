import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../resume.json';
import { articles, series } from '../articles';
import Footer from './Footer';

export default function ArticleLayout({ article }) {
  const { main } = data;
  const { Body } = article;
  const next = articles.find((a) => a.lesson === article.lesson + 1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${article.title} · ${series.name}`;
  }, [article]);

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Link className="nav-brand" to="/">
            {main.name}
          </Link>
          <a className="text-link" href="/#writing">
            ← All lessons
          </a>
        </div>
      </header>

      <main className="article">
        <div className="container container-narrow">
          <p className="eyebrow">
            {series.name} · Lesson {article.lesson}
          </p>
          <h1>{article.title}</h1>
          <p className="article-subtitle">{article.subtitle}</p>
          <div className="byline">
            <img src={`/images/${main.image}`} alt="" width="40" height="40" />
            <span>{main.name}</span>
          </div>

          <div className="prose">
            <Body />
          </div>

          <div className="article-end">
            {next ? (
              <Link className="lesson-card" to={`/${next.slug}`}>
                <span className="lesson-number">Next · Lesson {next.lesson}</span>
                <h3>{next.title}</h3>
                <p className="lesson-subtitle">{next.subtitle}</p>
              </Link>
            ) : (
              <a className="lesson-card" href="/#writing">
                <span className="lesson-number">That's the series so far</span>
                <h3>Back to all lessons</h3>
              </a>
            )}
            <div className="article-contact">
              <p>Questions, or want help applying this?</p>
              <a className="btn" href={`mailto:${main.email}`}>
                Email me
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer main={main} />
    </>
  );
}
