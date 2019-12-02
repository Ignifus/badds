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

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class SpaceFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      application: '',
      name: '',
      x: '',
      y: '',
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
      x: {
        presence: { allowEmpty: false },
        numericality: { greaterThan: 10, lessThan: 1920 }
      },
      y: {
        presence: { allowEmpty: false },
        length: { greaterThan: 10, lessThan: 1920 }
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
            x: '',
            y: '',
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.space.name !== this.props.space.name) {
      this.setState({ ...this.props.space });
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
          hasError && <FailedSnackbar message="Tuvimos un problema al procesar su request" />
        }
        {
          success && <SuccessSnackbar message="El espacio fue creado/actualizado exitosamente" />
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
                name="x"
                type="number"
                placeholder="ancho en pixeles"
                value={this.state.x}
                error={this.state.errors.x != null}
                helperText={this.state.errors.x != null ? this.state.errors.x[0] : ''}
                onChange={this.handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Alto"
                name="y"
                type="number"
                placeholder="alto en pixeles"
                value={this.state.y}
                error={this.state.errors.y != null}
                helperText={this.state.errors.y != null ? this.state.errors.y[0] : ''}
                onChange={this.handleChange}
                InputLabelProps={{ shrink: this.state.y !== '' }}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="badds-app-category-select">Categoria</InputLabel>
              <Select
                labelId="badds-app-category-select"
                value={this.state.application}
                onChange={this.handleChange}
                error={this.state.errors.application != null}
                name="category"
                required
              >
                <MenuItem value="1">Web</MenuItem>
                <MenuItem value="2">Android</MenuItem>
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
  space: selectors.getSpace(state)
});

const mapActionsToProps = {
  createSpace: actions.create,
  updateSpace: actions.update,
  fetchSpace: actions.fetch,
  reset: actions.reset
};

const SpaceForm = compose(
  withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: () => <span />
  }),
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
  withRouter,
)(SpaceFormBase);

export { SpaceForm };
