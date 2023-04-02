import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeFeed from '../components/HomeFeed';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='HomeFeed'>
      <Stack.Screen
        name='HomeFeed'
        component={HomeFeed}
        options={{ title: 'Home Feed' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
