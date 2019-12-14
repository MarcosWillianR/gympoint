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
  max-width: 450px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  padding: 28px;

  h2,
  strong {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    textarea {
      height: 125px;
      resize: none;
      padding: 10px;

      border-radius: 4px;
      border: 1px solid #ddd;

      font-size: 16px;

      &::placeholder {
        color: #999;
      }
    }
  }

  button {
    margin-top: 10px;
    border: 0;
    padding: 12px;

    background-color: #e54b64;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #fff;
    border-radius: 6px;

    transition: background-color 0.3s;

    &:hover {
      background-color: ${darken(0.03, '#e54b64')};
    }
  }
`;
