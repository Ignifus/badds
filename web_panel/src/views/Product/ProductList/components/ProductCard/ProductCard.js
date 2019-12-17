import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import {ActionMenu} from './ActionMenu';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '260px',
  },
  productDescription: {
    minHeight: '65px',
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: '100%',
    height: '80px',
    color: 'yellow',
    fontWeight: 'bold',
    backgroundColor: '#222'
  }
}));

const ProductCard = props => {
  const { className, product, onActionSelected, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <ActionMenu
            onActionSelected={(action) => onActionSelected(action, product.id)}
          />
        }
        title={product.domain}
      />
      <CardContent>
        <Avatar src={product.logo} variant="square" className={classes.avatar}>
          {product.name}
        </Avatar>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          className={classes.productDescription}
        >
          {product.description || "Please, provide a description for your product"}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Creado hace { moment().diff(product.created_at, 'days') } dias
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon className={classes.statsIcon} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  onActionSelected: PropTypes.func.isRequired
};

export default ProductCard;
