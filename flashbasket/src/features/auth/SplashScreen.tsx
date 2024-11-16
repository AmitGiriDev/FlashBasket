import {View, Text, StyleSheet, Image, Alert, Pressable} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screeHeight, screeWidth} from '@utils/Scaling';
import Logo from '@assets/images/splash_logo-removebg-preview.png';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {navigate, resetAndNavigate} from '@utils/Navigation.utils';
import {CUSTOMER_LOGIN_SCREEN} from '@navigation/ScreenNames';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const accessTokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken');
    const refreshToken = tokenStorage.getString('refreshToken');
    if (accessToken) {
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
      <Image source={Logo} resizeMode="contain" style={styles.logoImage} />
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
