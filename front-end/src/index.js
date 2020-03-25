import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CreateFuture from "./CreateFuture.js";
import Dashboard from "./Dashboard.js";
import About from "./About.js";
import Future from "./Future.js";



import {
  BrowserRouter,
  HashRouter,
  Route,
  Router
} from "react-router-dom";


ReactDOM.render(
	<BrowserRouter>
		<Route exact path="/" component={App}/>
		<Route path="/create-future" component={CreateFuture}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/about" component={About}/>
		<Route path="/view-future" component={Future}/>
		<Route path="/log-in" />
		<Route path="/sign-up" />
	</BrowserRouter>,
	document.getElementById('root'));


/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
