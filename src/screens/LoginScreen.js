import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../styledComponents/CustomText';
import { Login } from '../api/Login';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('dasdasd@gmail.com');
  const [password, setPassword] = useState('dsfafsdfsd');

  const handleLogin = async () => {
    try {
      const userData = await Login(email, password);
      onLoginSuccess(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
