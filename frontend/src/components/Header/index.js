import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Profile, CustomizedLink } from './styles';

import logo from '~/assets/images/logo_home.png';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const adminName = useSelector(state => state.admin.profile.name);

  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logo} alt="Gympoint - ir para a pagina inicial" />
        </Link>
        <nav>
          <CustomizedLink to="/" active>
            Alunos
          </CustomizedLink>
          <CustomizedLink to="/">Planos</CustomizedLink>
          <CustomizedLink to="/">Matrículas</CustomizedLink>
          <CustomizedLink to="/">Pedidos de Auxílio</CustomizedLink>
        </nav>
      </div>

      <Profile>
        <strong>{adminName}</strong>
        <button type="button" onClick={() => dispatch(signOut())}>
          sair do sistema
        </button>
      </Profile>
    </Container>
  );
}
