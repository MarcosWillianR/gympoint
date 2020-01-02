import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Background from '~/components/Background';

import api from '~/services/api';

import {
  NewHelpRequestButton,
  HelpRequestWrapperButton,
  Header,
  AnswerStatus,
  AnswerDate,
  Question,
  AnswerStatusText,
  HelpRequestList,
} from './styles';

export default function HelpRequests({ navigation }) {
  const studentId = useSelector(state => state.auth.student.id);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getHelpRequests() {
      try {
        const response = await api.get(`/students/${studentId}/help-orders`);

        setQuestions(response.data);
      } catch (err) {
        Alert.alert('Erro', 'Erro ao tentar listar suas perguntas');
      }
    }

    getHelpRequests();
  }, []); // eslint-disable-line

  return (
    <Background>
      <NewHelpRequestButton
        onPress={() => navigation.navigate('NewHelpRequest')}
      >
        Novo pedido de auxílio
      </NewHelpRequestButton>

      <HelpRequestList
        data={questions}
        keyExtractor={question => question._id}
        renderItem={({ item }) => (
          <HelpRequestWrapperButton
            onPress={() =>
              navigation.navigate('HelpRequestAnswer', { data: item._id })
            }
          >
            <Header>
              <AnswerStatus>
                <Icon
                  name="check-circle"
                  size={14}
                  color={item.answer_at ? '#42cb59' : '#999999'}
                />
                <AnswerStatusText color="#999">
                  {item.answer_at ? 'Respondido' : 'Sem resposta'}
                </AnswerStatusText>
              </AnswerStatus>
              <AnswerDate>{item.answer_at ? item.answer_at : null}</AnswerDate>
            </Header>
            <Question>{item.question}</Question>
          </HelpRequestWrapperButton>
        )}
      />
    </Background>
  );
}
