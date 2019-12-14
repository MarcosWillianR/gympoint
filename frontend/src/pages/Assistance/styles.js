import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 740px;
  margin: 40px auto 0 auto;

  ul {
    background: #fff;
    padding: 25px 30px;
    margin-top: 30px;
    border-radius: 6px;

    h2 {
      font-size: 16px;
      color: #444;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    li {
      border-top: 1px solid #eee;
      margin-top: 20px;
      padding-top: 20px;

      font-size: 16px;
      color: #666;

      display: flex;
      justify-content: space-between;

      button {
        background: 0;
        border: 0;
        color: #4d85ee;
        font-size: 15px;
      }
    }
  }
`;
