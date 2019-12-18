import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export const Faq = props => {
  return (<IconButton
    color="inherit"
    component={Link}
    to="/ads/faq"
    title="Preguntas Frecuentes"
  >
    <Badge
      color="primary"
      variant="dot"
    >
      <HelpIcon />
    </Badge>
  </IconButton>)
}
