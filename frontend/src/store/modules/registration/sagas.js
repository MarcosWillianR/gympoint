import { takeLatest, all, put, call } from 'redux-saga/effects';
import get from 'lodash/get';
import api from '~/services/api';
import history from '~/services/history';

import toast from '~/util/toastStyle';

import { registrationFailed } from './actions';

export function* registrationDelete({ payload }) {
  try {
    const { registration_id } = payload;

    const response = yield call(
      api.delete,
      `/registrations/${registration_id}`
    );

    const successMessage = get(
      response,
      'data.message',
      'Matrícula removida com sucesso'
    );

    toast(successMessage, '#e54b64', '#fff', '#fff');

    setTimeout(() => window.location.reload(), 3000);
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar deletar a matrícula do aluno'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    yield put(registrationFailed());
  }
}

export function* registrationUpdate({ payload }) {
  try {
    const { plan_id, start_date, student_id, registration_id } = payload;

    const response = yield call(api.put, `/registrations/${registration_id}`, {
      plan_id,
      start_date,
      student_id,
    });

    const successMessage = get(
      response,
      'data.message',
      'Matrícula editada com sucesso'
    );

    toast(successMessage, '#e54b64', '#fff', '#fff');

    setTimeout(() => history.push('/registrations'), 3000);
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar editar a matrícula'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    yield put(registrationFailed());
  }
}

export function* registrationCreate({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload;

    const response = yield call(api.post, '/registrations', {
      student_id,
      plan_id,
      start_date,
    });

    const successMessage = get(
      response,
      'data.message',
      'Matrícula criada com sucesso'
    );

    toast(successMessage, '#e54b64', '#fff', '#fff');

    setTimeout(() => history.push('/registrations'), 3000);
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar criar uma matrícula'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');
  }
}

export default all([
  takeLatest('@registration/DELETE_REQUEST', registrationDelete),
  takeLatest('@registration/UPDATE_REQUEST', registrationUpdate),
  takeLatest('@registration/CREATE_REQUEST', registrationCreate),
]);
