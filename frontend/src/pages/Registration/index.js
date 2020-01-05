import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { parseISO } from 'date-fns';

import { Container, Header, Wrapper, RegistrationDesc } from './styles';
import { Title, RegisterButton } from '~/styles/sharedStyles';

import history from '~/services/history';
import api from '~/services/api';

import toast from '~/util/toastStyle';
import { priceFormatter, dateListFormat } from '~/util/formater';

import Loading from '~/components/Loading';

import { registrationDeleteRequest } from '~/store/modules/registration/actions';

export default function Registration() {
  const dispatch = useDispatch();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function getAllRegistrations() {
      try {
        const response = await api.get('/registrations');

        const data = response.data.map(registration => {
          const {
            active,
            id,
            start_date,
            end_date,
            price,
            Student,
            Plan,
          } = registration;

          const priceFormatted = priceFormatter(price);
          const list_end_date_formatted = dateListFormat(end_date);
          const start_date_formatted = dateListFormat(start_date);

          return {
            active,
            id,
            Student,
            start_date: parseISO(start_date),
            Plan,
            priceFormatted,
            list_end_date_formatted,
            start_date_formatted,
          };
        });

        setRegistrations(data);
      } catch (error) {
        toast(
          'Falha ao tentar listar as matrículas',
          '#e54b64',
          '#fff',
          '#fff'
        );
      }
    }
    getAllRegistrations();
  }, []); // eslint-disable-line

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

        {!registrations.length ? (
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
            <button
              type="button"
              onClick={() =>
                history.push(`/edit_registration/${registration.id}`)
              }
            >
              editar
            </button>
            <button type="button" onClick={() => handleDelete(registration.id)}>
              apagar
            </button>
          </RegistrationDesc>
        ))}
      </Wrapper>
    </Container>
  );
}
