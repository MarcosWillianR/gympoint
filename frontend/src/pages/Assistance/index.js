import React, { useState } from 'react';

import { Container } from './styles';
import { Title } from '~/styles/sharedStyles';

import AssistAnswer from './AssistAnswer';

export default function Assistance() {
  const [modalVisible, setModalVisible] = useState(true);

  const handleModal = e => {
    const modalWrapper = document.querySelector('.modal-wrapper');

    if (!modalWrapper.contains(e.target)) {
      setModalVisible(false);
    }
  };

  return (
    <>
      <Container>
        <Title>Pedidos de auxílio</Title>
        <ul>
          <h2>Aluno</h2>
          <li>
            Lennert Nijenbijvank
            <button type="button" onClick={() => setModalVisible(true)}>
              Responder
            </button>
          </li>
          <li>
            Sebastian Westergren
            <button type="button">Responder</button>
          </li>
          <li>
            Shen Zhi
            <button type="button">Responder</button>
          </li>
        </ul>
      </Container>
      <AssistAnswer
        visible={modalVisible}
        handleModalTarget={e => handleModal(e)}
      />
    </>
  );
}
