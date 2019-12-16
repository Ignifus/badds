import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { actions, selectors } from '../duck/ads';
import { withProductLayout } from '../../../layouts/Main';
import moment from 'moment';

class AdvertisementDetailBase extends PureComponent {
  componentDidMount() {
    const { fetch } = this.props;
    fetch(this.props.match.params.id);
  }

  render() {
    const {isLoading, advertisement, hasError} = this.props;

    if (isLoading & !hasError) {
      return (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    return (
      <List>
        <ListItem>
          <Typography variant="h4">{advertisement.name}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Descripcion"
            secondary={advertisement.description}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha Creacion"
            secondary={moment(advertisement).format('DD/MM/YYYY')}
          />
        </ListItem>
      </List>
    );
  }
};

AdvertisementDetailBase.propTypes = {
  isLoading: PropTypes.bool,
  advertisement: PropTypes.object,
  fetch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  advertisement: selectors.getAd(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  fetch: actions.fetch,
  remove: actions.remove,
}

const AdvertisementDetail = compose(
  withProductLayout({
    title: 'Aviso',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AdvertisementDetailBase);

export {AdvertisementDetail};
