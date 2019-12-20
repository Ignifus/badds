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
  FormHelperText
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar, Help } from '../../../components';
import { ResourcesDuck } from '../duck/';

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
      text: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = document.getElementById('resourceImage').files[0];
    const validationErrors = this.validate();
    if (file == null) {
      validationErrors.image = ["Debe cargar una imagen"];
    }

    if (validationErrors) {
      return this.setState({ errors: validationErrors });
    } else {
      this.setState({ errors: [] });
    }

    const formData = new FormData();
    formData.set('name', this.state.name);
    formData.set('url_link', this.state.url_link);
    formData.set('text', this.state.text);
    formData.set('advertisement', this.props.match.params.id);
    //TODO: validate
    formData.append('image', file);

    if (this.props.match.params.resourceId == null) {
      this.props.createResource(formData);
    } else {
      this.props.updateResource(this.state.id, formData)
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  imageChange(e) {
    const file = e.target.files[0];
    if (file != null) {
      this.setState({ image: file.name, errors: { ...this.state.errors, image: undefined } })
    }
  }

  validate() {
    return validate(this.state, {
      name: {
        presence: { allowEmpty: false },
        length: { minimum: 3 }
      },
      url_link: {
        presence: { allowEmpty: false },
        length: { minimum: 3 }
      },
      text: {
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
            text: '',
            errors: {}
          });
          document.getElementById('resourceLogo').value = '';
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

    if (success) {
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
          <Grid item lg={4} xs={12}>
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
          <Grid item lg={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="URL"
                name="url_link"
                placeholder="enlace del aviso"
                value={this.state.url_link}
                error={this.state.errors.url_link != null}
                helperText={this.state.errors.url_link != null ? this.state.errors.url_link[0] : ''}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: <Help title="La url al cual el usuario es redirigido al hacer click/touch sobre el aviso" />
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Texto Alternativo"
                name="text"
                placeholder="texto para carga erronea"
                value={this.state.text}
                error={this.state.errors.text != null}
                helperText={this.state.errors.text != null ? this.state.errors.text[0] : ''}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: <Help title="Si existe un error en la carga de la imagen, este texto alternativo se vera en su lugar" />
                }}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{marginTop: '15px'}}>
          <Grid item lg={4} xs={12}>
            <FormControl>
              <Button
                color="secondary"
                component="label"
              >
                Cargar Imagen
                <input
                  type="file"
                  name="image"
                  id="resourceImage"
                  style={{ display: "none" }}
                  onChange={this.imageChange}
                />
              </Button>
              { this.state.image != null && <FormHelperText>{this.state.image}</FormHelperText> }
              { this.state.errors.image != null && <FormHelperText error>{ this.state.errors.image[0] }</FormHelperText> }
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
    title: 'Recursos (imagenes)',
    withPagination: false,
    Buttons: null
  }),
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
  withRouter,
)(ResourceFormBase);

export { ResourceForm };
