import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  TextField,
  Typography } from '@material-ui/core';
import { AppDuck } from '../../../duck';
import { actions } from '../duck';
import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';

const textRestriction = {
  AGE: 'Banda de edades separada por comas, por ejemplo, 20-45,60-65',
  GENDER: 'Marcar solo si hay un genero objetivo para la pauta',
  COUNTRY_WHITELIST: 'Marcar los paises objetivo',
  COUNTRY_BLACKLIST: 'Marcar los paises excluidos de la pauta'
};

class SpacesRestrictionsBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRestrictions: []
    }
  }

  handleSubmit() {}

  renderAge() {
    const { restrictions } = this.props;
    const restriction = restrictions.find(restriction => restriction.restriction === 'AGE');

    if (restriction == null) {
      return <span />
    }

    return (
      <div>Banda Edades</div>
    )
  }

  renderCountryWhiteList() {
    const { restrictions } = this.props;
    const restriction = restrictions.find(restriction => restriction.restriction === 'COUNTRY_WHITELIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <div>Paises Incluidos</div>
    )
  }

  renderCountryBlackList() {
    const { restrictions } = this.props;
    const restriction = restrictions.find(restriction => restriction.restriction === 'COUNTRY_BLACKLIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <div>Paises Excluidos</div>
    )
  }

  renderGender() {
    const { restrictions } = this.props;
    const restriction = restrictions.find(restriction => restriction.restriction === 'GENDER');

    if (restriction == null) {
      return <span />
    }

    return (
      <div>Genero del publico</div>
    )
  }

  // TODO mass update
  render() {
    return (<form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          { this.renderAge() }
          { this.renderCountryWhiteList() }
          { this.renderCountryBlackList() }
          { this.renderGender() }
        </Grid>
      </Grid>
    </form>);
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
