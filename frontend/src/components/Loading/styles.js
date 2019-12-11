import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: ${props => props.align || 'center'};
  align-items: center;
  ${props => (props.margin ? props.margin : null)}
  height: 100%;
`;

export const Loader = styled.span`
  display: flex;
  width: ${props => props.size || '28px'};
  height: ${props => props.size || '28px'};
  border-radius: 50%;
  border: 2px solid ${props => props.color || '#fff'};
  border-top-color: #e54b64;

  animation: ${loading} 0.6s infinite linear;
`;
