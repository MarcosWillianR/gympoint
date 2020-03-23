import produce from 'immer';
import { priceFormatter } from '~/util/formater';

const INITIAL_STATE = {
  plans: [],
  loading: null,
};

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plans/REQUEST_SUCCESS':
      case '@plans/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@plans/GET_ALL_SUCCESS': {
        const plansFormatted = action.payload.plans.map(plan => {
          const textDurationFormat = plan.duration > 1 ? 'meses' : 'mês';
          const totalPrice = plan.duration * plan.price;

          return {
            ...plan,
            totalPrice: priceFormatter(totalPrice),
            priceFormatted: priceFormatter(plan.price),
            durationFormatted: `${plan.duration} ${textDurationFormat}`,
          };
        });

        draft.plans = plansFormatted;
        draft.loading = false;
        break;
      }
      case '@plans/CREATE_REQUEST':
      case '@plans/EDIT_REQUEST':
      case '@plans/GET_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
