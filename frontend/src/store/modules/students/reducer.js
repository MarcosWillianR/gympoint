import produce from 'immer';

const INITIAL_DATA = {
  loading: null,
};

export default function students(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@students/STUDENTS_FAILED': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
