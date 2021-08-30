import React, { useCallback } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Background,
  LogoContainer,
  LogoImage,
  AppName,
  AppSubName,
  Button,
  ButtonTexts,
  ButtonPrimaryText,
  ButtonSecondaryText,
} from './styles';

import backgroundImg from '../../assets/images/background.jpg';
import logoImg from '../../assets/images/logo.png';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const navigateToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <Container>
      <StatusBar
        translucent={Platform.OS === 'ios' ? false : true}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="rgba(0, 0, 0, 0.1)"
      />
      <Background
        source={backgroundImg}
        imageStyle={{
          backgroundColor: '#000',
          opacity: 0.8,
        }}>
        <LogoContainer>
          <LogoImage source={logoImg} />
        </LogoContainer>

        <AppName>PORTO VELHO</AppName>
        <AppSubName>ILUMINADA</AppSubName>

        <Button onPress={navigateToSignIn}>
          <Icon name="alert-circle" size={24} color="#FFF" />

          <ButtonTexts>
            <ButtonPrimaryText>Viu algo de errado?</ButtonPrimaryText>
            <ButtonSecondaryText> Nos informe agora!</ButtonSecondaryText>
          </ButtonTexts>
        </Button>
      </Background>
    </Container>
  );
};

export default Welcome;
