export function createCheckinRequest(student_id) {
  return {
    type: '@checkin/CREATE_REQUEST',
    payload: { student_id },
  };
}

export function createCheckinSuccess() {
  return {
    type: '@checkin/CREATE_SUCCESS',
  };
}

export function createCheckinFailed() {
  return {
    type: '@checkin/CREATE_FAILED',
  };
}
