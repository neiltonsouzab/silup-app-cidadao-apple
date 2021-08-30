import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import InputMask from '../../components/InputMask';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Content,
  Header,
  HeaderTitle,
  HeaderSubTitle,
  PrivacyTerm,
  PrivacyTermText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [cpfCnpj, setCpfCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(() => {
    if (!cpfCnpj) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios (*).');
      return;
    }

    setLoading(true);

    signIn({
      cpfCnpj,
    })
      .then(() => {
        setLoading(false);
        navigation.navigate('CheckCode');
      })
      .catch(() => {
        setLoading(false);
        navigation.navigate('SignUp', { cpfCnpj });
      })
      .finally(() => setLoading(false));
  }, [signIn, cpfCnpj, navigation]);

  const handelOpenTermPrivacy = useCallback(() => {
    Linking.openURL('https://emdur.silup.com.br/termoprivacidade');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#2E8C24"
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content>
            <Header>
              <HeaderTitle>Certo!</HeaderTitle>
              <HeaderSubTitle>Vamos começar?</HeaderSubTitle>
            </Header>

            <InputMask
              icon="credit-card"
              type="cpf"
              placeholder="Informe seu CPF *"
              value={cpfCnpj}
              onChangeText={value => setCpfCnpj(value)}
            />

            <Button label="PRÓXIMO" loading={loading} onPress={handleSignIn} />

            <PrivacyTerm onPress={handelOpenTermPrivacy}>
              <PrivacyTermText>Termo de Privacidade</PrivacyTermText>
            </PrivacyTerm>
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
