import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Divider, Grid, Typography, TextField } from '@material-ui/core';

import { ProductsToolbar } from '../components';

const styles = (theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

class ProductFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    alert("caca");
  }

  render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <ProductsToolbar showSearch={false} />
        <div className={classes.content}>
          <Grid
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography variant="h2" component="h2">Form</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField label="Name" placeholder="Nombre de la app" fullWidth />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Name" placeholder="Nombre de la app" fullWidth />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Name" placeholder="Nombre de la app" fullWidth />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Button type="submit">Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

const ProductForm = withStyles(styles)(ProductFormBase);

export { ProductForm };
