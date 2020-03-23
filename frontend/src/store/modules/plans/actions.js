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

export function plansGetAllSuccess(plans) {
  return {
    type: '@plans/GET_ALL_SUCCESS',
    payload: { plans },
  };
}

export function plansGetAllRequest() {
  return {
    type: '@plans/GET_ALL_REQUEST',
  };
}

export function plansCreateRequest({ title, duration, price }) {
  return {
    type: '@plans/CREATE_REQUEST',
    payload: { title, duration, price },
  };
}

export function plansEditRequest({ title, duration, price }, plan_id) {
  return {
    type: '@plans/EDIT_REQUEST',
    payload: { plan_id, title, duration, price },
  };
}

export function plansDeleteRequest(plan_id) {
  return {
    type: '@plans/DELETE_REQUEST',
    payload: { plan_id },
  };
}
