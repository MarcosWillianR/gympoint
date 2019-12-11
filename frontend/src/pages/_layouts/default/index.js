import React from 'react';
import PropTypes from 'prop-types';
import history from '~/services/history';

import { Wrapper } from './styles';

import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header history={history} />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
