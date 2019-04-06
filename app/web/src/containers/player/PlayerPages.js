import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerHeader from './PlayerHeader';
import PlayerFilters from './PlayerFilters';
import PlayerOverview from './PlayerOverview';

export default () => (
  <React.Fragment>
    <Route component={PlayerHeader} />
    <Route component={PlayerFilters} />
    <Switch>
      <Route path="/users/:userId" component={PlayerOverview} />
    </Switch>
  </React.Fragment>
);
