import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageSourcePropType,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../services/api';
import InputImage from '../../../../components/InputImage';
import Button from '../../../../components/Button';

import lampBrokenSelected from '../../../../assets/images/lamp-broken-selected.png';
import lampBrokenUnselected from '../../../../assets/images/lamp-broken-unselected.png';

import lampErrorSelected from '../../../../assets/images/lamp-error-selected.png';
import lampErrorUnselected from '../../../../assets/images/lamp-error-unselected.png';

import lampMorningSelected from '../../../../assets/images/lamp-morning-selected.png';
import lampMorningUnselected from '../../../../assets/images/lamp-morning-unselected.png';

import lampNewSelected from '../../../../assets/images/lamp-new-selected.png';
import lampNewUnselected from '../../../../assets/images/lamp-new-unselected.png';

import lampNightSelected from '../../../../assets/images/lamp-night-selected.png';
import lampNightUnselected from '../../../../assets/images/lamp-night-unselected.png';

import lampOscillationSelected from '../../../../assets/images/lamp-oscillation-selected.png';
import lampOscillationUnselected from '../../../../assets/images/lamp-oscillation-unselected.png';

import lampOthersSelected from '../../../../assets/images/lamp-others-selected.png';
import lampOthersUnselected from '../../../../assets/images/lamp-others-unselected.png';

import lampUnspecifiedSelected from '../../../../assets/images/lamp-unspecified-selected.png';
import lampUnspecifiedUnselected from '../../../../assets/images/lamp-unspecified-unselected.png';

import {
  Content,
  Header,
  TitleContainer,
  Title,
  LocationDescription,
  Form,
  FormTitle,
  ProblemTypeList,
  ProblemTypeItem,
  ProblemTypeIcon,
  ProblemTypeName,
} from './styles';

interface ProblemTypeResponse {
  status: boolean;
  mensagem: string;
  data: {
    id: number;
    nometipoocorrencia: string;
  }[];
}

interface IconProps {
  [key: string]: {
    selected: ImageSourcePropType;
    unselected: ImageSourcePropType;
  };
}

export interface ProblemType {
  id: number;
  name: string;
  icon: {
    selected: ImageSourcePropType;
    unselected: ImageSourcePropType;
  };
}

const icons: IconProps = {
  Implantação: {
    selected: lampNewSelected,
    unselected: lampNewUnselected,
  },
  'Lâmpada acesa durante o dia': {
    selected: lampMorningSelected,
    unselected: lampMorningUnselected,
  },
  'Lâmpada apagada': {
    selected: lampNightSelected,
    unselected: lampNightUnselected,
  },
  'Lâmpada Oscilando': {
    selected: lampOscillationSelected,
    unselected: lampOscillationUnselected,
  },
  'Medições com erro': {
    selected: lampErrorSelected,
    unselected: lampErrorUnselected,
  },
  'Problema não especificado': {
    selected: lampUnspecifiedSelected,
    unselected: lampUnspecifiedUnselected,
  },
  Vandalismo: {
    selected: lampBrokenSelected,
    unselected: lampBrokenUnselected,
  },
  Outros: {
    selected: lampOthersSelected,
    unselected: lampOthersUnselected,
  },
};

interface RouteParams {
  address: string;
  latitude: number;
  longitude: number;
}

const SelectTypeAndImage: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { address, latitude, longitude } = route.params as RouteParams;

  const [problemsTypes, setProblemsTypes] = useState<ProblemType[]>([]);

  const [problemTypeId, setProblemTypeId] = useState<number>();
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    const loadProblemsTypes = async () => {
      const { data: responseProblemType } = await api.get<ProblemTypeResponse>(
        '/lista_problema_notificacao_cidadao_apple',
      );

      const responseProblemData = responseProblemType.data;
      const problemsList = responseProblemData.map((item): ProblemType => {
        return {
          id: item.id,
          name: item.nometipoocorrencia,
          icon: icons[item.nometipoocorrencia] || {
            selected: lampOthersSelected,
            unselected: lampOthersUnselected,
          },
        };
      });

      setProblemsTypes(problemsList);
    };

    loadProblemsTypes();
  }, []);

  const handleNavigateToInformObservation = useCallback(() => {
    if (!problemTypeId) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios (*).');
      return;
    }

    navigation.navigate('NotificationCreateInformeObservation', {
      latitude,
      longitude,
      imageName,
      problemTypeId,
    });
  }, [latitude, longitude, imageName, problemTypeId, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Content>
            <Header>
              <TitleContainer>
                <Icon name="map-pin" size={16} color="#E94560" />
                <Title>Localização informada</Title>
              </TitleContainer>

              <LocationDescription>{address}</LocationDescription>
            </Header>

            <Form>
              <FormTitle>Informe o tipo do problema *</FormTitle>

              <View>
                <ProblemTypeList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  keyExtractor={item => item.id.toString()}
                  data={problemsTypes}
                  renderItem={({ item }) => (
                    <ProblemTypeItem onPress={() => setProblemTypeId(item.id)}>
                      <ProblemTypeIcon
                        source={
                          problemTypeId === item.id
                            ? item.icon.selected
                            : item.icon.unselected
                        }
                      />
                      <ProblemTypeName>{item.name}</ProblemTypeName>
                    </ProblemTypeItem>
                  )}
                />
              </View>

              <InputImage
                label="Tire uma foto do problema."
                onImageCapture={image => setImageName(image.name)}
              />

              <Button
                label="PRÓXIMO"
                onPress={handleNavigateToInformObservation}
              />
            </Form>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SelectTypeAndImage;
