import React from 'react';
import ReactDOM { hydrate, render } from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import ChapterOne from './Components/writing/chapterone';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/yields-and-bounties" component={ChapterOne} />
    </div>
  </Router>
)

//ReactDOM.render(routing, document.getElementById('root'));

import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(routing, rootElement);
} else {
  render(routing, rootElement);
}
registerServiceWorker();
