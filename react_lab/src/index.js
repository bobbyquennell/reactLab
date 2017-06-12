//import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';//swtich between different apps by editing the path here
import {loadCourses} from './actions/courseActions';
import './index.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore();
store.dispatch(loadCourses());
console.log(store.getState());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// const RootCotainer = ()=>{
//   return (
//
//     <Router>
//       <App/>
//     </Router>
//   )
// }
// render(
//   <RootCotainer/>,
//   document.getElementById('root')
// );
