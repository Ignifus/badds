import React from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const ProductPagination = props => {
  return (
    <Grid container>
      <Grid item xs={12} style={{marginTop: '15px'}}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export { ProductPagination };
