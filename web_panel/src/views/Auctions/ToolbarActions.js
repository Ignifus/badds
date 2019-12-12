import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'

export const ToolbarActions = props => (
  <React.Fragment>
    <Button className={props.classes.importButton}>Import</Button>
    <Button className={props.classes.exportButton}>Export</Button>
    <Button
      color="primary"
      variant="contained"
      component={Link}
      to="/ads/publishers/spaces/add"
    >
      Add product
    </Button>
  </React.Fragment>
)
