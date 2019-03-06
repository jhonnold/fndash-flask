import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import UserInfo from './UserInfo';
import Homepage from './Homepage';

const Routes = () => (
  <React.Fragment>
    <Route exact path="/" component={Homepage} />
    <Route path="/users/:userId" component={Header} />
    <Route path="/users/:userId" component={UserInfo} />
  </React.Fragment>
);

export default Routes;
