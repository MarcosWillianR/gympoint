import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plans/PLANS_CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plans/PLANS_EDIT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plans/PLANS_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plans/PLANS_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
