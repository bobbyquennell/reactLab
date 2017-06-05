import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

export default(
  <Router path="/" component={App}>
    <div>
      
    </div>
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
  </Router>
);
