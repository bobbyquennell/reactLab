/*eslint-disable import/default*/
//import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './reactGetStartedExamples/e3';//'./reactGetStartedExamples/e1';//'./reduxExample/components/App';//swtich between different apps by editing the path here
import {loadCourses} from './reduxExample/actions/courseActions';
import {loadAuthors} from './reduxExample/actions/authorActions';
import './index.css';
import configureStore from './reduxExample/store/configStore';
import {Provider} from 'react-redux';
import '../node_modules/toastr/build/toastr.min.css';

/*eslint-disable no-console*/
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
console.log(store.getState());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));//this is used for e1-e3 apps;
// const RootCotainer = ()=>{
//   return (
//
//     <Router>
//       <App/>
//     </Router>
// );
// };
// render(
//   <RootCotainer/>,
//   document.getElementById('root')
// );
