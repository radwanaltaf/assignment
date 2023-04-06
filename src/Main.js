import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';
import { setUser } from './store/actions/userActions';

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleLoginSuccess = async userData => {
    await AsyncStorage.setItem('user', JSON.stringify(userData.user));
    dispatch(setUser(userData.user));
  };

  const handleGuestLogin = async () => {
    setIsGuest(true);
  };

  return (
    <NavigationContainer>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        {user !== null || isGuest ? (
          <AppNavigator />
        ) : (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            handleGuestLogin={handleGuestLogin}
          />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;
