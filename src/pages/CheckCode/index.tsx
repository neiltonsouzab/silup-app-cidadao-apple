import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
  StatusBar,
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import InputText from '../../components/InputText';
import Button from '../../components/Button';

import {
  Content,
  Title,
  ChangePhoneNumber,
  ChangePhoneNumberText,
} from './styles';

const CheckCode: React.FC = () => {
  const navigation = useNavigation();
  const { user, checkCode } = useAuth();
  const { cpfCnpj } = user;

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');

  // const whatsappMasked = whatsapp.substr(whatsapp.length - 4, whatsapp.length);

  const handleCheckCode = useCallback(() => {
    if (!code) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios (*).');
      return;
    }

    setLoading(true);
    checkCode({
      code,
      cpfCnpj,
    }).catch(error => {
      setLoading(false);
      Alert.alert('Atenção', String(error));
    });
  }, [checkCode, code, cpfCnpj]);

  const handleNavigateToChangePhone = useCallback(() => {
    navigation.navigate('ChangePhone');
  }, [navigation]);

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
            <Title>
              Informe o código enviado ao seu número de whatsapp e/ou endereço
              de e-mail
            </Title>

            <InputText
              placeholder="Código *"
              icon="key"
              keyboardType="numeric"
              value={code}
              onChangeText={text => setCode(text)}
            />

            <Button
              label="ENVIAR"
              onPress={handleCheckCode}
              loading={loading}
            />

            <ChangePhoneNumber onPress={handleNavigateToChangePhone}>
              <ChangePhoneNumberText>
                Caso não receba o código, toque aqui e altere o Nº de seu
                telefone.
              </ChangePhoneNumberText>
            </ChangePhoneNumber>
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckCode;
