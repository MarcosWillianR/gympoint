export function plansSuccess() {
  return {
    type: '@plans/PLANS_SUCCESS',
  };
}

export function plansFailure() {
  return {
    type: '@plans/PLANS_FAILURE',
  };
}

export function plansCreateRequest(title, duration, price) {
  return {
    type: '@plans/PLANS_CREATE_REQUEST',
    payload: { title, duration, price },
  };
}

export function plansEditRequest(id, title, duration, price) {
  return {
    type: '@plans/PLANS_EDIT_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function plansDeleteRequest(id) {
  return {
    type: '@plans/PLANS_DELETE_REQUEST',
    payload: { id },
  };
}
