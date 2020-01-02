import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { helpCreateSuccess, helpFailed } from './actions';

export function* createRequest({ payload }) {
  try {
    const { question, studentId } = payload;

    yield call(api.post, `/students/${studentId}/help-orders`, { question });

    yield put(helpCreateSuccess());
  } catch (err) {
    Alert.alert('Erro', 'erro na hora de criar sua dúvida');

    yield put(helpFailed());
  }
}

export default all([takeLatest('@help_request/CREATE_REQUEST', createRequest)]);
