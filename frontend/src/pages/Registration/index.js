import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Header, Wrapper, RegistrationDesc } from './styles';
import { Title, RegisterButton } from '~/styles/sharedStyles';

import Loading from '~/components/Loading';

import {
  getAllRequest,
  registrationDeleteRequest,
} from '~/store/modules/registration/actions';

export default function Registration() {
  const dispatch = useDispatch();
  const registrations = useSelector(state => state.registration.registrations);
  const loading = useSelector(state => state.registration.loading);

  useEffect(() => {
    dispatch(getAllRequest());
  }, []) // eslint-disable-line

  const handleDelete = registration_id => {
    const confirmDelete = window.confirm(
      'Tem certeza de que deseja excluir essa matricula?'
    );

    if (confirmDelete) {
      dispatch(registrationDeleteRequest(registration_id));
    }
  };
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

        {loading ? (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        ) : null}

        {registrations.map(registration => (
          <RegistrationDesc key={registration.id}>
            <span>{registration.Student.name}</span>
            <span>{registration.Plan.title}</span>
            <span>{registration.start_date_formatted}</span>
            <span>{registration.list_end_date_formatted}</span>
            <MdCheckCircle
              size={22}
              color={registration.active ? '#42cb59' : '#dddddd'}
            />
            <button type="button">editar</button>
            <button type="button" onClick={() => handleDelete(registration.id)}>
              apagar
            </button>
          </RegistrationDesc>
        ))}
      </Wrapper>
    </Container>
  );
}
