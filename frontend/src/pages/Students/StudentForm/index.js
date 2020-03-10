import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import history from '~/services/history';

import {
  studentsCreateRequest,
  studentsEditRequest,
  studentsGetOneRequest,
} from '~/store/modules/students/actions';

export default function StudentForm({ match }) {
  const student = useSelector(state => state.students.student);

  const [name, setName] = useState(student.name || '');
  const [email, setEmail] = useState(student.email || '');
  const [age, setAge] = useState(student.age || '');
  const [weight, setWeight] = useState(student.weight || '');
  const [height, setHeight] = useState(student.height || '');

  const dispatch = useCallback(useDispatch(), []);

  const student_id = useMemo(() => match.params.student_id, [match.params]);
  const isEditPage = useMemo(
    () => history.location.pathname.match(/edit_student/g),
    []
  );

  const handleSubmit = ({
    student_name,
    student_email,
    student_age,
    student_weight,
    student_height,
  }) => {
    if (isEditPage) {
      dispatch(
        studentsEditRequest(
          student_name,
          student_email,
          student_age,
          student_weight,
          student_height,
          student_id
        )
      );
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

  useEffect(() => {
    if (isEditPage && student_id) {
      dispatch(studentsGetOneRequest(student_id));
    }
  }, [dispatch]); //eslint-disable-line

  return (
    <Container>
      <Header>
        <Title>{isEditPage ? 'Edição' : 'Cadastro'} de aluno</Title>
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
              value={name}
              name="student_name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="fully">
            <label>Endereço de e-mail</label>
            <Input
              type="email"
              value={email}
              name="student_email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="one_third">
            <label>Idade</label>
            <Input
              type="text"
              value={age}
              name="student_age"
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <div className="one_third">
            <label>
              Peso <span>(em kg)</span>
            </label>
            <Input
              type="text"
              value={weight}
              name="student_weight"
              onChange={e => setWeight(e.target.value)}
            />
          </div>
          <div className="one_third">
            <label>Altura</label>
            <Input
              type="text"
              value={height}
              name="student_height"
              onChange={e => setHeight(e.target.value)}
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
