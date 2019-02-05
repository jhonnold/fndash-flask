import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import UserInfo from './UserInfo';

const Routes = () => (
  <React.Fragment>
    <Route path="/users/:userId" component={Header} />
    <Route path="/users/:userId" component={UserInfo} />
    <Route exact path="/" render={() => <Redirect to="/users/1" />} />
  </React.Fragment>
);

export default Routes;
