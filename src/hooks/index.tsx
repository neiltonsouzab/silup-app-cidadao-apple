import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './auth';
import { GeoProvider } from './geo';

const AppProvider: React.FC = ({ children }) => (
  <SafeAreaProvider>
    <AuthProvider>
      <GeoProvider>{children}</GeoProvider>
    </AuthProvider>
  </SafeAreaProvider>
);

export default AppProvider;
