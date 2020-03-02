export function plansSuccess() {
  return {
    type: '@plans/REQUEST_SUCCESS',
  };
}

export function plansFailure() {
  return {
    type: '@plans/REQUEST_FAILURE',
  };
}

export function plansCreateRequest(title, duration, price) {
  return {
    type: '@plans/CREATE_REQUEST',
    payload: { title, duration, price },
  };
}

export function plansEditRequest(id, title, duration, price) {
  return {
    type: '@plans/EDIT_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function plansDeleteRequest(id) {
  return {
    type: '@plans/DELETE_REQUEST',
    payload: { id },
  };
}
