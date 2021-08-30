import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Content = styled.View`
  flex: 1;
  margin-top: ${Math.floor(StatusBar.currentHeight || 0) + 48}px;
  padding: 0 32px;
`;

export const Header = styled.View`
  align-items: flex-start;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 28px;

  color: #333333;
`;

export const HeaderSubTitle = styled.Text`
  margin-top: 8px;

  font-family: 'Roboto-Medium';
  font-size: 28px;

  color: #333333;
`;

export const PrivacyTerm = styled.TouchableOpacity`
  margin-top: 16px;

  width: 100%;
`;

export const PrivacyTermText = styled.Text`
  text-align: center;

  font-family: 'Roboto-Medium';
  font-size: 14px;
  color: #2e8c24;
`;
