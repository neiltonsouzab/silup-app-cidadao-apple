import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Button from '../../components/Button';

import InputMask from '../../components/InputMask';
import { useAuth } from '../../hooks/auth';

import { Content, Title } from './styles';

const ChangePhone: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, changePhone } = useAuth();
  const navigation = useNavigation();

  const handleChangePhone = useCallback(() => {
    if (!phone) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios (*).');
      return;
    }

    setLoading(true);
    changePhone({
      cpfCnpj: user.cpfCnpj,
      phone,
    })
      .then(() => {
        Alert.alert(
          'Atenção',
          'Nº telefone atualizado com sucesso. Enviamos um código para novo número cadastrado.',
        );
        navigation.navigate('CheckCode');
      })
      .catch(error => {
        Alert.alert('Atenção', String(error));
      })
      .finally(() => setLoading(false));
  }, [navigation, changePhone, phone, user.cpfCnpj]);

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
              Informe seu novo Nº de telefone para atualizá-lo em seu cadastro.
            </Title>

            <InputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              placeholder="Nº Telefone *"
              value={phone}
              onChangeText={value => setPhone(value)}
            />

            <Button
              label="ALTERAR Nº TELEFONE"
              onPress={handleChangePhone}
              loading={loading}
            />
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePhone;
