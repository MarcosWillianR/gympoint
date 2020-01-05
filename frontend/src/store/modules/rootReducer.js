import { combineReducers } from 'redux';

import auth from './auth/reducer';
import admin from './admin/reducer';
import plans from './plans/reducer';
import registration from './registration/reducer';
import students from './students/reducer';
import assist from './assist/reducer';

export default combineReducers({
  auth,
  admin,
  plans,
  registration,
  students,
  assist,
});
