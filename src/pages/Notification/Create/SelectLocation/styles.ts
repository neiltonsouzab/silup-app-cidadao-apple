import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;

  position: relative;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  top: 24px;
  left: 8px;
  right: 8px;
  flex-direction: row;
  justify-content: space-around;
`;

export const ConfirmAddressButton = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 2,
})`
  height: 40px;

  padding: 8px 16px;

  align-items: center;
  justify-content: center;
  background: #2e8c24;

  border-radius: 10px;
`;

export const ConfirmAddressButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 14px;

  color: #fff;
`;

export const EditAddressButton = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 2,
})`
  height: 40px;

  padding: 8px 16px;

  align-items: center;
  justify-content: center;
  background: #ffff;

  border-radius: 10px;
`;

export const EditAddressButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 14px;

  color: #333;
`;

export const AddressInfoContainer = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 2,
})`
  position: absolute;
  height: 60px;
  padding: 0 24px;
  bottom: 24px;
  left: 24px;
  right: 24px;

  justify-content: center;

  background: #fff;
  border-radius: 20px;
`;

export const AddressInfoText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: #333;

  line-height: 20px;
`;
