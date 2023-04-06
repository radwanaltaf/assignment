import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Text from '../styledComponents/CustomText';
import { Login } from '../api/Login';

// dasdasd@gmail.com
// dsfafsdfsd
const LoginScreen = ({ onLoginSuccess, handleGuestLogin }) => {
  const [email, setEmail] = useState('dasdasd@gmail.com');
  const [password, setPassword] = useState('dsfafsdfsd');
  const [emailValid, setEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = email_ => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = newEmail => {
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const userData = await Login(email, password);
    setIsLoading(false);
    onLoginSuccess(userData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleEmailChange}
        value={email}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder='Password'
        secureTextEntry
      />

      <TouchableOpacity
        disabled={emailValid === true && password !== '' ? false : true}
        style={
          emailValid === true && password !== ''
            ? styles.button
            : [{ opacity: 0.6 }, styles.button]
        }
        onPress={handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator size='small' color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGuestLogin}>
        <Text style={styles.buttonText}>Login as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '80%',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#3B82FF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
