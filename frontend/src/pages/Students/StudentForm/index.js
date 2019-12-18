import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import history from '~/services/history';

import { studentsCreateRequest } from '~/store/modules/students/actions';

export default function StudentForm({ match }) {
  const isEditPage = history.location.pathname.match(/edit_student/g);
  const { plan_id } = match.params;

  // const [onePlan, setOnePlan] = useState({});
  const dispatch = useDispatch();
  // const plans = useSelector(state => state.plans.plans);

  const handleSubmit = ({
    student_name,
    student_email,
    student_age,
    student_weight,
    student_height,
  }) => {
    if (isEditPage) {
      // dispatch(
      //   plansEditRequest(plan_id, plan_title, plan_duration, plan_price)
      // );
    } else {
      dispatch(
        studentsCreateRequest(
          student_name,
          student_email,
          student_age,
          student_weight,
          student_height
        )
      );
    }
  };

  // useEffect(() => {
  //   if (isEditPage) {
  //     if (!plans.length) {
  //       history.push('/plans');
  //     }
  //     setOnePlan(plans.filter(plan => plan.id === Number(plan_id))[0]);
  //   }
  // }, []); //eslint-disable-line

  return (
    <Container>
      <Header>
        <Title>Cadastro de plano</Title>
        <div>
          <button type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={22} color="#fff" />
            Voltar
          </button>
          <button type="submit" form="create_student">
            <MdDone size={22} color="#fff" />
            Salvar
          </button>
        </div>
      </Header>
      <Wrapper>
        <Form id="create_student" onSubmit={handleSubmit}>
          <div className="fully">
            <label>Nome completo</label>
            <Input
              type="text"
              // value={(onePlan && onePlan.title) || ''}
              name="student_name"
              // onChange={e => setOnePlan({ ...onePlan, title: e.target.value })}
            />
          </div>
          <div className="fully">
            <label>Endereço de e-mail</label>
            <Input
              type="email"
              // value={(onePlan && onePlan.title) || ''}
              name="student_email"
              // onChange={e => setOnePlan({ ...onePlan, title: e.target.value })}
            />
          </div>
          <div className="one_third">
            <label>Idade</label>
            <Input
              type="text"
              // value={(onePlan && onePlan.duration) || ''}
              name="student_age"
              // onChange={e =>
              //   setOnePlan({ ...onePlan, duration: e.target.value })
              // }
            />
          </div>
          <div className="one_third">
            <label>
              Peso <span>(em kg)</span>
            </label>
            <Input
              type="text"
              // value={(onePlan && onePlan.price) || ''}
              name="student_weight"
              // onChange={e => setOnePlan({ ...onePlan, price: e.target.value })}
            />
          </div>
          <div className="one_third">
            <label>Altura</label>
            <Input
              type="text"
              // value={(onePlan && onePlan.totalPrice) || ''}
              name="student_height"
            />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
