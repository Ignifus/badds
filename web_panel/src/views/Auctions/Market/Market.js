import React, { Component } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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
  render() {
    const { classes } = this.props;

    return (<Grid container spacing={2}>
    {
    [1,2,3,4,5,6,7,8,9,10,11,12].map(auction => (
      <Grid item xs={3}>
        <Card>
          <CardActionArea>
            <CardHeader
              className={classes.media}
              component={() => (
                <Avatar variant="square" className={classes.dimensions}>
                  <Typography variant="h2">200 x 450</Typography>
                </Avatar>)
              }
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                lizard.com
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                1000 prints at 25USD
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              component={Link}
              to={`/ads/advertisers/biddings/${auction}`}
              fullWidth
            >
              Comprar
            </Button>
          </CardActions>
        </Card>
      </Grid>))
    }
    </Grid>)
  }
}

const Market = compose(
  withProductLayout({
    title: 'Apps',
    withPagination: true,
    Buttons: () => <span />
  }),
  withStyles(styles),
)(MarketBase);

export { Market };
