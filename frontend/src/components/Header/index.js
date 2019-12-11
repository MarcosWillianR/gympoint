import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Profile, CustomizedLink } from './styles';

import logo from '~/assets/images/logo_home.png';

import { signOut } from '~/store/modules/auth/actions';

export default function Header({ history }) {
  const dispatch = useDispatch();
  const adminName = useSelector(state => state.admin.profile.name);

  const { pathname } = history.location;

  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logo} alt="Gympoint - ir para a pagina inicial" />
        </Link>
        <nav>
          <CustomizedLink to="/">Alunos</CustomizedLink>
          <CustomizedLink to="/plans" active={pathname === '/plans'}>
            Planos
          </CustomizedLink>
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

Header.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
