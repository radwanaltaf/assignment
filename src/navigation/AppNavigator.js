import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeFeed from '../screens/HomeFeed';
import PostDetailsScreen from '../screens/PostDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='HomeFeed'>
      <Stack.Screen
        name='HomeFeed'
        component={HomeFeed}
        options={{ title: 'Home Feed' }}
      />
      <Stack.Screen
        name='PostDetails'
        component={PostDetailsScreen}
        options={{ title: 'Post Details' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
