import produce from 'immer';

const INITIAL_DATA = {
  loading: null,
  students: [],
};

export default function students(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@students/FAILED_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@students/GET_ALL_SUCCESS_REQUEST': {
        draft.students = action.payload.students;
        draft.student = null;
        draft.loading = false;
        break;
      }
      case '@students/CREATE_REQUEST':
      case '@students/EDIT_REQUEST':
      case '@students/GET_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
