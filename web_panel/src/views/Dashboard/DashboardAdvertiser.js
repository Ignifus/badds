import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid, LinearProgress } from '@material-ui/core';
import { actions, selectors } from './duck';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  UsersByDevice,
  LatestOrders,
} from './components';
import WcIcon from '@material-ui/icons/Wc';

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
    props.fetchAdvertiser();
  }, []);

  let data = { data: [], labels: [], percentages: [], showIndicator: false };
  if (analytics != null) {
    data = {
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
    data.showIndicator = data.percentages.reduce((e, i) => e + i.value, 0);
  }

  if (analytics.contract_history == null) {
    return <LinearProgress />
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
          <Budget title="Contratos Activos" value={`${analytics.active_contracts}`} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers title="Total Ads" value={analytics.total_ads}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress
            title="Eficiencia subastando"
            value={parseInt((analytics.active_contracts / analytics.active_biddings) * 100) || 0}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit title="Creditos Totales" value={`${analytics.credits} cr`} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders history={analytics.contract_history} />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          { data.showIndicator ? <UsersByDevice title="Distribucion Usuarios" data={data} /> : null}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  analytics: selectors.getAdvertiserAnalytics(state)
});

const mapDispatchToProps = {
  fetchAdvertiser: actions.fetchAdvertiser
};

const DashboardAdvertiser = connect(mapStateToProps, mapDispatchToProps)(DashboardBase);

export { DashboardAdvertiser };
