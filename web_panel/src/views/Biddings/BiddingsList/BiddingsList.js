import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ActionMenu } from './components'
import { actions, selectors } from '../duck';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';
import moment from 'moment';

class BiddingsListBase extends PureComponent {
  componentDidMount() {
    const { list } = this.props;
    this.onActionSelected = this.onActionSelected.bind(this);
    list();
  }

  onActionSelected(action, id) {
    const { history, remove } = this.props;
    switch (action) {
      case 'Update':
        history.push(`/ads/publishers/spaces/update/${id}`);
        break;
      case 'Delete':
        remove(id);
        break;
      case 'Add Restricion':
        history.push(`/ads/publishers/spaces/${id}/restrictions`);
        break;
      case 'Add Auction':
        history.push(`/ads/publishers/spaces/${id}/auctions/add`);
        break;
      default:
        break;
    }
  }

  render() {
    const {isLoading, biddings, hasError, success} = this.props;

    if (isLoading & !hasError) {
      return (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    return (
      <Grid container spacing={5}>
        {
          hasError && <FailedSnackbar message="Tuvimos un problema al procesar su peticion" />
        }
        {
          success && <SuccessSnackbar message="Operacion concluida con exito" />
        }
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>PPP USD</TableCell>
              <TableCell>Creacion</TableCell>
              <TableCell>Subasta</TableCell>
              <TableCell>Aviso</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {biddings.map(bidding => (
              <TableRow key={bidding.id}>
                <TableCell>{bidding.id}</TableCell>
                <TableCell>{bidding.ppp_usd}</TableCell>
                <TableCell>{moment(bidding.created_at).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{bidding.auction}</TableCell>
                <TableCell>{bidding.advertisement}</TableCell>
                <TableCell>
                  <ActionMenu onActionSelected={ (action) => this.onActionSelected(action, bidding.id) } />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    );
  }
};

BiddingsListBase.propTypes = {
  isLoading: PropTypes.bool,
  biddings: PropTypes.array,
  list: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  biddings: selectors.getList(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  list: actions.list,
  remove: actions.remove,
}

const BiddingsList = compose(
  withProductLayout({
    title: 'Mis Subastas',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(BiddingsListBase);

export {BiddingsList};
