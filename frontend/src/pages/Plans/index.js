import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { priceFormatter } from '~/util/formater';

import { plansDeleteRequest } from '~/store/modules/plans/actions';

import api from '~/services/api';
import toast from '~/util/toastStyle';

import { Header, Wrapper, PlansDesc } from './styles';
import { Container, Title, RegisterButton } from '~/styles/sharedStyles';

import Loading from '~/components/Loading';

import history from '~/services/history';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('/plans');

        const data = response.data.map(plan => {
          const textDurationFormat = plan.duration > 1 ? 'meses' : 'mês';
          const totalPrice = plan.duration * plan.price;

          return {
            ...plan,
            totalPrice: priceFormatter(totalPrice),
            priceFormatted: priceFormatter(plan.price),
            durationFormatted: `${plan.duration} ${textDurationFormat}`,
          };
        });

        setPlans(data);
      } catch (err) {
        toast('Erro ao tentar listar os planos', '#e54b64', '#fff', '#fff');
      }
    }
    getPlans();
  }, []); // eslint-disable-line

  const handleDeletePlan = plan_id => {
    const confirmDelete = window.confirm(
      'Tem certeza de que deseja excluir esse plano?'
    );

    if (confirmDelete) {
      dispatch(plansDeleteRequest(plan_id));
    }
  };

  return (
    <Container>
      <Header>
        <Title>Gerenciando planos</Title>
        <Link to="/new_plan">
          <RegisterButton type="button">
            <MdAdd size={22} color="#fff" />
            Cadastrar
          </RegisterButton>
        </Link>
      </Header>
      <Wrapper>
        <strong>Título</strong>
        <strong>Duração</strong>
        <strong>Valor p/ MÊS</strong>

        {!plans.length ? (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        ) : null}

        {plans.length &&
          plans.map(plan => (
            <PlansDesc key={plan.id}>
              <span>{plan.title}</span>
              <span>{plan.durationFormatted}</span>
              <span>{plan.priceFormatted}</span>
              <button
                type="button"
                onClick={() => history.push(`/edit_plan/${plan.id}`)}
              >
                editar
              </button>
              <button type="button" onClick={() => handleDeletePlan(plan.id)}>
                apagar
              </button>
            </PlansDesc>
          ))}
      </Wrapper>
    </Container>
  );
}
