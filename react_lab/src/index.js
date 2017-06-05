import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';//swtich between different apps by editing the path here
import './index.css';



ReactDOM.render(<App />, document.getElementById('root'));
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
