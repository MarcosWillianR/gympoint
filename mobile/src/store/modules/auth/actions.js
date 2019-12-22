export function signInRequest(student_id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { student_id },
  };
}

export function singInSuccess(student, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { student, token },
  };
}

export function singFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
