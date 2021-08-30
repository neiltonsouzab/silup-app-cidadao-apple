import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NotificationList from '../pages/Notification/List';
import NotificationCreateSelectLocation from '../pages/Notification/Create/SelectLocation';
import NotificationCreateSearchLocation from '../pages/Notification/Create/SearchLocation';
import NotificationCreateSelectTypeAndImage from '../pages/Notification/Create/SelectTypeAndImage';
import NotificationCreateInformeObservation from '../pages/Notification/Create/InformObservation';
import NotificationCreateCreated from '../pages/Notification/Create/Created';

import Header from '../components/Header';

const AppStack = createStackNavigator();

const AppStackRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#FFF',
      },
    }}>
    <AppStack.Screen
      options={{
        headerShown: false,
      }}
      name="NotificationList"
      component={NotificationList}
    />

    <AppStack.Screen
      options={{
        headerShown: true,
        header: () => <Header title="Informe a localização do problema" />,
      }}
      initialParams={{
        latitude: undefined,
        longitude: undefined,
        address: undefined,
      }}
      name="NotificationCreateSelectLocation"
      component={NotificationCreateSelectLocation}
    />

    <AppStack.Screen
      options={{
        headerShown: true,
        header: () => <Header title="Pesquise a localização do problema" />,
      }}
      initialParams={{
        latitude: undefined,
        longitude: undefined,
        address: undefined,
      }}
      name="NotificationCreateSearchLocation"
      component={NotificationCreateSearchLocation}
    />

    <AppStack.Screen
      options={{
        headerShown: true,
        header: () => <Header title="Selecione o tipo do problema" />,
      }}
      name="NotificationCreateSelectTypeAndImage"
      component={NotificationCreateSelectTypeAndImage}
    />

    <AppStack.Screen
      options={{
        headerShown: true,
        header: () => <Header title="Informe uma observação" />,
      }}
      name="NotificationCreateInformeObservation"
      component={NotificationCreateInformeObservation}
    />

    <AppStack.Screen
      name="NotificationCreateCreated"
      component={NotificationCreateCreated}
    />
  </AppStack.Navigator>
);

export default AppStackRoutes;
