import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';

import { Input } from '~/components/Form';
import Loading from '~/components/Loading';

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
  const formRef = useRef(null);
  const loading = useSelector(state => state.plans.loading);

  const isEditPage = history?.location?.pathname.match(/edit_plan/g);

  const plan_id = match?.params?.plan_id;

  const dispatch = useCallback(useDispatch(), []);

  const isLoading = useMemo(() => {
    return loading ? (
      <Loading size="22px" />
    ) : (
      <>
        <MdDone size={22} color="#fff" />
        Salvar
      </>
    );
  }, [loading]);

  const handleSubmit = ({ title, duration, price }) => {
    const payload = { title, duration, price };

    if (isEditPage) {
      dispatch(plansEditRequest(payload, plan_id));
    } else {
      dispatch(plansCreateRequest(payload));
    }
  };

  useEffect(() => {
    async function getOnePlan() {
      if (isEditPage) {
        try {
          const response = await api.get(`/plans/${plan_id}`);

          const plan = response.data;

          const textDurationFormat = plan.duration > 1 ? 'meses' : 'mês';
          const totalPrice = plan.duration * plan.price;

          const data = {
            ...plan,
            total: priceFormatter(totalPrice),
            price: priceFormatter(plan.price),
            duration: `${plan.duration} ${textDurationFormat}`,
          };

          formRef.current.setData(data);
        } catch (err) {
          toast('Erro ao tentar encontrar o plano', '#e54b64', '#fff', '#fff');
        }
      }
    }
    getOnePlan();
  }, [isEditPage, plan_id]);

  return (
    <Container>
      <Header>
        <Title>{isEditPage ? 'Edição' : 'Cadastro'} de plano</Title>
        <div>
          <button type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={22} color="#fff" />
            Voltar
          </button>
          <button type="submit" form="create_plan">
            {isLoading}
          </button>
        </div>
      </Header>
      <Wrapper>
        <Form id="create_plan" ref={formRef} onSubmit={handleSubmit}>
          <div className="fully">
            <label>Título do Plano</label>
            <Input name="title" />
          </div>
          <div className="one_third">
            <label>
              Duração <span>(em meses)</span>
            </label>
            <Input name="duration" />
          </div>
          <div className="one_third">
            <label>Preço mensal</label>
            <Input name="price" />
          </div>
          <div className="one_third">
            <label>Preço total</label>
            <Input name="total" disabled />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
