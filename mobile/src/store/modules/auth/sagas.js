import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { singInSuccess, singFailure } from './actions';

export function* signRequest({ payload }) {
  try {
    const { student_id } = payload;

    const response = yield call(api.post, '/mobile-sessions', {
      student_id,
    });

    const { student, token } = response.data;

    yield put(singInSuccess(student, token));
  } catch (err) {
    Alert.alert('Falha no login', 'Erro ao tentar realizar login no APP');

    yield put(singFailure());
  }
}

export function sendToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signRequest),
  takeLatest('persist/REHYDRATE', sendToken),
]);
