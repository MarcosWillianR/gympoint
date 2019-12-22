import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

import logo from '~/assets/images/logo.png';

export default function HeaderLogo() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
