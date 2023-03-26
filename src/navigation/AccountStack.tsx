import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account } from '../screens/Account/Account';
import { Login } from '../screens/Account/Login';
import { Register } from '../screens/Account/Register';
import { screen } from '../utils/screenName';

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={Account}
        options={{ title: 'Cuenta' }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={Login}
        options={{ title: 'Iniciar Sesion' }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={Register}
        options={{ title: 'Registrar cuenta' }}
      />
    </Stack.Navigator>
  );
}
