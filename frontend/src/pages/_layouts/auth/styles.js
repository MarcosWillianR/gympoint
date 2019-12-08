import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #e54b64;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  box-shadow: 0 1px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 375px;
  background: #fff;
  padding: 60px 30px;
  text-align: center;
  border-radius: 6px;

  img {
    height: 100px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      text-align: left;
      margin-bottom: 8px;
      font-size: 14px;
      color: #444;
      text-transform: uppercase;
      font-weight: bold;

      &:last-of-type {
        margin-top: 15px;
      }
    }

    span {
      color: #e54b64;
      margin-top: 10px;
      font-weight: bold;
      align-self: flex-start;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 45px;
      padding: 0 12px;

      font-size: 16px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    button {
      border: 0;

      height: 45px;
      margin-top: 20px;
      background-color: #e54b64;
      border-radius: 4px;
      font-weight: bold;
      color: #fff;
      font-size: 16px;

      transition: background-color 0.3s linear;

      &:hover {
        background-color: ${darken(0.03, '#e54b64')};
      }
    }
  }
`;
