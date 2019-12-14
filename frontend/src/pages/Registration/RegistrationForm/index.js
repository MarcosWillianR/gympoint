import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import history from '~/services/history';

export default function RegistrationForm({ match }) {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro de matrícula</Title>
        <div>
          <button type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={22} color="#fff" />
            Voltar
          </button>
          <button type="submit" form="create_register">
            <MdDone size={22} color="#fff" />
            Salvar
          </button>
        </div>
      </Header>
      <Wrapper>
        <Form id="create_register" onSubmit={handleSubmit}>
          <div className="fully">
            <label htmlFor="student">Aluno</label>
            <Input
              id="student"
              type="text"
              name="student_name"
              placeholder="Buscar aluno"
            />
          </div>
          <div className="one_four">
            <label htmlFor="plan">Plano</label>
            <Input
              id="plan"
              type="text"
              name="plan_type"
              placeholder="Selecione o plano"
            />
          </div>
          <div className="one_four">
            <label htmlFor="initial_date">Data de início</label>
            <Input
              id="initial_date"
              type="text"
              name="plan_initial_date"
              placeholder="Escolha a data"
            />
          </div>
          <div className="one_four">
            <label htmlFor="end_date">Data de término</label>
            <Input id="end_date" type="text" name="plan_end_date" disabled />
          </div>
          <div className="one_four">
            <label htmlFor="final_value">Valor final</label>
            <Input id="final_value" type="text" name="plan_value" disabled />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
