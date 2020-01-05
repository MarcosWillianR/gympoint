import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import { Title } from '~/styles/sharedStyles';

import AssistAnswer from './AssistAnswer';

import api from '~/services/api';
import toast from '~/util/toastStyle';

export default function Assistance() {
  const [modalObj, setModalObj] = useState({
    modalVisible: false,
    questionData: {},
  });
  const [questions, setQuestions] = useState([]);

  const handleModal = e => {
    const modalWrapper = document.querySelector('.modal-wrapper');

    if (!modalWrapper.contains(e.target)) {
      setModalObj({
        modalVisible: false,
      });
    }
  };

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await api.get('/help-orders');

        setQuestions(response.data);
      } catch (error) {
        toast(
          'Não existe nenhuma pergunta para responder ou ocorreu um erro ao tentar busca-las',
          '#fff',
          '#e54b64',
          'rgba(229,75,100,0.5)'
        );
      }
    }
    getQuestions();
  }, []) // eslint-disable-line

  return (
    <>
      <Container>
        <Title>Pedidos de auxílio</Title>
        <ul>
          <h2>Aluno</h2>
          {questions.map(question => (
            <li key={question._id}>
              {question.student_name}
              <button
                type="button"
                onClick={() =>
                  setModalObj({
                    modalVisible: true,
                    questionData: question,
                  })
                }
              >
                Responder
              </button>
            </li>
          ))}
        </ul>
      </Container>
      <AssistAnswer
        visible={modalObj.modalVisible}
        handleModalTarget={e => handleModal(e)}
        questionData={modalObj.questionData}
      />
    </>
  );
}
