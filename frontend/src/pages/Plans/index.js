import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  plansRequest,
  plansDeleteRequest,
} from '~/store/modules/plans/actions';

import { Header, Wrapper, PlansDesc } from './styles';
import { Container, Title, RegisterButton } from '~/styles/sharedStyles';

import Loading from '~/components/Loading';

import history from '~/services/history';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  const getPlans = useSelector(state => state.plans.plans);
  const loading = useSelector(state => state.plans.loading);

  useEffect(() => {
    dispatch(plansRequest());
  }, []); // eslint-disable-line

  useEffect(() => {
    setPlans(getPlans);
  }, [getPlans]);

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

        {loading ? (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        ) : null}

        {!loading &&
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
