import React from 'react';

// import { Container } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  api.get('/plans');
  return <h1>DASHBOARD</h1>;
}
