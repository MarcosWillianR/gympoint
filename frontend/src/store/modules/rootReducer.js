import { combineReducers } from 'redux';

import auth from './auth/reducer';
import admin from './admin/reducer';
import plans from './plans/reducer';

export default combineReducers({ auth, admin, plans });
