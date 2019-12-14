import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import { Container, Header, Wrapper, RegistrationDesc } from './styles';
import { Title, RegisterButton } from '~/styles/sharedStyles';

export default function Registration() {
  return (
    <Container>
      <Header>
        <Title>Gerenciando matrículas</Title>
        <Link to="/new_registration">
          <RegisterButton type="button">
            <MdAdd size={22} color="#fff" />
            Cadastrar
          </RegisterButton>
        </Link>
      </Header>

      <Wrapper>
        <strong>Aluno</strong>
        <strong>Plano</strong>
        <strong>Início</strong>
        <strong>Término</strong>
        <strong>Ativa</strong>

        {/* {loading ? (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        ) : null} */}

        <RegistrationDesc>
          <span>Lennert Nijenbijvank</span>
          <span>Start</span>
          <span>30 de Abril de 2019</span>
          <span>30 de Maio de 2019</span>
          <MdCheckCircle size={22} color="#42cb59" />
          <button type="button">editar</button>
          <button type="button">apagar</button>
        </RegistrationDesc>

        <RegistrationDesc>
          <span>Sebastian Westergren</span>
          <span>Diamond</span>
          <span>14 de Outubro de 2019</span>
          <span>14 de Abril de 2020</span>
          <MdCheckCircle size={22} color="#dddddd" />
          <button type="button">editar</button>
          <button type="button">apagar</button>
        </RegistrationDesc>
      </Wrapper>
    </Container>
  );
}
