export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function singInSuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user, token },
  };
}
