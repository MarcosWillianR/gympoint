import { takeLatest, all, put, call } from 'redux-saga/effects';
import api from '~/services/api';
import history from '~/services/history';

import toast from '~/util/toastStyle';

import { getAllSuccess, registrationFailed } from './actions';

export function* getAll() {
  try {
    const response = yield call(api.get, '/registrations');

    yield put(getAllSuccess(response.data));
  } catch (err) {
    toast('Falha ao tentar listar as matrículas', '#e54b64', '#fff', '#fff');

    yield put(registrationFailed());
  }
}

export function* registrationDelete({ payload }) {
  try {
    const { registration_id } = payload;

    const response = yield call(
      api.delete,
      `/registrations/${registration_id}`
    );

    if (response.status === 200) {
      window.location.reload();
    }
  } catch (err) {
    toast('Falha ao tentar deletar a matrícula', '#e54b64', '#fff', '#fff');

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

    if (response.status === 200) {
      history.push('/registrations');
    }
  } catch (err) {
    toast('Falha ao tentar editar a matrícula', '#e54b64', '#fff', '#fff');

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

    if (response.status === 200) {
      history.push('/registrations');
    }
  } catch (err) {
    toast('Erro ao tentar criar uma matrícula', '#e54b64', '#fff', '#fff');
  }
}

export default all([
  takeLatest('@registration/GET_ALL_REQUEST', getAll),
  takeLatest('@registration/REGISTRATION_DELETE_REQUEST', registrationDelete),
  takeLatest('@registration/REGISTRATION_UPDATE_REQUEST', registrationUpdate),
  takeLatest('@registration/REGISTRATION_CREATE_REQUEST', registrationCreate),
]);
