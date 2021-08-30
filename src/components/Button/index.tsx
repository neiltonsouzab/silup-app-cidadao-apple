import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  label: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, loading, ...rest }) => {
  return (
    <ButtonContainer {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <ButtonText>{label}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;
