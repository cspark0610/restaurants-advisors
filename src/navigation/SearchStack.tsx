import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from '../screens/Search';
import { screen } from '../utils/screenName';

const Stack = createNativeStackNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.search.search}
        component={Search}
        options={{ title: 'Search' }}
      />
    </Stack.Navigator>
  );
}
