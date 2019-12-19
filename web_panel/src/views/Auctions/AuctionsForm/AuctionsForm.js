import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/moment';
import {
  Button,
  Grid,
  TextField,
  FormControl,
  LinearProgress,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import moment from 'moment';

import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar, Help } from '../../../components';
import { actions, selectors } from '../duck';

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class AuctionsFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      end_date: null,
      prints: '',
      contract_duration_days: '',
      time: null,
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const validationErrors = this.validate();
    if (this.state.time == null) {
      validationErrors.time = ["La hora es requerida"];
    }
    if (this.state.end_date == null) {
      validationErrors.end_date = ["La fecha es requerida"];
    }
    if (validationErrors) {
      return this.setState({ errors: validationErrors });
    } else {
      this.setState({ errors: [] });
    }

    const space = this.props.match.params.spaceId;
    const date = moment(this.state.end_date).format('YYYY-MM-DD');
    const time = moment(this.state.time).format('hh:mm:ss')
    const payload = {
      end_date: `${date}T${time}Z`,
      prints: this.state.prints,
      contract_duration_days: this.state.contract_duration_days,
    }

    if (this.props.match.params.id == null) {
      this.props.createAuction({ space, ...payload });
    } else {
      this.props.updateAuction(this.state.id, { space, ...payload });
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleDateChange(date) {
    this.setState({ end_date: date });
  }

  handleTimeChange(time) {
    this.setState({ time });
  }

  validate() {
    return validate(this.state, {
      prints: {
        presence: { allowEmpty: false },
        numericality: { greaterThan: 1 }
      },
      contract_duration_days: {
        presence: { allowEmpty: false },
        numericality: { greaterThan: 0, lessThan: 365 }
      },
      // end_date: {
      //   presence: { allowEmpty: false },
      //   datetime: true
      // }
    });
  }

  reset() {
    const { success, reset } = this.props;
    if (success) {
      setTimeout(() => {
          this.setState({
            end_date: null,
            time: null,
            prints: '',
            contract_duration_days: '',
            errors: {}
          });
        reset();
      }, 750)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != null) {
      this.props.fetchAuction(this.props.match.params.id);
    }
    // if (this.props.apps.length === 0) {
    //   this.props.fetch();
    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auction.prints !== this.props.auction.prints) {
      this.setState({ ...this.props.auction });
    }
  }

  render () {
    const { isLoading, hasError, success } = this.props;
    let progressBar = null;

    if (isLoading & !hasError) {
      progressBar = (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    if (success && this.props.match.params.id == null) {
      this.reset();
    }

    return (
      <form onSubmit={this.handleSubmit} noValidate>
        {
          hasError && <FailedSnackbar message="Tuvimos un problema al procesar su peticion" />
        }
        {
          success && <SuccessSnackbar message="Operacion concluida con exito" />
        }
        <Grid container spacing={2}>
          {progressBar}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Impresiones"
                name="prints"
                type="number"
                placeholder="Cantidad de impresiones"
                value={this.state.prints}
                error={this.state.errors.prints != null}
                helperText={this.state.errors.prints != null ? this.state.errors.prints[0] : ''}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: <Help title="Es la cantidad de veces que mi slot publicitario mostrara un aviso. Equivale a las visitas de un usuario." />
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Duracion"
                name="contract_duration_days"
                type="number"
                placeholder="cantidad de dias"
                value={this.state.contract_duration_days}
                error={this.state.errors.contract_duration_days != null}
                helperText={this.state.errors.contract_duration_days != null ? this.state.errors.contract_duration_days[0] : ''}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: <Help title="La duracion en dias del contrato." />
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha de finalizacion de la subasta"
                  format="DD/MM/YYYY"
                  value={this.state.end_date}
                  onChange={this.handleDateChange}
                  error={this.state.errors.end_date != null}
                  helperText={this.state.errors.end_date != null && this.state.errors.end_date[0]}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{marginTop: 0}}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Hora de finalizacion de la subasta (UTC datetime)"
                  value={this.state.time}
                  onChange={this.handleTimeChange}
                  error={this.state.errors.time != null}
                  helperText={this.state.errors.time != null && this.state.errors.time[0]}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{marginTop: '30px'}}>Submit</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
};

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state),
  auction: selectors.getAuction(state),
  // apps: ProductDuck.selectors.getList(state),
});

const mapActionsToProps = {
  createAuction: actions.create,
  updateAuction: actions.update,
  fetchAuction: actions.fetch,
  // fetchApps: ProductDuck.actions.list, // TODO: retry only 1 time
  reset: actions.reset
};

const AuctionsForm = compose(
  withProductLayout({
    title: 'Subastas',
    withPagination: false,
    Buttons: null
  }),
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
  withRouter,
)(AuctionsFormBase);

export { AuctionsForm };
