import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppDuck } from '../../../duck';
import { actions } from '../duck';
import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';

class SpacesRestrictionsBase extends Component {
  render() {
    return <div>TODO: Restrictions</div>
  }
}

export const mapStateToProps = (state) => ({
  restrictions: AppDuck.selectors.getRestrictions(state)
});

export const mapDispatchToProps = {
  create: actions.addRestriction
}

const SpacesRestrictions = compose(
  withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: () => <span />
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SpacesRestrictionsBase);

export { SpacesRestrictions };
