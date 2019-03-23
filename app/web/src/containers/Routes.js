import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import UserInfo from './UserInfo';
import About from './About';
import Homepage from './Homepage';

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route
        path="/users/:userId"
        render={routeProps => (
          <React.Fragment>
            <Header {...routeProps} />
            <UserInfo {...routeProps} />
          </React.Fragment>
        )}
      />
      <Route path="/about" component={About} />
      <Route path="/" component={Homepage} />
    </Switch>
  </React.Fragment>
);

export default Routes;
