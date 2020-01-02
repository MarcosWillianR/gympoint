import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

import { NewHelpRequestInput, NewHelpRequestButton, Form } from './styles';

import Background from '~/components/Background';

import { helpCreateRequest } from '~/store/modules/help_request/actions';

export default function NewHelpRequest() {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');

  const loading = useSelector(state => state.helpRequest.loading);
  const studentId = useSelector(state => state.auth.student.id);

  const handleSubmit = () => {
    if (question) {
      dispatch(helpCreateRequest(question, studentId));
      setQuestion('');
    } else {
      Alert.alert(
        'Erro no pedido',
        'Você precisa escrever algo antes de envia o pedido'
      );
    }
  };

  return (
    <Background>
      <Form>
        <NewHelpRequestInput
          multiline
          textAlignVertical="top"
          placeholder="Inclua seu pedido de auxílio"
          numberOfLines={15}
          onSubmitEditing={handleSubmit}
          value={question}
          onChangeText={setQuestion}
        />
        <NewHelpRequestButton onPress={handleSubmit} loading={loading}>
          Enviar pedido
        </NewHelpRequestButton>
      </Form>
    </Background>
  );
}
