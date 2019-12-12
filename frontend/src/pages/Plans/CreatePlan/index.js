import React from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { Header, Wrapper } from './styles';
import { Container } from '~/styles/sharedStyles';

import history from '~/services/history';

export default function CreatePlan() {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <Container>
      <Header>
        <h1>Cadastro de plano</h1>
        <div>
          <button type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={22} color="#fff" />
            Voltar
          </button>
          <button type="submit" form="create_plan">
            <MdDone size={22} color="#fff" />
            Salvar
          </button>
        </div>
      </Header>
      <Wrapper>
        <Form id="create_plan" onSubmit={handleSubmit}>
          <div className="fully">
            <label>Título do Plano</label>
            <Input name="plan_title" />
          </div>
          <div className="one_third">
            <label>
              Duração <span>(em meses)</span>
            </label>
            <Input name="plan_duration" />
          </div>
          <div className="one_third">
            <label>Preço mensal</label>
            <Input
              name="plan_price"
              onChange={e => console.log(e.target.value)}
            />
          </div>
          <div className="one_third">
            <label>Preço total</label>
            <Input name="plan_total" disabled />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}
