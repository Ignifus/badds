import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  LinearProgress,
  FormHelperText,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { actions, selectors } from '../duck';
import { ProductDuck } from '../../Product';

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class ResourceFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      application: '',
      name: '',
      x_size: '',
      y_size: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const validationErrors = this.validate();
    console.log(validationErrors);
    if (validationErrors) {
      return this.setState({ errors: validationErrors });
    } else {
      this.setState({ errors: [] });
    }

    if (this.props.match.params.id == null) {
      this.props.createSpace(this.state);
    } else {
      this.props.updateSpace(this.state.id, this.state)
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
      application: {
        presence: { allowEmpty: false },
      },
      x_size: {
        presence: { allowEmpty: false },
        numericality: { greaterThan: 10, lessThan: 1920 }
      },
      y_size: {
        presence: { allowEmpty: false },
        numericality: { greaterThan: 10, lessThan: 1920 }
      }
    });
  }

  reset() {
    const { success, reset } = this.props;
    if (success) {
      setTimeout(() => {
          this.setState({
            application: '',
            name: '',
            x_size: '',
            y_size: '',
            errors: {}
          });
        reset();
      }, 750)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != null) {
      this.props.fetchSpace(this.props.match.params.id);
    }
    if (this.props.apps.length === 0) {
      this.props.fetchApps();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.space.name !== this.props.space.name) {
      this.setState({ ...this.props.space });
    }
  }

  render () {
    const { isLoading, hasError, success, apps } = this.props;
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
                placeholder="Nombre del espacio"
                value={this.state.name}
                error={this.state.errors.name != null}
                helperText={this.state.errors.name != null ? this.state.errors.name[0] : ''}
                onChange={this.handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Ancho"
                name="x_size"
                type="number"
                placeholder="ancho en pixeles"
                value={this.state.x_size}
                error={this.state.errors.x_size != null}
                helperText={this.state.errors.x_size != null ? this.state.errors.x_size[0] : ''}
                onChange={this.handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Alto"
                name="y_size"
                type="number"
                placeholder="alto en pixeles"
                value={this.state.y_size}
                error={this.state.errors.y_size != null}
                helperText={this.state.errors.y_size != null ? this.state.errors.y_size[0] : ''}
                onChange={this.handleChange}
                InputLabelProps={{ shrink: this.state.y_size !== '' }}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="badds-app-application-select">Categoria</InputLabel>
              <Select
                labelId="badds-app-application-select"
                value={this.state.application}
                onChange={this.handleChange}
                error={this.state.errors.application != null}
                name="application"
                required
              >
                { apps.map(app => <MenuItem key={app.id} value={app.id}>{app.domain}</MenuItem>) }
              </Select>
              <FormHelperText error>{this.state.errors.application != null ? this.state.errors.application[0] : ''}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Button
              type="submit"
              color="primary"
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
  space: selectors.getSpace(state),
  apps: ProductDuck.selectors.getList(state),
});

const mapActionsToProps = {
  createSpace: actions.create,
  updateSpace: actions.update,
  fetchSpace: actions.fetch,
  fetchApps: ProductDuck.actions.list, // TODO: retry only 1 time
  reset: actions.reset
};

const ResourceForm = compose(
  withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: () => <span />
  }),
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
  withRouter,
)(ResourceFormBase);

export { ResourceForm };
