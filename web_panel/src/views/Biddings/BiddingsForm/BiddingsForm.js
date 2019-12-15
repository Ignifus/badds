import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  LinearProgress,
  FormHelperText,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar } from '../../../components';
import { AdvertisementDuck } from '../../Advertisements';
import { actions, selectors } from '../duck';
import { AuctionDuck } from 'views/Auctions';

const styles = theme => ({
  snackbar: { backgroundColor: 'red' }
});

class BiddingFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ppp_usd: '',
      advertisement: '',
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

    const {id, auctionId} = this.props.match.params;

    if (id == null) {
      this.props.createBidding({
        auction: auctionId,
        ppp_usd: this.state.ppp_usd,
        advertisement: this.state.advertisement
      });
    } else {
      this.props.updateBidding(this.state.id, {
        auction: auctionId,
        ppp_usd: this.state.ppp_usd,
        advertisement: this.state.advertisement
      })
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  validate() {
    return validate(this.state, {
      ppp_usd: {
        presence: { allowEmpty: false },
      },
      advertisement: {
        presence: { allowEmpty: false },
      },
    });
  }

  reset() {
    const { success, reset } = this.props;
    if (success) {
      setTimeout(() => {
          this.setState({
          ppp_usd: 0,
          advertisement: '',
          errors: {}
        });
        reset();
      }, 750)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != null) {
      this.props.fetchBidding(this.props.match.params.id);
    }

    if (this.props.auction == null) {
      this.props.fetchAuctions();
    }
    this.props.fetchAds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bidding.id !== this.props.bidding.id) {
      this.setState({ ...this.props.bidding });
    }
  }

  render () {
    const { isLoading, hasError, success, ads, auction } = this.props;
    let progressBar = null;

    if (isLoading & !hasError) {
      progressBar = (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    let detail = null;
    if (auction) {
      detail = this.renderDetail();
    }

    if (success && this.props.match.params.id == null) {
      this.reset();
    }
    // TODO agregar datos de la compra
    return (
      <Grid container>
        {detail}
        <Grid item xs={12}>
          <Typography variant="h4">Datos de confirmacion</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit} noValidate>
            {
              hasError && <FailedSnackbar message="Tuvimos un problema al procesar su peticion" />
            }
            {
              success && <SuccessSnackbar message="Operacion concluida con exito" />
            }
            <Grid container spacing={2}>
              {progressBar}
              <Divider />
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField label="PPP USD"
                    name="ppp_usd"
                    type="number"
                    placeholder="Pago por Impresion"
                    value={this.state.ppp_usd}
                    error={this.state.errors.ppp_usd != null}
                    helperText={this.state.errors.ppp_usd != null ? this.state.errors.ppp_usd[0] : ''}
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="badds-app-category-select">Aviso</InputLabel>
                  <Select
                    labelId="badds-app-category-select"
                    value={this.state.advertisement}
                    onChange={this.handleChange}
                    error={this.state.errors.advertisement != null}
                    name="advertisement"
                    required
                  >
                    {
                      ads.map(ad => <MenuItem key={ad.id} value={ad.id}>{ad.name}</MenuItem>)
                    }
                  </Select>
                  <FormHelperText error>{this.state.errors.advertisement != null ? this.state.errors.advertisement[0] : ''}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{marginTop: '30px'}}>Confirmar Compra</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }

  renderDetail() {
    const { auction } = this.props;

    return (<Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Detalles de compra</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="strong">Detalles</Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Nombr de la App"
                secondary={auction.space.application.name}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dominio"
                secondary={auction.space.application.domain}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dimensiones"
                secondary={`${auction.space.x_size} x ${auction.space.y_size}`}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography component="strong">Restricciones</Typography>
          <List>
            {
              auction.space.restrictions.map(restriction => (<ListItem key={restriction.restriction__restriction}>
                <ListItemText
                  primary={restriction.restriction__restriction}
                  secondary={restriction.value}
                />
              </ListItem>))
            }
          </List>
        </Grid>
      </Grid>
    </Grid>);
  }
};

const mapStateToProps = (state, props) => ({
  isLoading: selectors.isLoading(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state),
  bidding: selectors.getBidding(state),
  ads: AdvertisementDuck.selectors.getList(state),
  auction: AuctionDuck.selectors.getAuctionById(state, props),
});

const mapActionsToProps = {
  createBidding: actions.create,
  updateBidding: actions.update,
  fetchBidding: actions.fetch,
  reset: actions.reset,
  fetchAds: AdvertisementDuck.actions.list,
  fetchAuctions: AuctionDuck.actions.listAll
};

const BiddingForm = compose(
  withProductLayout({
    title: 'Form',
    withPagination: false,
    Buttons: () => <span />
  }),
  withRouter,
  connect(mapStateToProps, mapActionsToProps),
  withStyles(styles),
)(BiddingFormBase);

export { BiddingForm };
