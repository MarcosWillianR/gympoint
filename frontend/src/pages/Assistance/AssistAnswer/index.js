import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { Container, AnswerWrapper } from './styles';

export default function AssistAnswer({ handleModalTarget, visible }) {
  const dispatch = useDispatch();

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <Container onClick={e => handleModalTarget(e)} visible={visible}>
      <AnswerWrapper className="modal-wrapper">
        <h2>Pergunta do Aluno</h2>
        <p>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </p>
        <Form onSubmit={handleSubmit}>
          <strong>Sua resposta</strong>
          <Input
            multiline
            name="instructor_answer"
            type="text"
            placeholder="responde aqui..."
          />
          <button type="submit">Responder aluno</button>
        </Form>
      </AnswerWrapper>
    </Container>
  );
}

AssistAnswer.propTypes = {
  handleModalTarget: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};

AssistAnswer.defaultProps = {
  handleModalTarget: {},
};
