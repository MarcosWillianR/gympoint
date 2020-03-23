import { takeLatest, put, call, all } from 'redux-saga/effects';
import get from 'lodash/get';
import api from '~/services/api';
import history from '~/services/history';
import { cleanNumber, cleanPrice } from '~/util/formater';

import toast from '~/util/toastStyle';

import { plansSuccess, plansFailure, plansGetAllSuccess } from './actions';

export function* createPlan({ payload }) {
  try {
    const newPlan = payload;

    yield call(api.post, '/plans', newPlan);

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

export function* getAllPlans() {
  try {
    const response = yield call(api.get, '/plans');

    yield put(plansGetAllSuccess(response.data));
  } catch (err) {
    const errorMessage = get(
      err,
      'response.data.error',
      'Erro ao tentar listar os planos'
    );

    toast(errorMessage, '#e54b64', '#fff', '#fff');

    yield put(plansFailure());
  }
}

export function* editPlan({ payload }) {
  try {
    const { plan_id, title, price } = payload;

    const cleanedDuration = cleanNumber({ duration: payload.duration });
    const cleanedPrice = cleanPrice(price);

    yield call(api.put, `/plans/${plan_id}`, {
      title,
      duration: cleanedDuration.duration,
      price: cleanedPrice,
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
    const { plan_id } = payload;
    yield call(api.delete, `/plans/${plan_id}`);

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
  takeLatest('@plans/GET_ALL_REQUEST', getAllPlans),
]);
