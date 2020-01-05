import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import history from '~/services/history';
import api from '~/services/api';

import toast from '~/util/toastStyle';
import { priceFormatter } from '~/util/formater';

import {
  plansCreateRequest,
  plansEditRequest,
} from '~/store/modules/plans/actions';

export default function PlanForm({ match }) {
  const isEditPage = history.location.pathname.match(/edit_plan/g);
  const { plan_id } = match.params;

  const [onePlan, setOnePlan] = useState({});
  const dispatch = useDispatch();

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
    async function getOnePlan() {
      if (isEditPage && plan_id) {
        try {
          const response = await api.get(`/plans/${plan_id}`);

          const { duration, price, title } = response.data;

          const textDurationFormat = duration > 1 ? 'meses' : 'mês';
          const totalPrice = duration * price;

          const data = {
            title,
            duration,
            price,
            totalPrice: priceFormatter(totalPrice),
            priceFormatted: priceFormatter(price),
            durationFormatted: `${duration} ${textDurationFormat}`,
          };

          setOnePlan(data);
        } catch (err) {
          toast('Erro ao tentar encontrar o plano', '#e54b64', '#fff', '#fff');
        }
      }
    }
    getOnePlan();
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
              value={(onePlan && onePlan.title) || ''}
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
              value={(onePlan && onePlan.duration) || ''}
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
              value={(onePlan && onePlan.price) || ''}
              name="plan_price"
              onChange={e => setOnePlan({ ...onePlan, price: e.target.value })}
            />
          </div>
          <div className="one_third">
            <label>Preço total</label>
            <Input
              type="text"
              value={(onePlan && onePlan.totalPrice) || ''}
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
