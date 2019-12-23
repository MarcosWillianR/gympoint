import React from 'react';
import {
  Container,
  Question,
  Header,
  Title,
  Date,
  Text,
  Answer,
} from './styles';

import Background from '~/components/Background';

export default function HelpRequestAnswer() {
  return (
    <Background>
      <Container>
        <Question>
          <Header>
            <Title>Pergunta</Title>
            <Date>Hoje às 14h</Date>
          </Header>
          <Text>
            Olá pessoal da academia, gostaria de saber se quando acordar devo
            ingerir batata doce e frango logo de primeira, preparar as marmitas
            e lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
          </Text>
        </Question>
        <Answer>
          <Header>
            <Title>Resposta</Title>
          </Header>
          <Text>
            Opa, isso aí, duas em duas horas, não deixa pra depois, um monstro
            treina como um, come como dois.
          </Text>
        </Answer>
      </Container>
    </Background>
  );
}
