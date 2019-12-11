import { takeLatest, put, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { css } from 'glamor';

import api from '~/services/api';

import { plansSuccess, plansFailure } from './actions';

export function* getPlans() {
  try {
    const response = yield call(api.get, 'plans');

    yield put(plansSuccess(response.data));
  } catch (err) {
    toast('Falha ao tentar listar os planos, tente dar um F5 na página ;)', {
      className: css({
        color: '#e54b64 !important',
        background: '#fff !important',
        borderRadius: '6px !important',
      }),
      bodyClassName: css({
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
      }),
      progressClassName: css({
        background: 'rgba(229,75,100,0.5) !important',
      }),
    });

    yield put(plansFailure());
  }
}

export default all([takeLatest('@plans/PLANS_REQUEST', getPlans)]);
