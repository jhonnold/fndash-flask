import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import UserInfo from './UserInfo';
import About from './About';
import Homepage from './Homepage';
import SignUpPage from './SignUpPage';

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
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Homepage} />
      <Route path="/" render={() => <Redirect to="/" />} />
    </Switch>
  </React.Fragment>
);

export default Routes;
