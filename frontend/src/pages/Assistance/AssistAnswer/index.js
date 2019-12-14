import React from 'react';
import PropTypes from 'prop-types';
import { Container, AnswerWrapper } from './styles';

export default function AssistAnswer({ handleModalTarget, visible }) {
  return (
    <Container onClick={e => handleModalTarget(e)} visible={visible}>
      <AnswerWrapper className="modal-wrapper">
        <h2>Pergunta do Aluno</h2>
        <p>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </p>
        <form>
          <strong>Sua resposta</strong>
          <input type="text" placeholder="responde aqui..." />
          <button type="submit">Responder aluno</button>
        </form>
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
