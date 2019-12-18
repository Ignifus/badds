import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

export const Home = props => {
  return (<IconButton
    color="inherit"
    component={Link}
    to="/ads"
    title="Salir de la app"
  >
    <Badge
      color="primary"
      variant="dot"
    >
      <HomeIcon />
    </Badge>
  </IconButton>)
}
