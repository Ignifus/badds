import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  orangeAvatar: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
})

const Logo = props => {
  const classes = useStyles();

  return (<RouterLink to="/">
    <Typography className={classes.orangeAvatar} variant="h3" {...props}>
      Badds
    </Typography>
  </RouterLink>);
};

export { Logo };
