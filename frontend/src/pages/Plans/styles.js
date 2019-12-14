import styled from 'styled-components';
import { darken } from 'polished';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  button {
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
  }
`;

export const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));

  strong {
    font-size: 16px;
    font-weight: bold;
    color: #444;
    text-transform: uppercase;
  }
`;

export const PlansDesc = styled.div`
  position: relative;

  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));

  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-top: 20px;

  span {
    font-size: 16px;
    color: #666;
  }

  button {
    background: 0;
    border: 0;
    position: absolute;
    right: 0;

    font-size: 15px;

    transition: color 0.6s linear;

    &:first-of-type {
      right: 60px;
      color: #4d85ee;
      &:hover {
        color: ${darken(0.04, '#4d85ee')};
      }
    }
    &:last-of-type {
      color: #de3b3b;
      &:hover {
        color: ${darken(0.04, '#de3b3b')};
      }
    }
  }
`;
