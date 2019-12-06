import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Divider,
  FormControl,
  Button
} from '@material-ui/core';
import { AppDuck } from '../../../duck';
import { actions } from '../duck';
import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { CountrySelect } from '../../../common/countries';

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
      countryWhiteList: [],
      countryBlackList: [],
    }
  }

  handleSubmit() {}

  setWhiteListCountry(code) {
    this.setState({
      countryWhiteList: code
    });
  }

  setBlackListCountry(code) {
    this.setState({
      countryBlackList: code
    });
  }

  findRestrictions(name) {
    const { restrictions } = this.props;
    return restrictions.find(restriction => restriction.restriction === name)
  }

  renderAge() {
    const restriction = this.findRestrictions('AGE');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item xs={12}>
        <Typography variant="h4">Banda Edades</Typography>
        <Typography variant="body1">{textRestriction['GENDER']}</Typography>
        <FormControl fullWidth>

        </FormControl>
      </Grid>
    )
  }

  renderCountryWhiteList() {
    const restriction = this.findRestrictions('COUNTRY_WHITELIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item xs={12}>
        <Typography variant="h4">Paises Incluidos</Typography>
        <Typography variant="body1">{textRestriction['COUNTRY_WHITELIST']}</Typography>
        <FormControl fullWidth>
          <InputLabel id="badds-space-restriction-wcselect">Categoria</InputLabel>
          <CountrySelect
            value={ this.state.countryWhiteList }
            onCountrySelected={(countryCode) => this.setWhiteListCountry(countryCode) }
            labelId="badds-space-restriction-wcselect"
            multiple
          />
        </FormControl>
      </Grid>
    )
  }

  renderCountryBlackList() {
    const restriction = this.findRestrictions('COUNTRY_BLACKLIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item xs={12}>
        <Typography variant="h4">Paises Excluidos</Typography>
        <Typography variant="body1">{textRestriction['COUNTRY_BLACKLIST']}</Typography>
        <FormControl fullWidth>
          <InputLabel id="badds-space-restriction-bcselect">Categoria</InputLabel>
          <CountrySelect
            value={ this.state.countryBlackList }
            onCountrySelected={(countryCode) => this.setBlackListCountry(countryCode) }
            labelId="badds-space-restriction-bcselect"
            multiple
          />
        </FormControl>
      </Grid>
    )
  }

  renderGender() {
    const restriction = this.findRestrictions('GENDER');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item xs={12}>
        <Typography variant="h4">Genero Objetivo</Typography>
        <Typography variant="body1">{textRestriction['GENDER']}</Typography>
        <FormControl fullWidth>

        </FormControl>
      </Grid>
    )
  }

  // TODO mass update
  render() {
    return (<form>
      <Grid container spacing={2}>
        { this.renderAge() }
        <Divider />
        { this.renderCountryWhiteList() }
        <Divider />
        { this.renderCountryBlackList() }
        <Divider />
        { this.renderGender() }
        <Divider />
        <Grid item xs={12}>
          <Button type="submit">Guardar Restricciones</Button>
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
