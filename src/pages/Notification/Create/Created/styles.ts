import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: 40%;

  background: #2e8c24;
`;

export const SuccessIcon = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 34%;

  width: 100px;
  height: 100px;

  border-radius: 100px;
  background: #fff;
`;

export const SuccessMessage = styled.Text`
  margin-top: 64px;

  font-family: 'Roboto-Medium';
  font-size: 14px;

  color: #333333;
`;

export const SuccessInfo = styled.Text`
  margin-top: 16px;
  padding: 0 32px;

  text-align: center;
  font-family: 'Roboto-Regular';
  font-size: 14px;

  color: #888;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const BackButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 14px;

  color: #2e8c24;
`;
