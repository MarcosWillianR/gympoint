import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/images/logo.png';

export default function SignIn() {
  const handleSubmit = data => {
    console.tron.log(data);
  };

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form onSubmit={handleSubmit}>
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
