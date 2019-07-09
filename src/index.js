import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import ChapterOne from './Components/writing/chapterone';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/marketing-unraveled" component={ChapterOne} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
