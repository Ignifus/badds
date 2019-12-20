import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { ActionMenu } from './components'
import { actions, selectors } from '../duck/resources';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { ResourceToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';

class ResourceListBase extends PureComponent {
  componentDidMount() {
    const { list } = this.props;
    this.onActionSelected = this.onActionSelected.bind(this);
    list();
  }

  onActionSelected(action, id) {
    const { history, remove } = this.props;
    switch (action) {
      case 'Update':
        history.push(`/ads/advertisers/resource/${id}/update`);
        break;
      case 'Delete':
        remove(id);
        break;
      case 'Add Restricion':
        history.push(`/ads/advertisers/ads/resources/${id}/restrictions`);
        break;
      default:
        break;
    }
  }

  render() {
    const {isLoading, resources, hasError, success} = this.props;

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
                <TableCell>Nombre</TableCell>
                <TableCell>Path</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map(resource => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell><a href={resource.path} target="__blank">Ver Recurso</a></TableCell>
                  <TableCell>{resource.url_link}</TableCell>
                  <TableCell>
                    <ActionMenu onActionSelected={ (action) => this.onActionSelected(action, resource.id) } />
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

ResourceListBase.propTypes = {
  isLoading: PropTypes.bool,
  resources: PropTypes.array,
  list: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  resources: selectors.getList(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state)
});

const mapDispatchToProps = {
  list: actions.list,
  remove: actions.remove,
}

const ResourceList = compose(
  withProductLayout({
    title: 'Resources',
    withPagination: true,
    Buttons: ResourceToolbarActions
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ResourceListBase);

export {ResourceList};
