import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px;
`;

export const NewCheckinButton = styled(Button)`
  margin: 10px 0 20px 0;
`;

export const CheckWrapper = styled.View`
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 22px;
  margin-bottom: 16px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CheckNumber = styled.Text`
  font-weight: bold;
  color: #444;
  font-size: 14px;
`;

export const CheckDate = styled.Text`
  color: #666;
  font-size: 14px;
`;
