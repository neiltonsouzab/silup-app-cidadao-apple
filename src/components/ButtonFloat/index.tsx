import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container } from './styles';

interface ButtonFloatProps extends RectButtonProperties {
  icon: string;
}

const ButtonFloat: React.FC<ButtonFloatProps> = ({ icon, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon name={icon} size={24} color="#FFF" />
    </Container>
  );
};

export default ButtonFloat;
