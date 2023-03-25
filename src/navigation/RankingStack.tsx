import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Ranking} from '../screens/Ranking';
import {screen} from '../utils/screenName';

const Stack = createNativeStackNavigator();

export function RankingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={Ranking}
        options={{title: 'Ranking'}}
      />
    </Stack.Navigator>
  );
}
