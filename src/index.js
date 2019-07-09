import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Unravel from './unravel';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/unraveling-marketing" component={Unravel} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
