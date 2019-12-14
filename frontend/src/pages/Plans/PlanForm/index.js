import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import history from '~/services/history';

import {
  plansCreateRequest,
  plansEditRequest,
} from '~/store/modules/plans/actions';

export default function PlanForm({ match }) {
  const isEditPage = history.location.pathname.match(/edit_plan/g);
  const { plan_id } = match.params;

  const [onePlan, setOnePlan] = useState({});
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plans.plans);

  const handleSubmit = ({ plan_title, plan_duration, plan_price }) => {
    if (isEditPage) {
      dispatch(
        plansEditRequest(plan_id, plan_title, plan_duration, plan_price)
      );
    } else {
      dispatch(plansCreateRequest(plan_title, plan_duration, plan_price));
    }
  };

  useEffect(() => {
    if (isEditPage) {
      if (!plans.length) {
        history.push('/plans');
      }
      setOnePlan(plans.filter(plan => plan.id === Number(plan_id))[0]);
    }
  }, []); //eslint-disable-line

  return (
    <Container>
      <Header>
        <Title>Cadastro de plano</Title>
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
            <Input
              type="text"
              value={(onePlan && onePlan.title) || null}
              name="plan_title"
              onChange={e => setOnePlan({ ...onePlan, title: e.target.value })}
            />
          </div>
          <div className="one_third">
            <label>
              Duração <span>(em meses)</span>
            </label>
            <Input
              type="text"
              value={(onePlan && onePlan.duration) || null}
              name="plan_duration"
              onChange={e =>
                setOnePlan({ ...onePlan, duration: e.target.value })
              }
            />
          </div>
          <div className="one_third">
            <label>Preço mensal</label>
            <Input
              type="text"
              value={(onePlan && onePlan.price) || null}
              name="plan_price"
              onChange={e => setOnePlan({ ...onePlan, price: e.target.value })}
            />
          </div>
          <div className="one_third">
            <label>Preço total</label>
            <Input
              type="text"
              value={(onePlan && onePlan.totalPrice) || null}
              name="plan_total"
              disabled
            />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
