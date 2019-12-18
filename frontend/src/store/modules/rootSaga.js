import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import admin from './admin/sagas';
import plans from './plans/sagas';
import registration from './registration/sagas';
import student from './students/sagas';

export default function* rootSaga() {
  return yield all([auth, admin, plans, registration, student]);
}
