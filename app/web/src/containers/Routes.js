import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserHome from './UserHome';

const Routes = () => (
  <Switch>
    <Route
      path="/users/:userId"
      component={UserHome}
    />
    <Route render={() => <Redirect to="/users/1" />} />
  </Switch>
);

export default Routes;
