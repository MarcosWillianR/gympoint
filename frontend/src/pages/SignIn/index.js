import React, { useMemo, useRef } from 'react';
import { Form } from '@unform/web';

import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import { Input } from '~/components/Form';
import validation from './validation';

import Loading from '~/components/Loading';
import logo from '~/assets/images/logo.png';

export default function SignIn() {
  const formRef = useRef(null);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const isLoading = useMemo(() => {
    return loading ? <Loading /> : 'Entrar no sistema';
  }, [loading]);

  async function handleSubmit({ email, password }, { reset }) {
    const { error } = await validation({ email, password }, formRef);

    if (!error) {
      dispatch(signInRequest(email, password));

      reset();
    }
  };

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="exemplo@email.com"
        />
        <label htmlFor="senha">Sua senha</label>
        <Input
          name="password"
          id="senha"
          type="password"
          placeholder="*************"
        />

        <button type="submit">{isLoading}</button>
      </Form>
    </>
  );
}
