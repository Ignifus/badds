import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

import {Provider} from "react-redux";
import { store } from './store.js'

TimeAgo.locale(es);

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/" name="Home" component={Full}/>
        </Switch>
      </HashRouter>
    </Provider>
  ), document.getElementById('root'));
};

render();
