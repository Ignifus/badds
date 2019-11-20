import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Grid, TextField } from '@material-ui/core';

import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';


const styles = theme => ({});

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
    return (
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
    );
  }
};

const ProductFormStyled = withStyles(styles)(ProductFormBase);
const ProductForm = withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: ToolbarActions
  })(ProductFormStyled);

export { ProductForm };
