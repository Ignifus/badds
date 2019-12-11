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
import { ResourcesDuck } from '../duck/';
import { Label } from '@material-ui/icons';

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class ResourceFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url_link: '',
      image: '',
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

    const formData = new FormData();
    formData.set('name', this.state.name);
    formData.set('url_link', this.state.name);
    formData.set('advertisement', this.props.match.params.id);
    //TODO: validate
    formData.append('image', document.getElementById('resourceImage').files[0]);

    if (this.props.match.params.resourceId == null) {
      this.props.createResource(formData);
    } else {
      this.props.updateResource(this.state.id, formData)
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
    });
  }

  reset() {
    const { success, reset } = this.props;
    if (success) {
      setTimeout(() => {
          this.setState({
            name: '',
            url_link: '',
            image: '',
            errors: {}
          });
        reset();
      }, 750)
    }
  }

  componentDidMount() {
    if (this.props.match.params.resourceId != null) {
      this.props.fetchResource(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resource.name !== this.props.resource.name) {
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
      <form onSubmit={this.handleSubmit} id="resourceForm" encType="mulipart/form-data" noValidate>
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
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField
                label="URL"
                name="url_link"
                placeholder="url del recurso"
                value={this.state.url_link}
                error={this.state.errors.url_link != null}
                helperText={this.state.errors.url_link != null ? this.state.errors.url_link[0] : ''}
                onChange={this.handleChange}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Button
                color="secondary"
                variant="contained"
                component="label"
              >
                Cargar Imagen
                <input
                  type="file"
                  name="image"
                  id="resourceImage"
                  style={{ display: "none" }}
                />
              </Button>
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
  isLoading: ResourcesDuck.selectors.isLoading(state),
  hasError: ResourcesDuck.selectors.hasError(state),
  success: ResourcesDuck.selectors.success(state),
  resource: ResourcesDuck.selectors.getResource(state),
});

const mapActionsToProps = {
  createResource: ResourcesDuck.actions.create,
  updateResource: ResourcesDuck.actions.update,
  fetchResource: ResourcesDuck.actions.fetch,
  reset: ResourcesDuck.actions.reset
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
