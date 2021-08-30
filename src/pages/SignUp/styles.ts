import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  margin-top: ${Math.floor(StatusBar.currentHeight || 0) + 48}px;
  padding: 0 32px;
`;

export const Header = styled.View`
  align-items: center;
`;

export const HeaderMessage = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;

  text-align: center;

  color: #e94560;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 28px;

  color: #333333;

  margin-top: 32px;
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
