import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  margin-top: ${Math.floor(StatusBar.currentHeight || 0) + 48}px;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;

  text-align: center;

  color: #333;
`;
