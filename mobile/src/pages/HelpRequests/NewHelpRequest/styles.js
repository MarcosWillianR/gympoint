import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const NewHelpRequestInput = styled(Input)`
  border: 1px solid #ddd;
  padding: 0 10px;
  height: 250px;
  background: #fff;
`;

export const NewHelpRequestButton = styled(Button)`
  margin-top: 20px;
`;

export const Form = styled.View`
  flex: 1;
`;
