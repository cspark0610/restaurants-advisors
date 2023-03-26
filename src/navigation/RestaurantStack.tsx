import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Restaurant } from '../screens/Restaurants/Restaurant';
import { AddRestaurant } from '../screens/Restaurants/AddRestaurant/AddRestaurant';
import { screen } from '../utils/screenName';

const Stack = createNativeStackNavigator();

/**
 * del Stack
 voy al screen * @returns Screen Restaurant
 desde aca agrego todos los screens que quiero que tenga el stack
 */
export function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={Restaurant}
        options={{ title: 'Restaurantes' }}
      />

      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurant}
        options={{ title: 'Nuevo Restaurante' }}
      />
    </Stack.Navigator>
  );
}
