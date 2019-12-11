export function plansRequest() {
  return {
    type: '@plans/PLANS_REQUEST',
  };
}

export function plansSuccess(plans) {
  return {
    type: '@plans/PLANS_SUCCESS',
    payload: { plans },
  };
}

export function plansFailure() {
  return {
    type: '@plans/PLANS_FAILURE',
  };
}
