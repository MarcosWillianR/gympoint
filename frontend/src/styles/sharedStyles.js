import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 40px auto 0 auto;
`;

export const Title = styled.h1`
  color: #444;
  font-size: 24px;
`;

export const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  padding: 10px 32px 10px 22px;

  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background-color: #e54b64;

  transition: background-color 0.6s linear;

  &:hover {
    background-color: ${darken(0.03, '#e54b64')};

    svg {
      transform: scale(1.3);
    }
  }

  svg {
    transition: transform 0.6s ease-in-out;
    margin-right: 10px;
  }
`;
