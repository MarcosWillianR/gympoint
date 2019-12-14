import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1000;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const AnswerWrapper = styled.div`
  width: 100%;
  max-width: 365px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  padding: 12px 24px;

  h2,
  strong {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  button {
    margin-top: 10px;
    border: 0;
    padding: 12px;

    background-color: #e54b64;
    font-weight: bold;
    text-align: center;
    color: #fff;
    border-radius: 6px;

    transition: background-color 0.3s;

    &:hover {
      background-color: ${darken(0.03, '#e54b64')};
    }
  }
`;
