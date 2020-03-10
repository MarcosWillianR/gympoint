import produce from 'immer';

const INITIAL_DATA = {
  loading: true,
  students: [],
  student: {},
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
        draft.loading = false;
        break;
      }
      case '@students/GET_ONE_SUCCESS': {
        const { student } = action.payload;
        draft.student = student;
        draft.loading = false;
        break;
      }
      case '@students/CREATE_SUCCESS_REQUEST': {
        const { student } = action.payload;
        draft.students.push(student);
        draft.loading = false;
        break;
      }
      case '@students/CREATE_REQUEST':
      case '@students/EDIT_REQUEST':
      case '@students/GET_ALL_REQUEST':
      case '@students/GET_ONE_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
