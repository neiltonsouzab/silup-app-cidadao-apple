import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import RNLocation from 'react-native-location';

import api from '../services/api';

interface Coords {
  latitude: number;
  longitude: number;
}

export interface Address {
  number: string;
  route: string;
  district: string;
  city: string;
  state: string;
  full_address: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  type: string[];
}

interface GetAddressResponse {
  results: [
    {
      address_components: {
        long_name: string;
        short_name: string;
        type: string[];
      }[];
      formatted_address: string;
    },
  ];
}

interface SearchAddressResponse {
  predictions: Array<{
    description: string;
  }>;
}

interface GetCoordsByAddressResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}

interface GetAddressByCoordsResponse {
  results: [
    {
      address_components: AddressComponent[];
      formatted_address: string;
    },
  ];
}

interface GeoContextData {
  coords: Coords | undefined;
  getAddress: (latitude: number, longitude: number) => Promise<Address>;
  searchAddress: (filter: string) => Promise<string[]>;
  getCoordsByAddress: (address: string) => Promise<Coords>;
  getAddressByCoords: (latitude: number, longitude: number) => Promise<Address>;
}

const GeoContext = createContext<GeoContextData>({} as GeoContextData);

const GeoProvider: React.FC = ({ children }) => {
  const [coords, setCoords] = useState<Coords>();

  const startUpdatingLocation = useCallback(() => {
    RNLocation.subscribeToLocationUpdates(locations => {
      setCoords({
        latitude: locations[0].latitude,
        longitude: locations[0].longitude,
      });
    });
  }, []);

  const getAddress = useCallback(
    async (latitude: number, longitude: number): Promise<Address> => {
      const { data } = await api.get<GetAddressResponse>(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${latitude},${longitude}`,
            result_type: 'street_address',
            key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
          },
        },
      );

      const number = data.results[0].address_components[0].short_name;
      const route = data.results[0].address_components[1].long_name;
      const district = data.results[0].address_components[2].short_name;
      const city = data.results[0].address_components[3].short_name;
      const state = data.results[0].address_components[4].short_name;
      const full_address = data.results[0].formatted_address;

      return {
        number,
        route,
        district,
        city,
        state,
        full_address,
      };
    },
    [],
  );

  const searchAddress = useCallback(async (filter: string) => {
    const response = await api.get<SearchAddressResponse>(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
          input: filter,
          language: 'pt',
        },
      },
    );

    const { predictions } = response.data;

    return predictions.map(prediction => prediction.description);
  }, []);

  const getCoordsByAddress = useCallback(async (address: string) => {
    const response = await api.get<GetCoordsByAddressResponse>(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
          language: 'pt',
        },
      },
    );

    const { results } = response.data;
    const { lat, lng } = results[0].geometry.location;

    return {
      latitude: lat,
      longitude: lng,
    };
  }, []);

  const getAddressByCoords = useCallback(
    async (latitude: number, longitude: number): Promise<Address> => {
      try {
        const { data } = await api.get<GetAddressByCoordsResponse>(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              latlng: `${latitude},${longitude}`,
              result_type: 'street_address',
              key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
              language: 'pt',
            },
          },
        );

        const number = data.results[0].address_components[0].short_name;
        const route = data.results[0].address_components[1].long_name;
        const district = data.results[0].address_components[2].short_name;
        const city = data.results[0].address_components[3].short_name;
        const state = data.results[0].address_components[4].short_name;
        const full_address = data.results[0].formatted_address;

        return {
          number,
          route,
          district,
          city,
          state,
          full_address,
        };
      } catch {
        throw new Error('Erro ao buscar seu endereço.');
      }
    },
    [],
  );

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 1,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        startUpdatingLocation();
      }
    });
  }, [startUpdatingLocation]);

  return (
    <GeoContext.Provider
      value={{
        coords,
        getAddress,
        searchAddress,
        getCoordsByAddress,
        getAddressByCoords,
      }}>
      {children}
    </GeoContext.Provider>
  );
};

function useGeo(): GeoContextData {
  const context = useContext(GeoContext);

  if (!context) {
    throw new Error('useGeo must be used within an GeoProvider');
  }

  return context;
}

export { GeoProvider, useGeo };
