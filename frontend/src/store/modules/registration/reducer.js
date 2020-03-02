import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/REQUEST_FAILED': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
