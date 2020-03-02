import { takeLatest, put, call, all } from 'redux-saga/effects';
import get from 'lodash/get';
import api from '~/services/api';
import history from '~/services/history';

import toast from '~/util/toastStyle';

import { plansSuccess, plansFailure } from './actions';

export function* createPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    yield call(api.post, '/plans', {
      title,
      duration,
      price,
    });

    yield put(plansSuccess());

    history.push('/plans');
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar criar um plano'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    yield put(plansFailure());
  }
}

export function* editPlan({ payload }) {
  try {
    const { id, title, duration, price } = payload;

    yield call(api.put, `/plans/${id}`, {
      title,
      duration,
      price,
    });

    yield put(plansSuccess());

    history.push('/plans');
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar editar o plano'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    yield put(plansFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/plans/${id}`);

    yield put(plansSuccess());

    window.location.reload();
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar deletar o plano'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    yield put(plansFailure());
  }
}

export default all([
  takeLatest('@plans/CREATE_REQUEST', createPlan),
  takeLatest('@plans/EDIT_REQUEST', editPlan),
  takeLatest('@plans/DELETE_REQUEST', deletePlan),
]);
