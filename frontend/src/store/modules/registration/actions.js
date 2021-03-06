export function registrationFailed() {
  return {
    type: '@registration/REQUEST_FAILED',
  };
}

export function registrationDeleteRequest(registration_id) {
  return {
    type: '@registration/DELETE_REQUEST',
    payload: { registration_id },
  };
}

export function registrationUpdateRequest(
  plan_id,
  start_date,
  student_id,
  registration_id
) {
  return {
    type: '@registration/UPDATE_REQUEST',
    payload: { plan_id, start_date, student_id, registration_id },
  };
}

export function registrationCreateRequest(student_id, plan_id, start_date) {
  return {
    type: '@registration/CREATE_REQUEST',
    payload: { student_id, plan_id, start_date },
  };
}
