import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import RegisterNaver from '../pages/RegisterNaver';
import EditNaver from '../pages/EditNaver';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" component={Home} isPrivate />
        <Route exact path="/register" component={RegisterNaver} isPrivate />
        <Route exact path="/update/:id" component={EditNaver} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
