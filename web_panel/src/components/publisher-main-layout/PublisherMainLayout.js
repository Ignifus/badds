import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import { Header } from '../barrel';

class PublisherMainLayoutBase extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={3}>Panel</Grid>
        <Grid item xs={9}>Results</Grid>
      </Grid>
    );
  }
}

export const PublisherMainLayout = PublisherMainLayoutBase;
