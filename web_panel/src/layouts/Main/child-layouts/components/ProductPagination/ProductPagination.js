import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Typography, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { actions, selectors } from '../../../duck';

const ProductPaginationBase = props => {
  return (
    <Grid container>
      <Grid item xs={12} style={{marginTop: '15px'}}>
        <Typography variant="caption">
          {props.paginationData.resultsPortion} of {props.paginationData.count} results
        </Typography>
        <IconButton onClick={props.prev}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={props.next}>
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  paginationData: selectors.getPaginationData(state)
});

const mapDispatchToProps = {
  next: actions.next,
  prev: actions.prev
};

const ProductPagination = connect(mapStateToProps, mapDispatchToProps)(ProductPaginationBase);

export { ProductPagination };
