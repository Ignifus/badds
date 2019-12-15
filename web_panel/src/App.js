import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
//import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { AppDuck } from './duck';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export class AppBase extends Component {

  componentDidMount() {
    this.props.fetchRestrictions();
    this.props.fetchAppCategories();
    this.props.fetchUsers();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  fetchRestrictions: AppDuck.actions.fetchRestrictions,
  fetchAppCategories: AppDuck.actions.fetchAppCategories,
  fetchUsers: AppDuck.actions.fetchUsers
}

const App = connect(null, mapDispatchToProps)(AppBase);

export {App};
