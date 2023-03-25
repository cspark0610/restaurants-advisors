import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Favorites} from '../screens/Favorites';
import {screen} from '../utils/screenName';

const Stack = createNativeStackNavigator();

export function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.favorites.favorites}
        component={Favorites}
        options={{title: 'Favoritos'}}
      />
    </Stack.Navigator>
  );
}
