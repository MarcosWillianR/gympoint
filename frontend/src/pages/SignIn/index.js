import React, { useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.png';

import Loading from '~/components/Loading';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Campo obrigatório'),
  senha: Yup.string().required('Campo obrigatório'),
});

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const isLoading = useMemo(() => {
    return loading ? <Loading /> : 'Entrar no sistema';
  }, [loading]);

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

        <button type="submit">{isLoading}</button>
      </Form>
    </>
  );
}
