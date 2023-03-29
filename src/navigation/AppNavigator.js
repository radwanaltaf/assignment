// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import HomeFeed from '../components/HomeFeed';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='HomeFeed'
        component={HomeFeed}
        options={{ title: 'Home Feed' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
