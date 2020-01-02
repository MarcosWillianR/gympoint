import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import helpRequest from './help_request/sagas';
import checkin from './checkin/sagas';

export default function* rootSaga() {
  return yield all([auth, helpRequest, checkin]);
}
