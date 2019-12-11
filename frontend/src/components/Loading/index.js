import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Loader } from './styles';

export default function Loading({ size, color, align, margin }) {
  return (
    <Wrapper align={align} margin={margin}>
      <Loader size={size} color={color} />
    </Wrapper>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string,
  margin: PropTypes.string,
};

Loading.defaultProps = {
  size: null,
  color: null,
  align: null,
  margin: null,
};
