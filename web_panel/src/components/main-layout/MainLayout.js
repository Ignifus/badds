import React, {Component} from 'react';
import { Grid } from '@material-ui/core';

class MainLayoutBase extends Component {
  render() {
    const {children} = this.props;

    return (
      <Grid item>
        <Grid item xs={12}>
          Main Header
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    )
  }
}

export const MainLayout = MainLayoutBase;
