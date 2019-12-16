import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { actions, selectors } from '../duck';
import { withProductLayout } from '../../../layouts/Main';
import moment from 'moment';

class ProductDetailBase extends PureComponent {
  componentDidMount() {
    const { fetch } = this.props;
    fetch(this.props.match.params.id);
  }

  render() {
    const {isLoading, app, hasError} = this.props;

    if (isLoading & !hasError) {
      return (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    return (
      <List>
        <ListItem>
          <Typography variant="h4">{app.name}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Dominio"
            secondary={app.domain}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Key"
            secondary={app.key}
          />
        </ListItem>
        <ListItem>
        <ListItemText
            primary="Aplicacion Activa"
            secondary={app.active ? "Activo" : "Inactivo"}
          />
        </ListItem>
        <ListItem>
        <ListItemText
            primary="Fecha Creacion"
            secondary={moment(app.created_at).format('DD/MM/YYYY')}
          />
        </ListItem>
      </List>
    );
  }
};

ProductDetailBase.propTypes = {
  isLoading: PropTypes.bool,
  app: PropTypes.object,
  fetch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  app: selectors.getApp(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  fetch: actions.fetch,
  remove: actions.remove,
}

const ProductDetail = compose(
  withProductLayout({
    title: 'App',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ProductDetailBase);

export {ProductDetail};
