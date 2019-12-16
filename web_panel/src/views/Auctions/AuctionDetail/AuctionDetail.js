import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { actions, selectors } from '../duck';
import { withProductLayout } from '../../../layouts/Main';
import moment from 'moment';
import { getSpaceURL } from 'helpers';

class AuctionDetailBase extends PureComponent {
  componentDidMount() {
    const { fetch } = this.props;
    fetch(this.props.match.params.id);
  }

  render() {
    const {isLoading, auction, hasError} = this.props;

    if (isLoading & !hasError) {
      return (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }
    console.log(auction);
    return (
      <List>
        <ListItem>
          <Typography variant="h4">Por {auction.print} impresiones</Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha Creacion"
            secondary={moment(auction.created_at).format('DD/MM/YYYY')}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha Finalizacion"
            secondary={moment(auction.end_date).format('DD/MM/YYYY')}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Duarcion"
            secondary={moment(auction.contract_duration_days).format('DD/MM/YYYY')}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Espacio"
            secondary={<Link to={getSpaceURL(this.props.location.pathname, auction.space)}>Expandir</Link>}
          />
        </ListItem>
      </List>
    );
  }
};

AuctionDetailBase.propTypes = {
  isLoading: PropTypes.bool,
  advertisement: PropTypes.object,
  fetch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  auction: selectors.getAuction(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  fetch: actions.fetch,
  remove: actions.remove,
}

const AuctionDetail = compose(
  withProductLayout({
    title: 'Contrato',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AuctionDetailBase);

export {AuctionDetail};
