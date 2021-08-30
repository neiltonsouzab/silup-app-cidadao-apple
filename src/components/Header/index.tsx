import React, { useCallback } from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container, Content, Title } from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <View style={{ marginTop: insets.top }} />

      <Content>
        <View />

        <Title>{title}</Title>

        <BorderlessButton onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color="#FFF" />
        </BorderlessButton>
      </Content>
    </Container>
  );
};

export default Header;
