import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { actions, selectors } from '../duck';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { withProductLayout } from '../../../layouts/Main';
import moment from 'moment';

class SpaceDetailBase extends PureComponent {
  componentDidMount() {
    const { fetch } = this.props;
    fetch(this.props.match.params.id);
  }

  render() {
    const {isLoading, space, hasError} = this.props;

    if (isLoading & !hasError) {
      return (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    return (
      <List>
        <ListItem>
          <Typography variant="h4">{space.name}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Ancho"
            secondary={`${space.x_size} pixeles`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Alto"
            secondary={`${space.y_size} pixeles`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha Creacion"
            secondary={moment(space.created_at).format('DD/MM/YYYY')}
          />
        </ListItem>
        <ListItem>
          <List>
            {
              space.restrictions.map(restriction => (
                <ListItem key={restriction.restriction__restriction}>
                  <ListItemText
                    primary={restriction.restriction__restriction}
                    secondary={restriction.value}
                  />
                </ListItem>
              ))
            }
          </List>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Espacio Activo"
            secondary={space.active ? "Activo" : "Inactivo"}
          />
        </ListItem>
      </List>
    );
  }
};

SpaceDetailBase.propTypes = {
  isLoading: PropTypes.bool,
  space: PropTypes.object,
  fetch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  space: selectors.getSpace(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  fetch: actions.fetch,
  remove: actions.remove,
}

const SpaceDetail = compose(
  withProductLayout({
    title: 'Espacio',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SpaceDetailBase);

export {SpaceDetail};
