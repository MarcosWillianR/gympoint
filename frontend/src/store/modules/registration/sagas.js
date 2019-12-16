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

export default all([
  takeLatest('@registration/GET_ALL_REQUEST', getAll),
  takeLatest('@registration/REGISTRATION_DELETE_REQUEST', registrationDelete),
]);
