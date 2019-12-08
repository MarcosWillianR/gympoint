import React from 'react';
import PropTypes from 'prop-types';
import { Route as ReactRouter, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function Route({ component: Component, isPrivate, ...rest }) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <ReactRouter
      // eslint-disable-next-line
      {...rest}
      render={props => (
        <Layout>
          {/* eslint-disable-next-line */}
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

Route.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

Route.defaultProps = {
  isPrivate: false,
};
