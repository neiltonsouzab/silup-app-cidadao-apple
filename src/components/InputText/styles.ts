import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 8px 0;

  font-family: 'Roboto-Regular';
  font-size: 14px;

  color: #333;
`;
