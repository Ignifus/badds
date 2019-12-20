import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { ActionMenu } from './components'
import { actions, selectors } from '../duck';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';
import { getSpaceURL } from '../../../helpers';

class AuctionsListBase extends PureComponent {
  componentDidMount() {
    const { list } = this.props;
    this.onActionSelected = this.onActionSelected.bind(this);
    list();
  }

  onActionSelected(action, id) {
    const { history, remove } = this.props;
    const { spaceId } = this.props.match.params;

    switch (action) {
      case 'Update':
        history.push(`/ads/publishers/auctions/update/${id}`);
        break;
      case 'Delete':
        remove(id);
        break;
      default:
        break;
    }
  }

  render() {
    const {isLoading, auctions, hasError, success} = this.props;

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
        <Paper style={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Space</TableCell>
                <TableCell>Duracion</TableCell>
                <TableCell>Finalizacion</TableCell>
                <TableCell>Impresiones</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auctions.map(auction => (
                <TableRow key={auction.id}>
                  <TableCell><Link to={getSpaceURL(this.props.location.pathname, auction.space)}>Expandir</Link></TableCell>
                  <TableCell>{auction.contract_duration_days}</TableCell>
                  <TableCell>{auction.end_date}</TableCell>
                  <TableCell>{auction.prints}</TableCell>
                  <TableCell>
                    <ActionMenu onActionSelected={ (action) => this.onActionSelected(action, auction.id) } />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
};

AuctionsListBase.propTypes = {
  isLoading: PropTypes.bool,
  auctions: PropTypes.array,
  list: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  auctions: selectors.getList(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  list: actions.list,
  remove: actions.remove,
}

const AuctionsList = compose(
  withProductLayout({
    title: 'Mis Subastas',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AuctionsListBase);

export {AuctionsList};
