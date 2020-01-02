import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Alert } from 'react-native';

import Background from '~/components/Background';

import { signOut } from '~/store/modules/auth/actions';
import { createCheckinRequest } from '~/store/modules/checkin/actions';

import api from '~/services/api';

import {
  NewCheckinButton,
  CheckWrapper,
  CheckNumber,
  CheckDate,
  LogOutButton,
  CheckList,
} from './styles';

export default function Checkin() {
  const studentId = useSelector(state => state.auth.student.id);
  const dispatch = useDispatch();
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function getCheckins() {
      try {
        const response = await api.get(`/students/${studentId}/checkins`);

        const data = response.data.map((checkin, index) => {
          const dateFormatted = format(
            parseISO(checkin.createdAt),
            "dd 'de' MMMM 'às' HH':'mm",
            {
              locale: pt,
            }
          );

          return {
            ...checkin,
            index: index + 1,
            dateFormatted,
          };
        });
        setCheckins(data.reverse());
      } catch (err) {
        Alert.alert(
          'Check-in erro',
          'Ocorreu um erro ao tentar listar seus check-ins'
        );
      }
    }
    getCheckins();
  }, []) // eslint-disable-line

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <NewCheckinButton
        onPress={() => dispatch(createCheckinRequest(studentId))}
      >
        Novo check-in
      </NewCheckinButton>
      <CheckList
        data={checkins}
        keyExtractor={checkin => checkin._id}
        renderItem={({ item }) => (
          <CheckWrapper>
            <CheckNumber>Check-in #{item.index}</CheckNumber>
            <CheckDate>{item.dateFormatted}</CheckDate>
          </CheckWrapper>
        )}
      />
      <LogOutButton onPress={handleLogout}>Sair do Gympoint</LogOutButton>
    </Background>
  );
}
