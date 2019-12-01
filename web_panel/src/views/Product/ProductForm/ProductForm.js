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
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
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
      description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props)
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.match.params.id == null) {
      this.props.createApp(this.state);
    } else {
      this.props.updateApp(this.state.id, this.state)
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  reset() {
    const { success, reset } = this.props;
    if (success) {
      setTimeout(() => {
          this.setState({
          name: '',
          domain: '',
          category: '',
          description: ''
        });
        reset();
      }, 2000)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != null) {
      this.props.fetchApp(this.props.match.params.id);
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
    if (success) {
      if (this.props.match.params.id === null) this.reset();
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {
          hasError && <FailedSnackbar message="Tuvimos un problema al procesar su request" />
        }
        {
          success && <SuccessSnackbar message="La app fue creada/actualizada exitosamente" />
        }
        <Grid container spacing={2}>
          {progressBar}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField label="Name"
                name="name"
                placeholder="Nombre de la app"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Domain"
                name="domain"
                placeholder="myapp.com"
                value={this.state.domain}
                onChange={this.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="badds-app-category-select">Categoria</InputLabel>
              <Select
                labelId="badds-app-category-select"
                value={this.state.category}
                onChange={this.handleChange}
                name="category"
              >
                <MenuItem value="1">Web</MenuItem>
                <MenuItem value="2">Android</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Descripcion"
                name="description"
                placeholder="Escriba descripcion de la aplicacion"
                value={this.state.description}
                onChange={this.handleChange}
                InputLabelProps={{ shrink: this.state.name !== '' }}
              />
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
  app: selectors.getApp(state)
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
