import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  TextField,
  FormControl,
  LinearProgress,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { actions, selectors } from '../duck/ads';

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class AdvertisementFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const validationErrors = this.validate();
    if (validationErrors) {
      return this.setState({ errors: validationErrors });
    } else {
      this.setState({ errors: [] });
    }

    if (this.props.match.params.id == null) {
      this.props.createAd(this.state);
    } else {
      this.props.updateAd(this.state.id, this.state)
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  validate() {
    return validate(this.state, {
      name: {
        presence: { allowEmpty: false },
        length: { minimum: 3 }
      },
      description: {
        presence: { allowEmpty: false },
        length: { minimum: 30, maximum: 150 }
      }
    });
  }

  reset() {
    const { success, reset } = this.props;
    if (success) {
      setTimeout(() => {
          this.setState({
          name: '',
          description: '',
          errors: {}
        });
        reset();
      }, 750)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != null && this.props.app.id == null) {
      this.props.fetchAd(this.props.match.params.id);
    } else if (this.props.app.id != null) {
      this.setState({ ...this.props.app });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.app.name !== this.props.app.name) {
      this.setState({ ...this.props.app });
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
              <TextField label="Name"
                name="name"
                placeholder="Nombre de la app"
                value={this.state.name}
                error={this.state.errors.name != null}
                helperText={this.state.errors.name != null ? this.state.errors.name[0] : ''}
                onChange={this.handleChange}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField
                label="Descripcion"
                name="description"
                placeholder="Escriba descripcion de la aplicacion"
                value={this.state.description}
                error={this.state.errors.description != null}
                helperText={this.state.errors.description != null ? this.state.errors.description[0] : ''}
                onChange={this.handleChange}
                InputLabelProps={{ shrink: this.state.description !== '' }}
                required
              />
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
  app: selectors.getAd(state)
});

const mapActionsToProps = {
  createAd: actions.create,
  updateAd: actions.update,
  fetchAd: actions.fetch,
  reset: actions.reset
};

const AdvertisementForm = compose(
  withProductLayout({
    title: 'Avisos',
    withPagination: false,
    Buttons: () => <span />
  }),
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
  withRouter,
)(AdvertisementFormBase);

export { AdvertisementForm };
