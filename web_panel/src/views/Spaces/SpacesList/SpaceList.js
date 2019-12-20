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
import { getApplicationURL } from '../../../helpers';

class SpaceListBase extends PureComponent {
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
      case 'Detail':
        history.push(`/ads/publishers/spaces/view/${id}`);
        break;
      default:
        break;
    }
  }

  render() {
    const {isLoading, spaces, hasError, success} = this.props;

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
        <Paper style={{width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ancho</TableCell>
                <TableCell>Alto</TableCell>
                <TableCell>Aplicacion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spaces.map(space => (
                <TableRow key={space.id}>
                  <TableCell>{space.id}</TableCell>
                  <TableCell>{space.name}</TableCell>
                  <TableCell>{space.x_size}</TableCell>
                  <TableCell>{space.y_size}</TableCell>
                  <TableCell><Link to={getApplicationURL(this.props.location.pathname, space.application)}>Expandir</Link></TableCell>
                  <TableCell>
                    <ActionMenu onActionSelected={ (action) => this.onActionSelected(action, space.id) } />
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

SpaceListBase.propTypes = {
  isLoading: PropTypes.bool,
  spaces: PropTypes.array,
  list: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  spaces: selectors.getList(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  list: actions.list,
  remove: actions.remove,
}

const SpaceList = compose(
  withProductLayout({
    title: 'Espacios',
    withPagination: true,
    Buttons: ToolbarActions
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SpaceListBase);

export {SpaceList};
