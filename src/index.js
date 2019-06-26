import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'
import './index.css';
import Home from './views/home/home';
import MyEditor from './views/Editor/Editor'
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory({
  basename: '/',
})

ReactDOM.render(
  (<Router history={history}>
    <Route path="/home" component={Home}/>
    <Route path="/editor" component={MyEditor}/>
  </Router>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
