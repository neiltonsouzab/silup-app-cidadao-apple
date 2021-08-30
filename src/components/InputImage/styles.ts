import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin-top: 24px;

  align-items: center;
  justify-content: center;

  border: 1px dashed #eee;
  border-radius: 4px;

  height: 200px;
`;

export const Label = styled.Text`
  margin-top: 8px;

  font-family: 'Roboto-Regular';
  font-size: 12px;

  color: #c4c4c4;
`;

export const PreviewContainer = styled.TouchableOpacity`
  margin-top: 24px;
  height: 200px;
`;

export const PreviewImage = styled.Image`
  height: 100%;

  border-radius: 4px;
`;
