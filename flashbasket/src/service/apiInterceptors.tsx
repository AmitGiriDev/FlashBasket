import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {refresh_tokens} from './authService';
import {Alert} from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = 'Beared ' + newAccessToken;
          return axios(error.config);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (error.response?.status != 401) {
      const errMsg = error.response.data.message || 'something went wrong';
      Alert.alert(errMsg);
    }
    return Promise.resolve(error);
  },
);
