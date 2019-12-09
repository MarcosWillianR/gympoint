import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  transform-style: preserve-3d;
  margin: 0 12px;
  text-align: center;

  img {
    width: 250px;
  }

  h2 {
    position: absolute;
    top: -50px;
    color: #444444;
    font-size: 22px;
    text-transform: uppercase;
  }

  &:hover div.front {
    transform: perspective(500px) rotateY(180deg);
  }

  &:hover div.back {
    transform: perspective(500px) rotateY(360deg);
  }
`;

export const Face = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;

  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  transition: 2s ease-in-out;
  transform: perspective(500px) rotateY(0deg);

  border-radius: 4px;

  &.front {
    background: ${lighten(0.3, '#e54b64')};
  }

  &.back {
    background: #e54b64;
    transform: perspective(500px) rotateY(180deg);

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 26px;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;

      transition: all 0.6s;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
`;
