import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core/';
import {Link} from 'react-router-dom';

const areas = [
  {
    letter: 'P',
    title: 'Publishers',
    description: 'Area Publisers. Registrar apps, espacios de publicidad, restricciones, settings de la API.',
    link: '/ads/publishers',
    className: 'blackYellow',
  },
  {
    letter: 'A',
    title: 'Advertisers',
    description: 'Area Advertisers. Registrar banners, configuracion de impresiones, progreso de pautas, settings de la API.',
    link: '/ads/advertisers',
    className: 'greenBlack',
  },
];

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
    fontWeight: "bold",
  },
  blackYellow: {
    backgroundColor: 'black',
    color: 'yellow'
  },
  greenBlack: {
    backgroundColor: 'lightgreen',
    color: 'black'
  },
  card: {
    maxWidth: 345,
  },
});

const AreaAvatar = props => {
  const {avatarClassName} = props;
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={clsx(classes.bigAvatar, classes[avatarClassName])}>{props.letter}</Avatar>
    </Grid>);
}

const Area = props => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" component="h2">Selecciona el area</Typography>
      </Grid>
      {
        areas.map(area => (
          <Grid item key={area.letter}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to={area.link}>
                <CardMedia
                  height="140"
                >
                  <AreaAvatar avatarClassName={area.className} letter={area.letter}/>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">{area.title}</Typography>
                  <Typography variant="body2" color="textSecondary" component="p">{area.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>))
      }
    </Grid>)
}

export default Area;
