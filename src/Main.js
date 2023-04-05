import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';
import { setUser } from './store/actions/userActions';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      console.log('userData', user);
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
        console.log('user', JSON.parse(userData));
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleLoginSuccess = async userData => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    dispatch(setUser(userData));
  };
  return (
    <NavigationContainer>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={'blue'} />
        {user.user !== null ? (
          <AppNavigator />
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;
