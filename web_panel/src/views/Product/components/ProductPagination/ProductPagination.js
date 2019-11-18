import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const ProductPagination = props => {
  return (
    <React.Fragment>
      <Typography variant="caption">1-6 of 20</Typography>
      <IconButton>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton>
        <ChevronRightIcon />
      </IconButton>
    </React.Fragment>
  )
}

export { ProductPagination };
