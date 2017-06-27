//This component handles the app template used on every page
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import {connect} from 'react-redux';

class App extends React.Component{
    render(){
        return(
            <Router path="/" component={App}>
                <div id="app">
                    <Header loading={this.props.loading}/>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/courses" component={CoursesPage} />
                    {//<Route path="/course/:id" component={ManageCoursePage} /> this path:id is not needed in react router v4
                    }
                    <Route exact path="/course" component={ManageCoursePage} /> { // in V4, we need add key word: exact, otherwise, will create two ManageCoursePage compornent in the same path: /course
                    //because we have another Route setting for '/course/:id' below

                    }
                    <Route path="/course/:id" component={ManageCoursePage} />
                </div>
            </Router>
        );

    }
}

function mapStateToProps(state, ownProps){
    return{
        loading: state.ajaxCallsInProgress >0
    };
}

export default connect(mapStateToProps)(App);
