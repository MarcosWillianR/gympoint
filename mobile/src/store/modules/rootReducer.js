import { combineReducers } from 'redux';

import auth from './auth/reducer';
import helpRequest from './help_request/reducer';
import checkin from './checkin/reducer';

export default combineReducers({
  auth,
  helpRequest,
  checkin,
});
