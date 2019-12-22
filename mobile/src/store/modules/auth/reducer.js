import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  token: null,
  loading: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        const { token } = action.payload;
        draft.token = token;
        draft.signed = true;
        draft.loading = false;

        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.signed = false;
        draft.loading = false;

        break;
      }
      default:
    }
  });
}
