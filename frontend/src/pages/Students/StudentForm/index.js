import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { Header, Wrapper } from './styles';
import { Container, Title } from '~/styles/sharedStyles';

import api from '~/services/api';
import history from '~/services/history';

import {
  studentsCreateRequest,
  studentsEditRequest,
} from '~/store/modules/students/actions';

import toast from '~/util/toastStyle';

export default function StudentForm({ match }) {
  const isEditPage = history.location.pathname.match(/edit_student/g);
  const { student_id } = match.params;

  const [oneStudent, setOneStudent] = useState({});
  const dispatch = useDispatch();

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
    async function getOneStudent() {
      if (isEditPage && student_id) {
        try {
          const response = await api.get(`/students/${student_id}`);

          setOneStudent(response.data);
        } catch (err) {
          toast('Erro ao tentar listar o aluno', '#e54b64', '#fff', '#fff');
        }
      }
    }
    getOneStudent();
  }, []); //eslint-disable-line

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
              value={(oneStudent && oneStudent.name) || ''}
              name="student_name"
              onChange={e =>
                setOneStudent({ ...oneStudent, name: e.target.value })
              }
            />
          </div>
          <div className="fully">
            <label>Endereço de e-mail</label>
            <Input
              type="email"
              value={(oneStudent && oneStudent.email) || ''}
              name="student_email"
              onChange={e =>
                setOneStudent({ ...oneStudent, email: e.target.value })
              }
            />
          </div>
          <div className="one_third">
            <label>Idade</label>
            <Input
              type="text"
              value={(oneStudent && oneStudent.age) || ''}
              name="student_age"
              onChange={e =>
                setOneStudent({ ...oneStudent, age: e.target.value })
              }
            />
          </div>
          <div className="one_third">
            <label>
              Peso <span>(em kg)</span>
            </label>
            <Input
              type="text"
              value={(oneStudent && oneStudent.weight) || ''}
              name="student_weight"
              onChange={e =>
                setOneStudent({ ...oneStudent, weight: e.target.value })
              }
            />
          </div>
          <div className="one_third">
            <label>Altura</label>
            <Input
              type="text"
              value={(oneStudent && oneStudent.height) || ''}
              name="student_height"
              onChange={e =>
                setOneStudent({ ...oneStudent, height: e.target.value })
              }
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
