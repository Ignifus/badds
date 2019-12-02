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
  CardHeader
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import {ActionMenu} from './ActionMenu';

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
  }
}));

const SpaceCard = props => {
  const { className, space, onActionSelected, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <ActionMenu
            onActionSelected={(action) => onActionSelected(action, space.id)}
          />
        }
        title={space.application}
      />
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src={space.imageUrl}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {space.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          className={classes.productDescription}
        >
          { space.x } X { space.y }
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
              Updated { space.created_at } ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {space.totalPrints} Prints
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

SpaceCard.propTypes = {
  className: PropTypes.string,
  space: PropTypes.object.isRequired,
  onActionSelected: PropTypes.func.isRequired
};

export default SpaceCard;
