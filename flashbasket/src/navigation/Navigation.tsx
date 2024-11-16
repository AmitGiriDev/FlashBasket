import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  CUSTOMER_LOGIN_SCREEN,
  DELIVERY_LOGIN_SCREEN,
  SPLASH_SCREEN,
} from './ScreenNames';
import SplashScreen from '@features/auth/SplashScreen';
import {navigationRef} from '@utils/Navigation.utils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name={CUSTOMER_LOGIN_SCREEN}
          component={CustomerLogin}
        />
        <Stack.Screen name={DELIVERY_LOGIN_SCREEN} component={DeliveryLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
