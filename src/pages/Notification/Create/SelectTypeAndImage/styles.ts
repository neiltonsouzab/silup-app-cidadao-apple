import { FlatList, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { ProblemType } from './index';

export const Content = styled.View`
  flex: 1;

  margin-top: ${Math.floor(StatusBar.currentHeight || 0) + 16}px;
  padding: 0 32px;
`;

export const Header = styled.View`
  align-items: center;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: 16px;

  font-family: 'Roboto-Regular';
  font-size: 16px;

  color: #c4c4c4;
`;

export const LocationDescription = styled.Text`
  margin-top: 8px;

  font-family: 'Roboto-Medium';
  font-size: 14px;
  color: #333333;

  text-align: center;
`;

export const Form = styled.View`
  margin-top: 24px;
`;

export const FormTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;

  color: #c4c4c4;
`;

export const ProblemTypeList = styled(
  FlatList as new () => FlatList<ProblemType>,
)`
  margin-top: 16px;
`;

export const ProblemTypeItem = styled.TouchableOpacity`
  align-items: center;
  margin-right: 8px;
`;

export const ProblemTypeIcon = styled.Image``;

export const ProblemTypeName = styled.Text`
  max-width: 70px;
  margin-top: 4px;

  font-family: 'Roboto-Regular';
  font-size: 10px;
  text-align: center;

  color: #333333;
`;
