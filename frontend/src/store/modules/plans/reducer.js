import produce from 'immer';
import { priceFormatter } from '~/util/formater';

const INITIAL_STATE = {
  plans: [],
  loading: false,
};

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plans/PLANS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plans/PLANS_SUCCESS': {
        draft.plans = action.payload.plans.map(plan => {
          const textDurationFormat = plan.duration > 1 ? 'meses' : 'mês';
          return {
            ...plan,
            priceFormatted: priceFormatter(plan.price),
            durationFormatted: `${plan.duration} ${textDurationFormat}`,
          };
        });
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
