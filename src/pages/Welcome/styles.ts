import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Background = styled.ImageBackground`
  flex: 1;
  padding: 0 24px;
`;

export const LogoContainer = styled.View`
  margin-top: 30%;

  align-items: center;
  justify-content: center;
  align-self: center;

  width: 150px;
  height: 140px;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
`;

export const LogoImage = styled.Image``;

export const AppName = styled.Text`
  margin-top: 8px;

  font-family: 'RobotoCondensed-Bold';
  font-size: 24px;
  text-align: center;

  color: #fff;
  text-shadow: 0px 4px 20px #000000;
`;

export const AppSubName = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  text-align: center;

  color: #fff;

  text-shadow: 0px 4px 20px #000000;
`;

export const Button = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,

  elevation: 24,
})`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 64px;

  margin-top: 30%;

  background: #2e8c24;
  border-radius: 8px;
`;

export const ButtonTexts = styled.View`
  flex-direction: row;

  margin-left: 8px;
`;

export const ButtonPrimaryText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;

  color: #fff;
`;

export const ButtonSecondaryText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 14px;

  color: #fff;
`;
