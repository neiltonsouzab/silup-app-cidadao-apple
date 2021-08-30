import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonContainer = styled(RectButton)`
  align-items: center;
  justify-content: center;
  height: 60px;

  background: #2e8c24;

  border-radius: 4px;

  margin-top: 24px;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 14px;

  color: #fff;
`;
