import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screeHeight, screeWidth} from '@utils/Scaling';
import Logo from '@assets/images/splash_logo-removebg-preview.png';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/Navigation.utils';
import {
  CUSTOMER_LOGIN_SCREEN,
  DELIVERY_DASHBOARD_SCREEN,
  PRODUCT_DASHBOARD_SCREEN,
} from '@navigation/ScreenNames';
import Reanimated, {FadeIn} from 'react-native-reanimated';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_tokens} from '@service/authService';
import {userTypeConstant} from '../../types';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodeToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const accessTokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodeToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodeToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate(CUSTOMER_LOGIN_SCREEN);
        Alert.alert('login expired');
      }
      if (decodedRefreshToken?.exp < currentTime) {
        try {
          refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('something went wrong accessTokenCheck');
          return false;
        }
      }

      if (user?.role === userTypeConstant.Customer) {
        resetAndNavigate(PRODUCT_DASHBOARD_SCREEN);
      } else {
        resetAndNavigate(DELIVERY_DASHBOARD_SCREEN);
      }

      return true;
    }
    resetAndNavigate(CUSTOMER_LOGIN_SCREEN);
    return false;
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        GeoLocation.requestAuthorization();
        accessTokenCheck();
      } catch (error) {
        Alert.alert('Location permission required');
      }
    };
    const timeOutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <View style={styles.container}>
      <Reanimated.Image
        source={Logo}
        resizeMode="contain"
        style={styles.logoImage}
        entering={FadeIn.delay(200).duration(800).springify().damping(20)}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screeHeight * 0.7,
    width: screeWidth * 0.7,
  },
});
