import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/images/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const studentIDRef = useRef();

  const loading = useSelector(state => state.auth.loading);

  const [studentId, setStudentId] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(studentId));
  }
  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          ref={studentIDRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={studentId}
          onChangeText={setStudentId}
        />

        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
