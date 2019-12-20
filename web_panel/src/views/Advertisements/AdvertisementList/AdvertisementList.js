import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ActionMenu } from './components'
import { actions, selectors } from '../duck/ads';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';

class AdvertisementListBase extends PureComponent {
  componentDidMount() {
    const { list } = this.props;
    this.onActionSelected = this.onActionSelected.bind(this);
    list();
  }

  onActionSelected(action, id) {
    const { history, remove } = this.props;
    switch (action) {
      case 'Update':
        history.push(`/ads/advertisers/ads/update/${id}`);
        break;
      case 'Delete':
        remove(id);
        break;
      case 'Add Restricion':
        history.push(`/ads/advertisers/ads/${id}/restrictions`);
        break;
      case 'List Resources':
        history.push(`/ads/advertisers/ads/${id}/resources`);
        break;
      case 'Add Resources':
        history.push(`/ads/advertisers/ads/${id}/resources/add`);
        break;
      default:
        break;
    }
  }

  render() {
    const {isLoading, ads, hasError, success} = this.props;

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
              <TableCell>Nombre</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map(ad => (
              <TableRow key={ad.id}>
                <TableCell>{ad.id}</TableCell>
                <TableCell>{ad.name}</TableCell>
                <TableCell>{ad.description}</TableCell>
                <TableCell>
                  <ActionMenu onActionSelected={ (action) => this.onActionSelected(action, ad.id) } />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    );
  }
};

AdvertisementListBase.propTypes = {
  isLoading: PropTypes.bool,
  ads: PropTypes.array,
  list: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  ads: selectors.getList(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  list: actions.list,
  remove: actions.remove,
}

const AdvertisementList = compose(
  withProductLayout({
    title: 'Avisos',
    withPagination: true,
    Buttons: ToolbarActions
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AdvertisementListBase);

export {AdvertisementList};
