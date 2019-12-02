import React,  { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { SpaceCard } from './components'
import { actions, selectors } from '../duck';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';

class SpaceListBase extends PureComponent {
  componentDidMount() {
    const { list } = this.props;
    this.onActionSelected = this.onActionSelected.bind(this);
    list();
  }

  onActionSelected(action, id) {
    const { history, remove } = this.props;
    if (action === 'Update') {
      history.push(`/ads/publishers/spaces/update/${id}`);
    }
    if (action === 'Delete') {
      remove(id);
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
          hasError && <FailedSnackbar message="Tuvimos un problema al procesar su request" />
        }
        {
          success && <SuccessSnackbar message="El espacio se creo exitosamente" />
        }
        {spaces.map(space => (
          <Grid
            item
            key={space.id}
            lg={4}
            md={6}
            xs={12}
          >
            <SpaceCard space={space} onActionSelected={this.onActionSelected} />
          </Grid>
        ))}
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
    title: 'Apps',
    withPagination: true,
    Buttons: ToolbarActions
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SpaceListBase);

export {SpaceList};
