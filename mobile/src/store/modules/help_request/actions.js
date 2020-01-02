export function helpCreateRequest(question, studentId) {
  return {
    type: '@help_request/CREATE_REQUEST',
    payload: { question, studentId },
  };
}

export function helpCreateSuccess() {
  return {
    type: '@help_request/CREATE_SUCCESS',
  };
}

export function helpFailed() {
  return {
    type: '@help_request/FAILED',
  };
}
