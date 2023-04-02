import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  const handleLoginSuccess = async userData => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={'light-content'} backgroundColor={'blue'} />
          {user !== null ? (
            <AppNavigator />
          ) : (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          )}
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
