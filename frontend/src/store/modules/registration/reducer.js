import produce from 'immer';

import {
  priceFormatter,
  dateFormFormat,
  dateListFormat,
} from '~/util/formater';

const INITIAL_STATE = {
  registrations: [],
  loading: false,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/GET_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/GET_ALL_SUCCESS': {
        const payloadFormatted = action.payload.map(registrations => {
          const {
            active,
            id,
            start_date,
            end_date,
            price,
            Student,
            Plan,
          } = registrations;

          const priceFormatted = priceFormatter(price);
          const form_end_date_formatted = dateFormFormat(end_date);
          const list_end_date_formatted = dateListFormat(end_date);
          const start_date_formatted = dateListFormat(start_date);

          return {
            active,
            id,
            Student,
            Plan,
            priceFormatted,
            form_end_date_formatted,
            list_end_date_formatted,
            start_date_formatted,
          };
        });
        draft.registrations = payloadFormatted;
        draft.loading = false;
        break;
      }
      case '@registration/REGISTRATION_FAILED': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
