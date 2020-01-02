import produce from 'immer';

const INITIAL_STATE = {
  helps: [],
  loading: null,
};

export default function helpRequest(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help_request/CREATE_REQUEST': {
        draft.loading = true;

        break;
      }
      case '@help_request/CREATE_SUCCESS': {
        draft.loading = false;

        break;
      }
      case '@help_request/FAILED': {
        draft.loading = false;

        break;
      }
      default:
    }
  });
}
