import produce from 'immer';

const INITIAL_STATE = {
  loading: null,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkin/CREATE_REQUEST': {
        draft.loading = true;

        break;
      }
      case '@checkin/CREATE_SUCCESS': {
        draft.loading = false;

        break;
      }
      case '@checkin/CREATE_FAILED': {
        draft.loading = false;

        break;
      }
      default:
    }
  });
}
