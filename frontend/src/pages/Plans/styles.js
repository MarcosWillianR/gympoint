import styled from 'styled-components';
import { darken } from 'polished';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const WithoutPlansWrapper = styled.div`
  grid-column: 3 / -3;
  text-align: center;
  margin-top: 30px;
  p {
    font-size: 1.25rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #e54b64;
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
