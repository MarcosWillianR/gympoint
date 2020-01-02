import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { createCheckinFailed, createCheckinSuccess } from './actions';

export function* createCheckin({ payload }) {
  try {
    const { student_id } = payload;

    yield call(api.post, `/students/${student_id}/checkins`);

    put(createCheckinSuccess());

    Alert.alert('Sucesso', 'Check-in criado com sucesso, atualize a página.');
  } catch (error) {
    put(createCheckinFailed());

    Alert.alert('Erro', 'Você já fez 5 check-ins nessa semana...');
  }
}

export default all([takeLatest('@checkin/CREATE_REQUEST', createCheckin)]);
