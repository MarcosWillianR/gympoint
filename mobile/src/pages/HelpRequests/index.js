import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  NewHelpRequestButton,
  HelpRequestWrapper,
  Header,
  AnswerStatus,
  AnswerDate,
  Question,
  AnswerStatusText,
} from './styles';

export default function HelpRequests({ navigation }) {
  return (
    <Container>
      <NewHelpRequestButton
        onPress={() => navigation.navigate('NewHelpRequest')}
      >
        Novo pedido de auxílio
      </NewHelpRequestButton>

      <HelpRequestWrapper>
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
      </HelpRequestWrapper>

      <HelpRequestWrapper>
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
      </HelpRequestWrapper>
    </Container>
  );
}

HelpRequests.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={22} color={tintColor} />
  ),
};
