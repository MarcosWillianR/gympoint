import { takeLatest, call, put, all } from 'redux-saga/effects';
import get from 'lodash/get';
import api from '~/services/api';
import history from '~/services/history';

import toast from '~/util/toastStyle';

import {
  studentsFailed,
  studentsCreateSuccess,
  studentsGetAllSuccess,
  studentsGetOneSuccess,
} from './actions';

export function* getAllRequest() {
  try {
    const response = yield call(api.get, '/students');

    return yield put(studentsGetAllSuccess(response.data));
  } catch (err) {
    toast('Erro ao tentar listar os alunos', '#e54b64', '#fff', '#fff');

    return yield put(studentsFailed());
  }
}

export function* getOneRequest({ payload }) {
  try {
    const { student_id } = payload;

    const response = yield call(api.get, `students/${student_id}`);

    return yield put(studentsGetOneSuccess(response.data));
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar buscar esse aluno'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    return yield put(studentsFailed());
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

    return yield put(studentsCreateSuccess(response.data));
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar criar um novo aluno'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    return yield put(studentsFailed());
  }
}

export function* editRequest({ payload }) {
  try {
    const { name, email, age, weight, height, student_id } = payload;

    yield call(api.put, `/students/${student_id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    history.push('/students');
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar editar o aluno'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');
    put(studentsFailed());
  }
}

export function* deleteRequest({ payload }) {
  try {
    const { student_id } = payload;

    yield call(api.delete, `/students/${student_id}`);

    window.location.reload();
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar deletar o aluno'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');
    put(studentsFailed());
  }
}

export default all([
  takeLatest('@students/EDIT_REQUEST', editRequest),
  takeLatest('@students/CREATE_REQUEST', createRequest),
  takeLatest('@students/DELETE_REQUEST', deleteRequest),
  takeLatest('@students/GET_ALL_REQUEST', getAllRequest),
  takeLatest('@students/GET_ONE_REQUEST', getOneRequest),
]);
