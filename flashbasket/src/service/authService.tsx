import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/Navigation.utils';
import {CUSTOMER_LOGIN_SCREEN} from '@navigation/ScreenNames';
import {appAxios} from './apiInterceptors';

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {
      phone,
    });
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log('error', error);
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get('/user');
    setUser(response.data.user);
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;
    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log(error);
    tokenStorage.clearAll();
    resetAndNavigate(CUSTOMER_LOGIN_SCREEN);
  }
};

export const deliverLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliverPartner} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliverPartner);
    return accessToken;
  } catch (error) {
    console.log('error', error);
  }
};

export const UpdateUserLocation = async (data: any, setuser: any) => {
  try {
    const res = await appAxios.patch('/user', data);
    refetchUser(setuser);
  } catch (error) {
    console.error(error.message);
  }
};
