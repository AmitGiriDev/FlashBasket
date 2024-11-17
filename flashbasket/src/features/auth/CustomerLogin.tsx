import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {FC, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/Navigation.utils';
import {DELIVERY_LOGIN_SCREEN} from '@navigation/ScreenNames';

const CustomerLogin: FC = () => {
  const [gesturePattern, setGesturePattern] = useState<String[]>([]);

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';

      if (Math.abs(translationX) > Math.abs(translationY)) {
        //horizontal scroll
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        //vertical scroll
        direction = translationY < 0 ? 'up' : 'down';
      }
      console.log(translationX, translationY, direction);

      const newSequence = [...gesturePattern, direction].slice(-2);

      setGesturePattern(newSequence);

      if (newSequence.join(' ') === 'up up') {
        setGesturePattern([]);
        resetAndNavigate(DELIVERY_LOGIN_SCREEN);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView style={styles.container}>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={'on-drag'}
            contentContainerStyle={styles.subContainer}></Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
