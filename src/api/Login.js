import axios from 'axios';
import Config from 'react-native-config';
import { Alert } from 'react-native';

const baseURL = Config.API_URL;

export const Login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, {
      user: { email, password },
    });
    return response.data;
  } catch (error) {
    console.log('Error logging in:', error);
    Alert.alert('Error', `Invalid email or password. ${error}`);
  }
};
