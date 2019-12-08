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
  Typography,
  FormControl,
  Button,
  Select,
  MenuItem,
  LinearProgress
} from '@material-ui/core';
import { AppDuck } from '../../../duck';
import { actions, selectors } from '../duck';
import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { CountrySelect } from '../../../common/countries';

const textRestriction = {
  AGE: 'Banda de edades separada por comas, por ejemplo, 20-45,60-65',
  GENDER: 'Marcar solo si hay un genero objetivo para la pauta',
  COUNTRY_WHITELIST: 'Marcar los paises objetivo',
  COUNTRY_BLACKLIST: 'Marcar los paises excluidos de la pauta'
};

const genders = [
  { label: "Masculine", value: "M" },
  { label: "Femenine", value: "F" },
  { label: "Other", value: "O" },
];

class SpacesRestrictionsBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryWhiteList: [],
      countryBlackList: [],
      genders: [],
      minAge: 0,
      maxAge: 25
    }

    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const { create } = this.props;
    const payload = [];
    const space = this.props.match.params.id;

    const AGE = this.findRestrictions('AGE');
    if (AGE !== null) {
      const value = `${this.state.minAge}:${this.state.maxAge}`;
      payload.push({ space, restriction: AGE.id, value });
    }

    const GENDER = this.findRestrictions('GENDER');
    if (GENDER !== null) {
      const value = this.state.genders.join(',');
      payload.push({ space, restriction: GENDER.id, value });
    }

    const COUNTRY_WHITELIST = this.findRestrictions('COUNTRY_WHITELIST');
    if (COUNTRY_WHITELIST !== null) {
      const value = this.state.countryWhiteList.join(',');
      payload.push({ space, restriction: COUNTRY_WHITELIST.id, value });
    }

    const COUNTRY_BLACKLIST = this.findRestrictions('COUNTRY_BLACKLIST');
    if (COUNTRY_BLACKLIST !== null) {
      const value = this.state.countryBlackList.join(',');
      payload.push({ space, restriction: COUNTRY_BLACKLIST.id, value });
    }
    create(payload);
  }

  handleAgeChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleGenderChange(e) {
    if (e.target.checked) {
      this.setState({
        genders: [e.target.value, ...this.state.genders]
      });
    } else {
      this.setState({
        genders: this.state.genders.filter(gender => gender !== e.target.value)
      });
    }
  }

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
    const ages = Array.from(new Array(100).keys());

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item md={4} xs={12}>
        <Typography variant="h4">Banda Edades</Typography>
        <Typography variant="body1">{textRestriction['GENDER']}</Typography>
        <Grid container>
            <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="badds-spacerestrictions-min-age">Edad minima</InputLabel>
              <Select
                labelId="badds-spacerestrictions-min-age"
                name="minAge"
                value={this.state.minAge}
                onChange={this.handleAgeChange}
              >
                { ages.map(age => <MenuItem key={age} value={age}>{age}</MenuItem>) }
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="badds-spacerestrictions-max-age">Edad maxima</InputLabel>
                <Select
                  labelId="badds-spacerestrictions-max-age"
                  name="maxAge"
                  value={this.state.maxAge}
                  onChange={this.handleAgeChange}
                >
                  { ages.map(age => <MenuItem key={age} value={age}>{age}</MenuItem>) }
                </Select>
              </FormControl>
            </Grid>
        </Grid>
      </Grid>
    )
  }

  renderCountryWhiteList() {
    const restriction = this.findRestrictions('COUNTRY_WHITELIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item md={4} xs={12}>
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
      <Grid item md={4} xs={12}>
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
      <Grid item md={4} xs={12}>
        <Typography variant="h4">Genero Objetivo</Typography>
        <Typography variant="body1">{textRestriction['GENDER']}</Typography>
        <FormGroup row>
          {
           genders.map(gender => (<FormControlLabel
              key={gender.label}
              control={
                <Checkbox
                  checked={this.state.genders.findIndex(g => g === gender.value) >= 0 }
                  onChange={this.handleGenderChange}
                  value={gender.value}
                />
              }
              label={gender.label}
            />))
          }
        </FormGroup>
      </Grid>
    )
  }

  // TODO mass update
  render() {
    const { isLoading, hasError, success } = this.props;
    let progressBar = null;

    if (isLoading & !hasError) {
      progressBar = (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    return (<form onSubmit={this.handleSubmit}>
      {
        hasError && <FailedSnackbar message="Tuvimos un problema al procesar su peticion" />
      }
      {
        success && <SuccessSnackbar message="Operacion concluida con exito" />
      }
      <Grid container spacing={2}>
        { progressBar }
        { this.renderAge() }
        { this.renderCountryWhiteList() }
        { this.renderCountryBlackList() }
        { this.renderGender() }
        <Grid item xs={12}>
          <Button type="submit" color="primary">Guardar Restricciones</Button>
        </Grid>
      </Grid>
    </form>);
  }
}

export const mapStateToProps = (state) => ({
  isLoading: selectors.isLoading(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state),
  restrictions: AppDuck.selectors.getRestrictions(state)
});

export const mapDispatchToProps = {
  create: actions.addRestriction
}

const SpacesRestrictions = compose(
  withProductLayout({
    title: 'Restricciones de los espacios',
    withPagination: false,
    Buttons: () => <span />
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SpacesRestrictionsBase);

export { SpacesRestrictions };
