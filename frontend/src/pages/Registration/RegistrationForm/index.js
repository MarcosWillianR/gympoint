import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import SelectStudent from 'react-select/async';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import { plansRequest } from '~/store/modules/plans/actions';
import {
  registrationUpdateRequest,
  registrationCreateRequest,
} from '~/store/modules/registration/actions';

import history from '~/services/history';

import api from '~/services/api';

export default function RegistrationForm({ match }) {
  const [oneRegistration, setOneRegistration] = useState([]);
  const [allPlans, setAllPlans] = useState([]);

  const dispatch = useDispatch();

  const isEditPage = history.location.pathname.match(/edit_registration/g);
  const { reg_id } = match.params;

  const registrations = useSelector(state => state.registration.registrations);
  const plans = useSelector(state => state.plans.plans);

  const handleSubmit = ({ plan_id }) => {
    const {
      start_date,
      Student: { id: student_id },
    } = oneRegistration;

    if (isEditPage) {
      dispatch(
        registrationUpdateRequest(plan_id, start_date, student_id, reg_id)
      );
    } else {
      dispatch(registrationCreateRequest(student_id, plan_id, start_date));
    }
  };

  const handleDateChange = date => {
    setOneRegistration({
      ...oneRegistration,
      start_date: date,
    });
  };

  useEffect(() => {
    if (isEditPage) {
      if (!registrations.length) {
        history.push('/registrations');
      } else {
        setOneRegistration(
          registrations.filter(
            registration => registration.id === Number(reg_id)
          )[0]
        );
      }
    }

    dispatch(plansRequest());

    if (plans.length) {
      setAllPlans(plans);
    } else {
      history.push('/registrations');
    }
  }, []); // eslint-disable-line

  const studentName =
    oneRegistration && oneRegistration.Student && oneRegistration.Student.name;

  // const studentPlan =
  //   oneRegistration && oneRegistration.Student && oneRegistration.Plan.title;

  const handleLoadStudents = async () => {
    const response = await api.get('/students');

    const data = response.data.map(student => ({
      id: student.id,
      label: student.name,
      value: student.email,
    }));

    return data;
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro de matrícula</Title>
        <div>
          <button type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={22} color="#fff" />
            Voltar
          </button>
          <button type="submit" form="create_register">
            <MdDone size={22} color="#fff" />
            Salvar
          </button>
        </div>
      </Header>
      <Wrapper>
        <Form id="create_register" onSubmit={handleSubmit}>
          <div className="fully">
            <label htmlFor="student">Aluno</label>
            <SelectStudent
              id="student"
              loadOptions={handleLoadStudents}
              cacheOptions
              defaultOptions
              onChange={data =>
                setOneRegistration({
                  ...oneRegistration,
                  Student: {
                    name: data.label,
                    id: data.id,
                  },
                })
              }
              placeholder="Buscar aluno"
            />
          </div>
          <div className="one_four">
            <label htmlFor="plan">Plano</label>
            <Select
              id="plan"
              type="text"
              name="plan_id"
              placeholder="Selecione o plano"
              options={allPlans}
            />
          </div>
          <div className="one_four">
            <label htmlFor="initial_date">Data de início</label>
            <DatePicker
              id="initial_date"
              selected={(oneRegistration && oneRegistration.start_date) || ''}
              onChange={handleDateChange}
              locale={pt}
              todayButton="Hoje"
              minDate={new Date()}
              showDisabledMonthNavigation
              placeholderText="Escolha a data"
              dateFormat="dd'/'MM'/'yyyy"
            />
          </div>
          <div className="one_four">
            <label htmlFor="end_date">Data de término</label>
            <Input
              id="end_date"
              type="text"
              name="plan_end_date"
              value={
                (oneRegistration && oneRegistration.form_end_date_formatted) ||
                ''
              }
              disabled
            />
          </div>
          <div className="one_four">
            <label htmlFor="final_value">Valor final</label>
            <Input
              id="final_value"
              type="text"
              name="plan_value"
              value={(oneRegistration && oneRegistration.priceFormatted) || ''}
              disabled
            />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
