import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core'

export const ToolbarActions = props => (
  <React.Fragment>
    <Button className={props.classes.importButton}>Import</Button>
    <Button className={props.classes.exportButton}>Export</Button>
    <Button
      color="primary"
      variant="contained"
      component={Link}
      to="/ads/advertisers/ads/add"
    >
      Add product
    </Button>
  </React.Fragment>
)

export const ResourceToolbarActions = props => {
  const { id } = useParams();
  return (
    <React.Fragment>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to={`/ads/advertisers/ads/${id}/resources/add`}
      >
        Add product
      </Button>
    </React.Fragment>
  )
}
