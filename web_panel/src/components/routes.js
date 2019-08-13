import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PublisherMainLayout } from './'

export const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={PublisherMainLayout} />
    </Switch>
  );
}
