import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import {
  NewHelpRequestButton,
  HelpRequestWrapperButton,
  Header,
  AnswerStatus,
  AnswerDate,
  Question,
  AnswerStatusText,
} from './styles';

export default function HelpRequests({ navigation }) {
  return (
    <Background>
      <NewHelpRequestButton
        onPress={() => navigation.navigate('NewHelpRequest')}
      >
        Novo pedido de auxílio
      </NewHelpRequestButton>
      <HelpRequestWrapperButton
        onPress={() => navigation.navigate('HelpRequestAnswer')}
      >
        <Header>
          <AnswerStatus>
            <Icon name="check-circle" size={14} color="#999999" />
            <AnswerStatusText color="#999">Sem resposta</AnswerStatusText>
          </AnswerStatus>
          <AnswerDate>Hoje às 14h</AnswerDate>
        </Header>
        <Question>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as...
        </Question>
      </HelpRequestWrapperButton>

      <HelpRequestWrapperButton>
        <Header>
          <AnswerStatus>
            <Icon name="check-circle" size={14} color="#42cb59" />
            <AnswerStatusText color="#42cb59">Respondido</AnswerStatusText>
          </AnswerStatus>
          <AnswerDate>Hoje às 14h</AnswerDate>
        </Header>
        <Question>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as...
        </Question>
      </HelpRequestWrapperButton>
    </Background>
  );
}
