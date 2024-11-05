import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '@utils/Constants';
import {screeHeight, screeWidth} from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
const SplashScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} resizeMode="contain" style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screeHeight * 0.7,
    width: screeWidth * 0.7,
  },
});
