import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import Loading from '../../../../components/Loading';
import { useGeo } from '../../../../hooks/geo';

import {
  Container,
  ButtonsContainer,
  ConfirmAddressButton,
  ConfirmAddressButtonText,
  EditAddressButton,
  EditAddressButtonText,
  AddressInfoContainer,
  AddressInfoText,
} from './styles';

interface RouteParams {
  address: string;
  latitude: number;
  longitude: number;
}

const SelectLocation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { coords, getAddress } = useGeo();
  const params = route.params as RouteParams;
  const mapRef = useRef<MapView>(null);

  const [latitude, setLatitude] = useState<number | undefined>(
    params.latitude || coords?.latitude,
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    params.longitude || coords?.longitude,
  );
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    const loadAddress = async () => {
      if (latitude && longitude) {
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });

        const currentAddress = await getAddress(latitude, longitude);
        setAddress(currentAddress.full_address);
      }
    };

    loadAddress();
  }, [latitude, longitude, getAddress]);

  const handleSelectLocation = useCallback(async (event: MapEvent) => {
    const { coordinate } = event.nativeEvent;

    setLongitude(coordinate.longitude);
    setLatitude(coordinate.latitude);
  }, []);

  const handleNavigateToSearchLocation = useCallback(() => {
    navigation.navigate('NotificationCreateSearchLocation');
  }, [navigation]);

  const handleNavigateToSelectTypeAndImage = useCallback(() => {
    navigation.navigate('NotificationCreateSelectTypeAndImage', {
      address,
      latitude,
      longitude,
    });
  }, [navigation, address, latitude, longitude]);

  if (!latitude || !longitude || !address) {
    return <Loading message="Carregando sua localização..." />;
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2E8C24" />
      <MapView
        ref={mapRef}
        provider="google"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          position: 'absolute',
        }}>
        <Marker
          draggable
          onDragEnd={handleSelectLocation}
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>

      <ButtonsContainer>
        <ConfirmAddressButton onPress={handleNavigateToSelectTypeAndImage}>
          <ConfirmAddressButtonText>
            CONFIRMAR ENDEREÇO
          </ConfirmAddressButtonText>
        </ConfirmAddressButton>

        <EditAddressButton onPress={handleNavigateToSearchLocation}>
          <EditAddressButtonText>BUSCAR ENDEREÇO</EditAddressButtonText>
        </EditAddressButton>
      </ButtonsContainer>

      <AddressInfoContainer>
        <AddressInfoText>{address}</AddressInfoText>
      </AddressInfoContainer>
    </Container>
  );
};

export default SelectLocation;
