import React, { Component } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import { withProductLayout } from '../../../layouts/Main';
import { actions, selectors } from '../duck';

const styles = theme => ({
  media: {
    height: 140,
  },
  dimensions: {
    width: '100%',
    height: '100px'
  }
});

class MarketBase extends Component {
  static defaultProps = {
    auctions: []
  };

  componentDidMount() {
    this.props.listAll();
  }

  render() {
    const { classes, auctions } = this.props;

    return (<Grid container spacing={2}>
    {
    auctions.map(auction => (
      <Grid item xs={3} key={auction.id}>
        <Card>
          <CardActionArea>
            <CardHeader
              className={classes.media}
              component={() => (
                <Avatar variant="square" className={classes.dimensions}>
                  <Typography variant="h2">
                    {auction.space.x_size} x {auction.space.y_size}
                  </Typography>
                </Avatar>)
              }
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {auction.space.application.domain}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {auction.prints} prints
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              component={Link}
              to={`/ads/advertisers/biddings/${auction.id}`}
              fullWidth
            >
              Ofertar
            </Button>
          </CardActions>
        </Card>
      </Grid>))
    }
    </Grid>)
  }
}

const mapStateToProps = (state) => ({
  auctions: selectors.getList(state)
});

const mapDispatchToProps = {
  listAll: actions.listAll
};


const Market = compose(
  withProductLayout({
    title: 'Espacios en Oferta',
    withPagination: true,
    Buttons: null
  }),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(MarketBase);

export { Market };
