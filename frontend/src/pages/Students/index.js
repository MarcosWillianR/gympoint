import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { Container, Header, SearchWrapper, Wrapper, PlansDesc } from './styles';
import { Title, RegisterButton } from '~/styles/sharedStyles';

import Loading from '~/components/Loading';

import toast from '~/util/toastStyle';

import api from '~/services/api';
import history from '~/services/history';

import { studentDeleteRequest } from '~/store/modules/students/actions';

export default function Students() {
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllStudents() {
      try {
        const response = await api.get('/students');

        setStudents(response.data);
      } catch (err) {
        toast('Erro ao tentar listar os aluno', '#e54b64', '#fff', '#fff');
      }
    }
    getAllStudents();
  }, []); // eslint-disable-line

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
            <input type="text" placeholder="Buscar aluno" />
          </SearchWrapper>
        </div>
      </Header>

      <Wrapper>
        <strong>Nome</strong>
        <strong>E-mail</strong>
        <strong>Idade</strong>

        {!students.length ? (
          <>
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
            <Loading align="flex-start" margin="margin-top: 10px" />
          </>
        ) : null}

        {students.length &&
          students.map(student => (
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
      </Wrapper>
    </Container>
  );
}
