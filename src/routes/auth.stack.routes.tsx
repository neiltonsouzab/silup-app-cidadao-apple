import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CheckCode from '../pages/CheckCode';
import ChangePhone from '../pages/ChangePhone';

const AuthStackRoutes: React.FC = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Welcome">
    <AuthStack.Screen name="Welcome" component={Welcome} />
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="CheckCode" component={CheckCode} />
    <AuthStack.Screen name="ChangePhone" component={ChangePhone} />
  </AuthStack.Navigator>
);

export default AuthStackRoutes;
