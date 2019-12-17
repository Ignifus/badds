import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'

export const ToolbarActions = props => (
  <React.Fragment>
    <Button
      color="primary"
      variant="contained"
      component={Link}
      to="/ads/publishers/auctions/add"
    >
      Crear Subasta
    </Button>
  </React.Fragment>
)
