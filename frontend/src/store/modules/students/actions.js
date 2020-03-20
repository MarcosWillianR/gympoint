export function studentsFailed() {
  return {
    type: '@students/FAILED_REQUEST',
  };
}

export function studentsGetAllSuccess(students) {
  return {
    type: '@students/GET_ALL_SUCCESS_REQUEST',
    payload: {
      students,
    },
  };
}

export function studentsGetAllRequest() {
  return {
    type: '@students/GET_ALL_REQUEST',
  };
}

export function studentDeleteRequest(student_id) {
  return {
    type: '@students/DELETE_REQUEST',
    payload: { student_id },
  };
}

export function studentsEditRequest({ name, email, age, weight, height }, student_id) {
  return {
    type: '@students/EDIT_REQUEST',
    payload: {
      student_id,
      name,
      email,
      age,
      weight,
      height,
    },
  };
}

export function studentsCreateRequest({ name, email, age, weight, height }) {
  return {
    type: '@students/CREATE_REQUEST',
    payload: {
      name,
      email,
      age,
      weight,
      height,
    },
  };
}
