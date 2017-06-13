//This component handles the app template used on every page
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';

class App extends React.Component{
  render(){
    return(
      <Router path="/" component={App}>
        <div id="app">
         <Header/>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:id" component={ManageCoursePage} />
        </div>
      </Router>
    );

  }
}

// App.PropTypes = {
//   children: PropTypes.object.isRequired
// };

export default App;
