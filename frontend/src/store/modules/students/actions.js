export function getAll() {
  return {
    type: '@students/GET_ALL_REQUEST',
  };
}

export function studentsFailed() {
  return {
    type: '@students/STUDENTS_FAILED',
  };
}

export function getAllSuccess(students) {
  return {
    type: '@students/GET_ALL_SUCCESS',
    payload: { students },
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
