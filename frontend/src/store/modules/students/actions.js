export function studentsFailed() {
  return {
    type: '@students/FAILED_REQUEST',
  };
}

export function studentsCreateSuccess(student) {
  return {
    type: '@students/CREATE_SUCCESS_REQUEST',
    payload: {
      student,
    },
  };
}

export function studentsEditSuccess(student) {
  return {
    type: '@students/EDIT_SUCCESS_REQUEST',
    payload: {
      student,
    },
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

export function studentsGetOneSuccess(student) {
  return {
    type: '@students/GET_ONE_SUCCESS',
    payload: {
      student,
    },
  };
}

export function studentsGetAllRequest() {
  return {
    type: '@students/GET_ALL_REQUEST',
  };
}

export function studentsGetOneRequest(student_id) {
  return {
    type: '@students/GET_ONE_REQUEST',
    payload: {
      student_id,
    },
  };
}

export function studentDeleteRequest(student_id) {
  return {
    type: '@students/DELETE_REQUEST',
    payload: { student_id },
  };
}

export function studentsEditRequest(
  name,
  email,
  age,
  weight,
  height,
  student_id
) {
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

export function studentsCreateRequest(name, email, age, weight, height) {
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
