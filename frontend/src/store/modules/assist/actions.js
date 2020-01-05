export function createAnswerRequest(answer, question_id) {
  return {
    type: '@assist/CREATE_ANSWER_REQUEST',
    payload: { answer, question_id },
  };
}

export function createAnswerSuccess() {
  return {
    type: '@assist/CREATE_ANSWER_SUCCESS',
  };
}

export function createAnswerFailed() {
  return {
    type: '@assist/CREATE_ANSWER_FAILED',
  };
}

export function clearMessage() {
  return {
    type: '@assist/CLEAR_MESSAGE',
  };
}
