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
        options={{
          title: 'Home Feed',
          headerStyle: { backgroundColor: '#3B82FF' },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Iowan Old Style',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='PostDetails'
        component={PostDetailsScreen}
        options={{
          title: 'Post Details',
          headerStyle: { backgroundColor: '#3B82FF' },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Iowan Old Style',
            fontWeight: 'bold',
          },
          headerBackTitleStyle: { color: '#fff' },
          headerBackTitle: 'Back',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
