//This component handles the app template used on every page
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';

class App extends React.Component{
  render(){
    return(
      <Router path="/" component={App}>
        <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        </div>
      </Router>
    );

  }
}

// App.PropTypes = {
//   children: PropTypes.object.isRequired
// };

export default App;
