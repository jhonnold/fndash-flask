import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import UserInfo from './UserInfo';

const Routes = () => (
  <React.Fragment>
    <Route path="/users/:userId" component={Header} />
    <Route path="/users/:userId" component={UserInfo} />
  </React.Fragment>
);

export default Routes;
