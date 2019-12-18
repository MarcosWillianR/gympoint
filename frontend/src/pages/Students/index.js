import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Header, SearchWrapper, Wrapper, PlansDesc } from './styles';
import { Title, RegisterButton } from '~/styles/sharedStyles';

import { getAll } from '~/store/modules/students/actions';

import Loading from '~/components/Loading';

export default function Students() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const loading = useSelector(state => state.students.loading);

  useEffect(() => {
    dispatch(getAll());
  }, []); // eslint-disable-line

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
            <input type="text" placeholder="Buscar aluno" />
          </SearchWrapper>
        </div>
      </Header>

      <Wrapper>
        <strong>Nome</strong>
        <strong>E-mail</strong>
        <strong>Idade</strong>

        {loading ? (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        ) : null}

        {!loading &&
          students.map(student => (
            <PlansDesc key={student.id}>
              <span>{student.name}</span>
              <span>{student.email}</span>
              <span>{student.age}</span>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </PlansDesc>
          ))}
      </Wrapper>
    </Container>
  );
}
