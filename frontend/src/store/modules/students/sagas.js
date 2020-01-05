import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import history from '~/services/history';

import toast from '~/util/toastStyle';

import { studentsFailed } from './actions';

export function* createRequest({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    yield call(api.post, '/students', {
      name,
      email,
      age,
      weight,
      height,
    });

    history.push('/students');
  } catch (err) {
    toast('Erro ao tentar criar um novo aluno', '#e54b64', '#fff', '#fff');
    put(studentsFailed());
  }
}

export function* editRequest({ payload }) {
  try {
    const { name, email, age, weight, height, student_id } = payload;

    console.tron.log(payload);

    yield call(api.put, `/students/${student_id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    history.push('/students');
  } catch (err) {
    toast('Erro ao tentar editar o aluno', '#e54b64', '#fff', '#fff');
    put(studentsFailed());
  }
}

export function* deleteRequest({ payload }) {
  try {
    const { student_id } = payload;

    yield call(api.delete, `/students/${student_id}`);

    window.location.reload();
  } catch (err) {
    toast('Erro ao tentar deletar o aluno', '#e54b64', '#fff', '#fff');
    put(studentsFailed());
  }
}

export default all([
  takeLatest('@students/EDIT_REQUEST', editRequest),
  takeLatest('@students/CREATE_REQUEST', createRequest),
  takeLatest('@students/DELETE_REQUEST', deleteRequest),
]);
