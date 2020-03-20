import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import api from '~/services/api';

import { Input } from '~/components/Form';
import Loading from '~/components/Loading';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import history from '~/services/history';

import {
  studentsCreateRequest,
  studentsEditRequest,
} from '~/store/modules/students/actions';

export default function StudentForm({ match }) {
  const formRef = useRef(null);
  const loading = useSelector(state => state.students.loading);

  const isEditPage = history.location.pathname.match(/edit_student/g);

  const { student_id } = match.params;

  const dispatch = useCallback(useDispatch(), []);

  const isLoading = useMemo(() => {
    return loading ? <Loading size="22px"/> : (
      <>
        <MdDone size={22} color="#fff" />
        Salvar
      </>
    );
  }, [loading]);

  const handleSubmit = ({ name, email, age, weight, height }) => {
    const payload = { name, email, age, weight, height }

    if (isEditPage) {
      dispatch(studentsEditRequest(payload, student_id));
    } else {
      dispatch(studentsCreateRequest(payload));
    }
  };

  useEffect(() => {
    if (isEditPage) {
      async function getOneStudent() {
        const response = await api.get(`/students/${student_id}`);

        formRef.current.setData(response.data);
      }
      getOneStudent();
    }
  }, []);

  return (
    <Container>
      <Header>
        <Title>{isEditPage ? 'Edição' : 'Cadastro'} de aluno</Title>
        <div>
          <button type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={22} color="#fff" />
            Voltar
          </button>
          <button type="submit" form="create_student">{isLoading}</button>
        </div>
      </Header>
        <Wrapper>
          <Form id="create_student" ref={formRef} onSubmit={handleSubmit}>
            <div className="fully">
              <label>Nome completo</label>
              <Input name="name" />
            </div>
            <div className="fully">
              <label>Endereço de e-mail</label>
              <Input type="email" name="email" />
            </div>
            <div className="one_third">
              <label>Idade</label>
              <Input type="number" name="age" min="0"/>
            </div>
            <div className="one_third">
              <label>
                Peso <span>(em kg)</span>
              </label>
              <Input name="weight" />
            </div>
            <div className="one_third">
              <label>Altura</label>
              <Input name="height" />
            </div>
          </Form>
        </Wrapper>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
