import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ArticleLayout from './components/ArticleLayout';
import { articles } from './articles';
import './styles.css';

// The previous build registered a cache-first service worker. Remove it so
// returning visitors get the current site instead of a stale cached copy.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {articles.map((article) => (
          <Route
            key={article.slug}
            path={`/${article.slug}`}
            element={<ArticleLayout article={article} />}
          />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
