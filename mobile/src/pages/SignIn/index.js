import React, { useRef } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/images/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const studentIDRef = useRef();

  function handleSubmit() {}
  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          ref={studentIDRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
