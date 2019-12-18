import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import history from '~/services/history';

import toast from '~/util/toastStyle';

import { studentsFailed, getAllSuccess } from './actions';

export function* getAllRequest() {
  try {
    const response = yield call(api.get, '/students');

    if (response.status === 200) {
      yield put(getAllSuccess(response.data));
    }
  } catch (err) {
    toast('Erro ao tentar listar os alunos', '#e54b64', '#fff', '#fff');

    put(studentsFailed());
  }
}

export function* createRequest({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    const response = yield call(api.post, '/students', {
      name,
      email,
      age,
      weight,
      height,
    });

    if (response.status === 200) {
      history.push('/students');
    }
  } catch (err) {
    toast('Erro ao tentar criar um novo aluno', '#e54b64', '#fff', '#fff');
    put(studentsFailed());
  }
}

export default all([
  takeLatest('@students/GET_ALL_REQUEST', getAllRequest),
  takeLatest('@students/CREATE_REQUEST', createRequest),
]);
