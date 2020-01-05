import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  Container,
  Question,
  Header,
  Title,
  Date,
  Text,
  Answer,
} from './styles';

import api from '~/services/api';

import Background from '~/components/Background';

export default function HelpRequestAnswer({ navigation }) {
  const studentId = useSelector(state => state.auth.student.id);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function getHelpRequests() {
      try {
        const question_id = navigation.state.params.data;

        const response = await api.get(
          `/students/${studentId}/help-orders/${question_id}`
        );

        const dateFormatted = response.data.answer_at
          ? format(
              parseISO(response.data.answer_at),
              "dd 'de' MMMM 'às' HH':'mm",
              {
                locale: pt,
              }
            )
          : null;

        const data = {
          ...response.data,
          dateFormatted,
        };

        setQuestion(data);
      } catch (err) {
        Alert.alert('Erro', 'Erro ao tentar listar suas respostas');
      }
    }

    getHelpRequests();
  }, []); // eslint-disable-line

  return (
    <Background>
      <Container>
        <Question>
          <Header>
            <Title>Pergunta</Title>
            <Date>{question.answer_at ? question.dateFormatted : ''}</Date>
          </Header>
          <Text>{question.question}</Text>
        </Question>
        <Answer>
          <Header>
            <Title>Resposta</Title>
          </Header>
          <Text>{question.answer}</Text>
        </Answer>
      </Container>
    </Background>
  );
}
