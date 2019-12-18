import React from 'react';
import { Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export const Help = props => {
  return (<Tooltip title={props.title} placement="top">
    <HelpIcon />
  </Tooltip>)
}
