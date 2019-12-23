import React from 'react';

import { NewHelpRequestInput, NewHelpRequestButton, Form } from './styles';

import Background from '~/components/Background';

export default function NewHelpRequest() {
  const handleSubmit = () => {};

  return (
    <Background>
      <Form>
        <NewHelpRequestInput
          multiline
          textAlignVertical="top"
          placeholder="Inclua seu pedido de auxílio"
          numberOfLines={15}
          onSubmitEditing={handleSubmit}
        />
        <NewHelpRequestButton>Enviar pedido</NewHelpRequestButton>
      </Form>
    </Background>
  );
}
