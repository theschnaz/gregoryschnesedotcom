import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import ChapterOne from './Components/writing/chapterone';
import ChapterTwo from './Components/writing/chaptertwo';
import ChapterThree from './Components/writing/chapterthree';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/yields-and-bounties" component={ChapterOne} />
      <Route path="/metrics-in-metrics" component={ChapterTwo} />
      <Route path="/how-to-run-a-proper-ab-test" component={ChapterThree} />
    </div>
  </Router>
)

//ReactDOM.render(routing, document.getElementById('root'));

const rootElement = document.getElementById("root");

ReactDOM.render(routing, rootElement);

registerServiceWorker();
