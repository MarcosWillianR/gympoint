import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Header,
  SearchWrapper,
  Wrapper,
  PlansDesc,
  WithoutStudentWrapper,
} from './styles';
import { Title, RegisterButton } from '~/styles/sharedStyles';

import Loading from '~/components/Loading';

import history from '~/services/history';

import {
  studentDeleteRequest,
  studentsGetAllRequest,
} from '~/store/modules/students/actions';

export default function Students() {
  const loading = useSelector(state => state.students.loading);
  const students = useSelector(state => state.students.students);

  const dispatch = useCallback(useDispatch(), []);

  useEffect(() => {
    dispatch(studentsGetAllRequest());
  }, [dispatch]);

  const handleDelete = student_id => {
    const confirmDelete = window.confirm(
      'Tem certeza de que deseja excluir esse aluno?'
    );

    if (confirmDelete) {
      dispatch(studentDeleteRequest(student_id));
    }
  };

  return (
    <Container>
      <Header>
        <Title>Gerenciando alunos</Title>
        <div>
          <Link to="/new_student">
            <RegisterButton type="button">
              <MdAdd size={22} color="#fff" />
              Cadastrar
            </RegisterButton>
          </Link>
          <SearchWrapper>
            <MdSearch size={20} color="#999" />
            <input type="text" placeholder="Buscar pelo nome" disabled />
          </SearchWrapper>
        </div>
      </Header>

      <Wrapper>
        <strong>Nome</strong>
        <strong>E-mail</strong>
        <strong>Idade</strong>

        {loading && (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        )}

        {students.map(student => (
          <PlansDesc key={student.id}>
            <span>{student.name}</span>
            <span>{student.email}</span>
            <span>{student.age}</span>
            <button
              type="button"
              onClick={() => history.push(`/edit_student/${student.id}`)}
            >
              editar
            </button>
            <button type="button" onClick={() => handleDelete(student.id)}>
              apagar
            </button>
          </PlansDesc>
        ))}

        {!students.length && !loading && (
          <WithoutStudentWrapper>
            <p>Nenhum aluno cadastrado</p>
          </WithoutStudentWrapper>
        )}
      </Wrapper>
    </Container>
  );
}
