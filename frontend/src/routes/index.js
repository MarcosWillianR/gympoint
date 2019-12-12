import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';

import Plans from '~/pages/Plans';
import CreatePlan from '~/pages/Plans/CreatePlan';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/new_plan" component={CreatePlan} isPrivate />
      {/* }<Route path="/" component={() => <h1>404</h1>} />{ */}
    </Switch>
  );
}
