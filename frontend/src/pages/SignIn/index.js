import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Campo obrigatório'),
  senha: Yup.string().required('Campo obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  const handleSubmit = ({ email, senha }) => {
    dispatch(signInRequest(email, senha));
  };

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="exemplo@email.com"
        />
        <label htmlFor="senha">Sua senha</label>
        <Input
          name="senha"
          id="senha"
          type="password"
          placeholder="*************"
        />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
