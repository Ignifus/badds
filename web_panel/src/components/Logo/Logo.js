import React from 'react';
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

  return (<a href="/">
    <Typography className={classes.orangeAvatar} variant="h3" {...props}>
      Badds
    </Typography>
  </a>);
};

export { Logo };
