import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PlayerPages from './player/PlayerPages';
import About from './About';
import Homepage from './Homepage';
import SignUpPage from './SignUpPage';

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route path="/users/:userId" component={PlayerPages} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Homepage} />
      <Route path="/" render={() => <Redirect to="/" />} />
    </Switch>
  </React.Fragment>
);

export default Routes;
