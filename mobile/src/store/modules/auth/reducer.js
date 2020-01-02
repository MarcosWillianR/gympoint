import produce from 'immer';

const INITIAL_STATE = {
  student: [],
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
        const { token, student } = action.payload;
        draft.token = token;
        draft.student = student;
        draft.signed = true;
        draft.loading = false;

        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.signed = false;
        draft.loading = false;

        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.token = null;
        draft.loading = null;
        draft.student = [];

        break;
      }
      default:
    }
  });
}
