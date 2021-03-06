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
import { FailedSnackbar, SuccessSnackbar, Help } from '../../../components';
import { AppDuck } from '../../../duck';
import { actions, selectors } from '../duck';

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class ProductFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      domain: '',
      category: '',
      description: '',
      logo: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = document.getElementById('resourceLogo').files[0];
    const validationErrors = this.validate() || {};
    const formData = new FormData();
    if (file == null) {
      validationErrors.logo = ["Debe cargar una imagen"];
    } else {
      formData.append('image', file);
    }

    if (validationErrors.length > 0) {
      return this.setState({ errors: validationErrors });
    } else {
      this.setState({ errors: [] });
    }

    formData.set('name', this.state.name);
    formData.set('domain', this.state.domain);
    formData.set('category', this.state.category);
    formData.set('description', this.state.description);

    if (this.props.match.params.id == null) {
      this.props.createApp(formData);
    } else {
      this.props.updateApp(this.state.id, formData)
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  imageChange(e) {
    const file = e.target.files[0];
    if (file != null) {
      this.setState({ logo: file.name, errors: { ...this.state.errors, logo: undefined } })
    }
  }

  validate() {
    return validate(this.state, {
      name: {
        presence: { allowEmpty: false },
        length: { minimum: 3 }
      },
      domain: {
        presence: { allowEmpty: false },
      },
      category: {
        presence: { allowEmpty: false },
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
          domain: '',
          category: '',
          description: '',
          logo: '',
          errors: {}
        });
        document.getElementById('resourceLogo').value = '';
        reset();
      }, 750)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != null && this.props.app.name === '') {
      this.props.fetchApp(this.props.match.params.id);
    } else if (this.props.app.name !== '') {
      this.setState({ ...this.props.app });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.app.name !== this.props.app.name) {
      this.setState({ ...this.props.app });
    }
  }

  render () {
    const { isLoading, hasError, success, appCategories } = this.props;
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
      <form onSubmit={this.handleSubmit} encType="mulipart/form-data" noValidate>
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
                placeholder="Nombre de la app"
                value={this.state.name}
                error={this.state.errors.name != null}
                helperText={this.state.errors.name != null ? this.state.errors.name[0] : ''}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: <Help title="Nombre de la applicacion" />
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Domain"
                name="domain"
                placeholder="myapp.com"
                value={this.state.domain}
                error={this.state.errors.domain != null}
                helperText={this.state.errors.domain != null ? this.state.errors.domain[0] : ''}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: <Help title="Dominio de la app. Ejemplo: app.com.ar" />
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="badds-app-category-select">Categoria</InputLabel>
              <Select
                labelId="badds-app-category-select"
                value={this.state.category}
                onChange={this.handleChange}
                error={this.state.errors.category != null}
                name="category"
                required
              >
                {
                  appCategories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.category}</MenuItem>)
                }
              </Select>
              <FormHelperText error>{this.state.errors.category != null ? this.state.errors.category[0] : ''}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
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
                InputProps={{
                  endAdornment: <Help title="Escriba una breve descripcion de su aplicacion. 150 caracteres." />
                }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <Button
                color="secondary"
                component="label"
                style={{marginTop: '30px'}}
              >
                Cargar Imagen
                <input
                  type="file"
                  name="logo"
                  id="resourceLogo"
                  style={{ display: "none" }}
                  onChange={this.imageChange}
                />
              </Button>
              { this.state.logo != null && <FormHelperText>{this.state.logo}</FormHelperText> }
              { this.state.errors.logo != null && <FormHelperText error>{ this.state.errors.logo[0] }</FormHelperText> }
              { this.state.logo != null && <img src={this.state.logo} alt="App Logo" width="250" /> }
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
  app: selectors.getApp(state),
  appCategories: AppDuck.selectors.getAppCategories(state)
});

const mapActionsToProps = {
  createApp: actions.create,
  updateApp: actions.update,
  fetchApp: actions.fetch,
  reset: actions.reset
};

const ProductForm = compose(
  withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: () => <span />
  }),
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
  withRouter,
)(ProductFormBase);

export { ProductForm };
