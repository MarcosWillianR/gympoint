import React from 'react';
import PropTypes from 'prop-types';
import { Route as ReactRouter, Redirect } from 'react-router-dom';

export default function Route({ component: Component, isPrivate, ...rest }) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="dashboard" />;
  }

  // eslint-disable-next-line
  return <ReactRouter {...rest} component={Component} />;
}

Route.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

Route.defaultProps = {
  isPrivate: false,
};
