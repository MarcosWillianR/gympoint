import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Container, AnswerWrapper, AnswerStatusWrapper } from './styles';

import { createAnswerRequest } from '~/store/modules/assist/actions';

import Loading from '~/components/Loading';

export default function AssistAnswer({
  handleModalTarget,
  visible,
  questionData,
}) {
  const dispatch = useDispatch();
  const message = useSelector(state => state.assist.message);

  const handleSubmit = ({ instructor_answer }) => {
    dispatch(createAnswerRequest(instructor_answer, questionData._id));
  };

  return (
    <Container onClick={e => handleModalTarget(e)} visible={visible}>
      <AnswerWrapper className="modal-wrapper">
        {message ? (
          <AnswerStatusWrapper>
            <h3>{message}</h3>
            <Loading />
          </AnswerStatusWrapper>
        ) : (
          <>
            <h2>Pergunta do Aluno</h2>
            <p>{questionData ? questionData.question : ''}</p>
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
          </>
        )}
      </AnswerWrapper>
    </Container>
  );
}

AssistAnswer.propTypes = {
  handleModalTarget: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  questionData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

AssistAnswer.defaultProps = {
  handleModalTarget: {},
};
