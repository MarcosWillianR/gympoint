import produce from 'immer';

const INITIAL_DATA = {
  students: [],
  loading: null,
};

export default function students(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@students/GET_ALL_SUCCESS': {
        draft.students = action.payload.students;
        draft.loading = false;
        break;
      }
      case '@students/GET_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@students/STUDENTS_FAILED': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
