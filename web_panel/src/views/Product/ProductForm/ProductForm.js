import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ProductsToolbar } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProductForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductsToolbar showSearch={false} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          <h1>form</h1>
        </Grid>
      </div>
    </div>
  );
};

export { ProductForm };
