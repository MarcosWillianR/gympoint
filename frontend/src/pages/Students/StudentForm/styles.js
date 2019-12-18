import styled from 'styled-components';
import { darken } from 'polished';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
  }

  button {
    margin-left: 20px;
    display: flex;
    align-items: center;
    border: 0;
    border-radius: 4px;
    padding: 10px 32px 10px 22px;

    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;

    transition: background-color 0.6s linear;

    &:first-of-type {
      background-color: #ccc;
      &:hover {
        background-color: ${darken(0.03, '#ccc')};
      }
    }
    &:last-of-type {
      background-color: #e54b64;
      &:hover {
        background-color: ${darken(0.03, '#e54b64')};
      }
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
  margin-top: 30px;

  form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .fully {
      flex: 1 1 100%;
      margin-bottom: 22px;
    }
    .one_third {
      flex: 1 1 33.333%;
      max-width: calc(33.333% - 20px);

      &:nth-of-type(2) {
        margin: 0 20px;
      }
    }

    div {
      label {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        color: #444;
        span {
          text-transform: lowercase;
        }
      }

      input {
        width: 100%;
        height: 45px;
        margin-top: 10px;
        padding-left: 10px;

        font-size: 16px;
        color: #444;

        border: 1px solid #ddd;
        border-radius: 6px;
      }
    }
  }
`;
