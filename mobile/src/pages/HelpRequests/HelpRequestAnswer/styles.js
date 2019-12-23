import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  max-height: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
`;

export const Question = styled.View`
  margin-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Date = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;

export const Answer = styled.View``;
