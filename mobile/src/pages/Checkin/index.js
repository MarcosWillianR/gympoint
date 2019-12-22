import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  NewCheckinButton,
  CheckWrapper,
  CheckNumber,
  CheckDate,
} from './styles';

export default function Checkin() {
  return (
    <Container>
      <NewCheckinButton onPress={() => {}}>Novo check-in</NewCheckinButton>
      <CheckWrapper>
        <CheckNumber>Check-in #7</CheckNumber>
        <CheckDate>Hoje às 14h</CheckDate>
      </CheckWrapper>

      <CheckWrapper>
        <CheckNumber>Check-in #6</CheckNumber>
        <CheckDate>Ontem às 20h</CheckDate>
      </CheckWrapper>

      <CheckWrapper>
        <CheckNumber>Check-in #5</CheckNumber>
        <CheckDate>Há 3 dias</CheckDate>
      </CheckWrapper>

      <CheckWrapper>
        <CheckNumber>Check-in #4</CheckNumber>
        <CheckDate>Há 1 semana</CheckDate>
      </CheckWrapper>

      <CheckWrapper>
        <CheckNumber>Check-in #3</CheckNumber>
        <CheckDate>Há 2 semanas</CheckDate>
      </CheckWrapper>

      <CheckWrapper>
        <CheckNumber>Check-in #2</CheckNumber>
        <CheckDate>Há 1 mês</CheckDate>
      </CheckWrapper>

      <CheckWrapper>
        <CheckNumber>Check-in #1</CheckNumber>
        <CheckDate>Há 3 meses</CheckDate>
      </CheckWrapper>
    </Container>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
