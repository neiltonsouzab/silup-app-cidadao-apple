import React, { useCallback, useRef, useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TextInput,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import InputMask from '../../components/InputMask';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

import {
  Content,
  Header,
  HeaderTitle,
  HeaderMessage,
  PrivacyTerm,
  PrivacyTermText,
} from './styles';

interface RouteParams {
  cpfCnpj: string;
}

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState(routeParams.cpfCnpj);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [loading, setLoading] = useState(false);

  const cpfCnpjInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const whatsappInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(() => {
    if (!name) {
      Alert.alert('Atenção', 'Informe o seu nome.');
      setLoading(false);
      return;
    }

    if (!cpfCnpj) {
      Alert.alert('Atenção', 'Informe o seu CPF.');
      setLoading(false);
      return;
    }

    if (!email && !whatsapp) {
      Alert.alert('Atenção', 'Informe seu número de telefone ou e-mail.');
      setLoading(false);
      return;
    }

    setLoading(true);

    signUp({
      cpfCnpj,
      name,
      whatsapp,
      email,
    })
      .then(() => {
        navigation.navigate('CheckCode');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Atenção', error);
        setLoading(false);
      });
  }, [name, cpfCnpj, email, whatsapp, signUp, navigation]);

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
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Content>
              <Header>
                <HeaderMessage>
                  Ops.. parece que você ainda não possui cadastro.
                </HeaderMessage>

                <HeaderTitle>Faça seu cadastro</HeaderTitle>
              </Header>

              <InputText
                placeholder="NOME *"
                icon="user"
                autoCapitalize="characters"
                returnKeyType="next"
                value={name}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                onChangeText={text => setName(text)}
              />

              <InputMask
                editable={false}
                type="cpf"
                placeholder="CPF *"
                icon="credit-card"
                returnKeyType="next"
                value={cpfCnpj}
                ref={cpfCnpjInputRef}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                onChangeText={text => setCpfCnpj(text)}
              />

              <InputText
                placeholder="E-MAIL *"
                icon="mail"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                ref={emailInputRef}
                onSubmitEditing={() => whatsappInputRef.current?.focus()}
                onChangeText={text => setEmail(text)}
              />

              <InputMask
                type="cel-phone"
                placeholder="WHATSAPP *"
                icon="phone"
                returnKeyType="send"
                value={whatsapp}
                ref={whatsappInputRef}
                onSubmitEditing={handleSubmit}
                onChangeText={text => setWhatsapp(text)}
              />

              <Button label="SALVAR" onPress={handleSubmit} loading={loading} />

              <PrivacyTerm onPress={handelOpenTermPrivacy}>
                <PrivacyTermText>Termo de Privacidade</PrivacyTermText>
              </PrivacyTerm>
            </Content>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
