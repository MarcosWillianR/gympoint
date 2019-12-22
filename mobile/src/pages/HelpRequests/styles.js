import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px;
`;

export const NewHelpRequestButton = styled(Button)`
  margin: 10px 0 20px 0;
`;

export const HelpRequestWrapper = styled.View`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;

  padding: 15px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`;

export const AnswerStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AnswerStatusText = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.color || '#999999'};
`;

export const AnswerDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Question = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;
