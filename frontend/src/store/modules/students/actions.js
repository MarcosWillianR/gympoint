export function studentsFailed() {
  return {
    type: '@students/STUDENTS_FAILED',
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
