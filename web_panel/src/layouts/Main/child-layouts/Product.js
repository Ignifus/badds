import React from 'react';
import PropTypes from 'prop-types';
import {Divider, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { ProductsToolbar, ProductPagination } from './components';

const styles = (theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
}));

class ProductLayoutBase extends React.Component {
  static defaultProps = {
    withPagination: false
  }

  constructor(props) {
    super(props);
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render () {
    const {MainArea, withPagination, classes, title, Buttons} = this.props;

    let pagination = null;
    if (withPagination) {
      pagination = (<div className={classes.pagination}>
        <ProductPagination />
      </div>)
    }

    return (
      <div className={classes.root}>
        <ProductsToolbar showSearch={false} Buttons={Buttons} />
        <div className={classes.content}>
          <Grid
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography variant="h2" component="h2">{title}</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <MainArea />
            </Grid>
          </Grid>
        </div>
        {pagination}
      </div>
    );
  }
}

ProductLayoutBase.propTypes = {
  MainArea: PropTypes.elementType.isRequired,
  withPagination: PropTypes.bool,
  title: PropTypes.string,
  Buttons: PropTypes.elementType.isRequired
}

const ProductLayout = withStyles(styles)(ProductLayoutBase)

const withProductLayout = ({withPagination, title, Buttons}) => WrappedComponent => {
  return () => (<ProductLayout withPagination={withPagination}
      MainArea={WrappedComponent}
      title={title}
      Buttons={Buttons}
    />);
};

export { ProductLayout, withProductLayout };
