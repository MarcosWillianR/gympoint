import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;

  div {
    display: flex;
    align-items: center;
    img {
      width: 220px;
      display: block;
    }

    nav {
      padding: 10px 0 10px 22px;
      margin-left: 12px;
      border-left: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
`;

export const CustomizedLink = styled(Link)`
  margin-right: 10px;
  padding: 10px;

  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
  text-transform: uppercase;
  color: ${props => (props.active ? '#444' : '#999')};

  transition: background-color 0.6s linear, color 0.6s ease-in-out;
  &:hover {
    background-color: ${lighten(0.05, '#e54b64')};
    color: #fff;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  strong {
    font-size: 14px;
    color: #666;
    font-weight: bold;
    margin-bottom: 5px;
  }

  button {
    background: 0;
    border: 0;
    font-size: 14px;
    color: #de3b3b;
  }
`;
