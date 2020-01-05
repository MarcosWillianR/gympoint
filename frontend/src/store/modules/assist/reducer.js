import produce from 'immer';

const INITIAL_STATE = {
  message: '',
  loading: null,
};

export default function assist(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@assist/CREATE_ANSWER_REQUEST': {
        draft.message = 'Enviando resposta ao aluno, aguarde...';
        draft.loading = true;
        break;
      }
      case '@assist/CREATE_ANSWER_SUCCESS': {
        draft.message =
          'Resposta enviada com sucesso, a página será recarregada em 3 segundos.';
        draft.loading = false;
        break;
      }
      case '@assist/CREATE_ANSWER_FAILED': {
        draft.message = 'Falha ao tentar enviar a resposta.';
        draft.loading = false;
        break;
      }
      case '@assist/CLEAR_MESSAGE': {
        draft.message = '';
        break;
      }
      default:
    }
  });
}
