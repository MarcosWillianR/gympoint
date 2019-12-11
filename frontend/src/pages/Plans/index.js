import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { plansRequest } from '~/store/modules/plans/actions';

import { Header, Wrapper, PlansDesc } from './styles';
import { Container } from '~/styles/sharedStyles';
import Loading from '~/components/Loading';

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

  return (
    <Container>
      <Header>
        <h1>Gerenciando planos</h1>
        <button type="button">
          <MdAdd size={22} color="#fff" />
          Cadastrar
        </button>
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
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </PlansDesc>
          ))}
      </Wrapper>
    </Container>
  );
}