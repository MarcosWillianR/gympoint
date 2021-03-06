import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';

import Plans from '~/pages/Plans';
import PlanForm from '~/pages/Plans/PlanForm';

import Assistance from '~/pages/Assistance';

import Registration from '~/pages/Registration';
import RegistrationForm from '~/pages/Registration/RegistrationForm';

import Students from '~/pages/Students';
import StudentForm from '~/pages/Students/StudentForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/new_plan" component={PlanForm} isPrivate />
      <Route path="/edit_plan/:plan_id" component={PlanForm} isPrivate />

      <Route path="/help-orders" component={Assistance} isPrivate />

      <Route path="/registrations" component={Registration} isPrivate />
      <Route path="/new_registration" component={RegistrationForm} isPrivate />
      <Route
        path="/edit_registration/:reg_id"
        component={RegistrationForm}
        isPrivate
      />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/new_student" component={StudentForm} isPrivate />
      <Route
        path="/edit_student/:student_id"
        component={StudentForm}
        isPrivate
      />

      {/* }<Route path="/" component={() => <h1>404</h1>} />{ */}
    </Switch>
  );
}
