import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserHome from './UserHome';

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route path="/users/:userId" component={UserHome} />
      <Route render={() => <Redirect to="/users/1" />} />
    </Switch>
  </React.Fragment>
);

export default Routes;
