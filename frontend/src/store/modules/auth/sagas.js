import { takeLatest, call, put, all } from 'redux-saga/effects';
import get from 'lodash/get';
import toast from '~/util/toastStyle';

import api from '~/services/api';
import history from '~/services/history';

import { singInSuccess, singFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(user, token));

    history.push('/dashboard');
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'E-mail ou senha inválidos, por favor, verifique os campos'
    );

    toast(errorMessage, '#fff', '#e54b64', 'rgba(229,75,100,0.5)');

    yield put(singFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
