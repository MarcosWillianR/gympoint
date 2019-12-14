import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Face } from './styles';

import icon1 from '~/assets/images/dashboard/undraw_activity_tracker_1l9o.svg';
import icon2 from '~/assets/images/dashboard/undraw_fitness_tracker_3033.svg';
import icon3 from '~/assets/images/dashboard/undraw_healthy_lifestyle_6tyl.svg';
import icon4 from '~/assets/images/dashboard/undraw_personal_trainer_ote3.svg';

const itens = [
  { key: 1, nome: 'Alunos', img: icon1, page: '/' },
  { key: 2, nome: 'Planos', img: icon2, page: '/plans' },
  { key: 3, nome: 'Matrículas', img: icon3, page: '/' },
  { key: 4, nome: 'Pedidos de Auxílio', img: icon4, page: '/help-orders' },
];

export default function Dashboard() {
  return (
    <Container>
      {itens.map(item => (
        <Card key={item.key}>
          <Face className="front">
            <img src={item.img} alt={item.nome} />
            <h2>{item.nome}</h2>
          </Face>
          <Face className="back">
            <Link to={item.page}>Acessar</Link>
          </Face>
        </Card>
      ))}
    </Container>
  );
}
