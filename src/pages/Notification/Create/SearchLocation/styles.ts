import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 0 24px;
`;

export const AddressesList = styled(FlatList as new () => FlatList<string>)`
  margin-top: 24px;
`;

interface AddressProps {
  isFirst: boolean;
}

export const AddressItem = styled.TouchableOpacity<AddressProps>`
  border-bottom-color: #eee;
  border-bottom-width: 1px;

  height: 50px;
  padding: 0 24px;
  justify-content: center;

  ${props =>
    props.isFirst &&
    css`
      border-top-color: #eee;
      border-top-width: 1px;
    `}
`;

export const AddressValue = styled.Text<AddressProps>`
  font-family: ${props => (props.isFirst ? 'Roboto-Medium' : 'Roboto-Regular')};
  font-size: 14px;
  color: #333;
`;
