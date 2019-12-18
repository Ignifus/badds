import React from 'react';
import { Badge, IconButton } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export const Logout = props => {
  return (<IconButton
    color="inherit"
    component="a"
    href="/logout_auth"
    title="Salir de la app"
  >
    <Badge
      color="primary"
      variant="dot"
    >
      <PowerSettingsNewIcon />
    </Badge>
  </IconButton>)
}
