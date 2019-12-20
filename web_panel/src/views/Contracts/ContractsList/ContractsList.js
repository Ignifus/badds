import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { ActionMenu } from './components'
import { actions, selectors } from '../duck';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { withProductLayout } from '../../../layouts/Main';
import { getSpaceURL, getAdvertisementURL } from '../../../helpers';
import moment from 'moment';

class ContractsListBase extends PureComponent {
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
    const {isLoading, contracts, hasError, success} = this.props;

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
                <TableCell>ID</TableCell>
                <TableCell>Prints</TableCell>
                <TableCell>PPP USD</TableCell>
                <TableCell>Creacion</TableCell>
                <TableCell>Finalizacion</TableCell>
                <TableCell>Espacio</TableCell>
                <TableCell>Aviso</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map(contract => (
                <TableRow key={contract.id}>
                  <TableCell>{contract.id}</TableCell>
                  <TableCell>{contract.prints}</TableCell>
                  <TableCell>{contract.ppp_usd}</TableCell>
                  <TableCell>{moment(contract.created_at).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{moment(contract.end_date).format('DD/MM/YYYY')}</TableCell>
                  <TableCell><Link to={getSpaceURL(this.props.location.pathname, contract.space)}>Expandir</Link></TableCell>
                  <TableCell><Link to={getAdvertisementURL(this.props.location.pathname, contract.advertisement)}>Expandir</Link></TableCell>
                  <TableCell>{contract.active ? "Activo": "Finalizado"}</TableCell>
                  <TableCell>
                    <ActionMenu onActionSelected={ (action) => this.onActionSelected(action, contract.id) } />
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

ContractsListBase.propTypes = {
  isLoading: PropTypes.bool,
  contracts: PropTypes.array,
  list: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  contracts: selectors.getList(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  list: actions.list,
  remove: actions.remove,
}

const ContractsList = compose(
  withProductLayout({
    title: 'Mis Contratos',
    withPagination: true,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ContractsListBase);

export {ContractsList};
