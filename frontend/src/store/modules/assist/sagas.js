import { takeLatest, call, all, put } from 'redux-saga/effects';

import {
  clearMessage,
  createAnswerSuccess,
  createAnswerFailed,
} from './actions';

import api from '~/services/api';

export function* createRequest({ payload }) {
  try {
    const { answer, question_id } = payload;

    yield call(api.put, `/help-orders/${question_id}/answer`, { answer });

    yield put(createAnswerSuccess());

    setTimeout(() => {
      put(clearMessage());
      window.location.reload();
    }, 3000);
  } catch (error) {
    yield put(createAnswerFailed());

    setTimeout(() => {
      put(clearMessage());
      window.location.reload();
    }, 3000);
  }
}

export default all([
  takeLatest('@assist/CREATE_ANSWER_REQUEST', createRequest),
]);
