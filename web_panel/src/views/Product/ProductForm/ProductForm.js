import React from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  LinearProgress,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';

import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';
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
      category: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createApp(this.state);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    const { isLoading, hasError } = this.props;
    let progressBar = null;

    if (isLoading) {
      progressBar = (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }
    console.log(hasError)

    return (
      <form onSubmit={this.handleSubmit}>
        {
          hasError && <FailedSnackbar message="Tuvimos un problema al procesar su request" />
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


const useStyles = makeStyles({
  failed: {
    backgroundColor: 'red',
    color: 'yellow',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})
const FailedSnackbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open} autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent message={props.message} className={classes.failed} />
    </Snackbar>);
}

const mapStateToProps = state => ({
  isLoading: selectors.isLoading(state),
  hasError: selectors.hasError(state)
})

const mapActionsToProps = {
  createApp: actions.createApp
}

const Connected = connect(mapStateToProps, mapActionsToProps)(ProductFormBase);

const Styled = withStyles(styles)(Connected);
const ProductForm = withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: ToolbarActions
  })(Styled);


export { ProductForm };
