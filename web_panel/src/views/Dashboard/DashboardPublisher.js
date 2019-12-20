import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid, LinearProgress } from '@material-ui/core';
import { actions, selectors } from './duck';
import palette from 'theme/palette';
import WcIcon from '@material-ui/icons/Wc';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardBase = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const analytics = props.analytics;

  useEffect(() => {
    props.fetchPublisher();
  }, []);

  let data = []
  let users = { data: [], labels: [], percentages: [], showIndicator: false };
  if (analytics.credits_history == null) {
    return <LinearProgress />
  } else {
    data = {
      labels: analytics.credits_history.map(credit => moment(credit.time).format('DD/MM')),
      datasets: [
        {
          label: 'Creditos',
          backgroundColor: palette.primary.main,
          data: analytics.credits_history.map(credit => credit.credits)
        }
      ]
    };

    users = {
      data: [analytics.males, analytics.females],
      labels: ["Masculino", "Femenino"],
      percentages: [
        {
          title: 'Hombres',
          value: parseInt((analytics.males / (analytics.males + analytics.females)) * 100) || 0,
          icon: <WcIcon />,
          color: theme.palette.primary.main
        },
        {
          title: 'Mujeres',
          value: parseInt((analytics.females / (analytics.males + analytics.females)) * 100) || 0,
          icon: <WcIcon />,
          color: theme.palette.error.main
        },
      ]
    }
    users.showIndicator = users.percentages.reduce((e, i) => e + i.value, 0);
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget title="Espacios" value={analytics.total_spaces} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers title="Aplicaciones" value={analytics.total_applications} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress
            title="Porcentaje Eficacia"
            value={parseInt((analytics.active_contracts / analytics.active_auctions) * 100) || 0}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit title="Ganancia Acumulada" value={`${analytics.credits} cr`} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales data={data} />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          { users.showIndicator ? <UsersByDevice title="Distribucion Usuarios" data={users} /> : null}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  analytics: selectors.getPublishersAnalytics(state)
});

const mapDispatchToProps = {
  fetchPublisher: actions.fetchPublisher
};

const DashboardPublisher = connect(mapStateToProps, mapDispatchToProps)(DashboardBase);

export { DashboardPublisher };
