import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  SuccessIcon,
  SuccessMessage,
  SuccessInfo,
  BackButton,
  BackButtonText,
} from './styles';

const Created: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToNotificationList = useCallback(() => {
    navigation.navigate('NotificationList');
  }, [navigation]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2E8C24" />
      <Header />
      <SuccessIcon>
        <Icon name="check" size={40} color="#2e8c24" />
      </SuccessIcon>
      <SuccessMessage>Problema informado com sucesso!</SuccessMessage>
      <SuccessInfo>
        Fique de olho nos status do problema. Em breve iremos atendê-lo
      </SuccessInfo>

      <BackButton onPress={handleNavigateToNotificationList}>
        <BackButtonText>Voltar</BackButtonText>
      </BackButton>
    </Container>
  );
};

export default Created;
