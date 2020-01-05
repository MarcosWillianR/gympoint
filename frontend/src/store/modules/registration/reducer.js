import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/REGISTRATION_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/REGISTRATION_UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/REGISTRATION_FAILED': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
