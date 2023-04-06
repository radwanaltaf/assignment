import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';
import { setUser } from './store/actions/userActions';

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      }
      setIsLoading(false);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
        >
          {isLoading ? (
            <ActivityIndicator size='large' />
          ) : user !== null || isGuest ? (
            <AppNavigator />
          ) : (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              handleGuestLogin={handleGuestLogin}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;
