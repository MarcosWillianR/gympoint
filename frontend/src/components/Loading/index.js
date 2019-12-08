import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Loader } from './styles';

export default function Loading({ size, color }) {
  return (
    <Wrapper>
      <Loader size={size} color={color} />
    </Wrapper>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: null,
  color: null,
};
