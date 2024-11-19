import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  CUSTOMER_LOGIN_SCREEN,
  DELIVERY_DASHBOARD_SCREEN,
  DELIVERY_LOGIN_SCREEN,
  PRODUCT_DASHBOARD_SCREEN,
  SPLASH_SCREEN,
} from './ScreenNames';
import SplashScreen from '@features/auth/SplashScreen';
import {navigationRef} from '@utils/Navigation.utils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/dashboard/DeliveryDashboard';

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
        <Stack.Screen
          name={PRODUCT_DASHBOARD_SCREEN}
          component={ProductDashboard}
        />
        <Stack.Screen
          name={DELIVERY_DASHBOARD_SCREEN}
          component={DeliveryDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
