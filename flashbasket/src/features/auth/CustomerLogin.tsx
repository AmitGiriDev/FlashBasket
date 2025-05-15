import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Keyboard,
  Alert,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/Navigation.utils';
import {
  DELIVERY_LOGIN_SCREEN,
  PRODUCT_DASHBOARD_SCREEN,
} from '@navigation/ScreenNames';
import CustomText from '@components/UI/CustomText';
import CustomInput from '@components/UI/CustomInput';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomButton from '@components/UI/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {customerLogin} from '@service/authService';
const bottomColors = [...lightColors].reverse();

const CustomerLogin: FC = () => {
  const [gesturePattern, setGesturePattern] = useState<String[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (keyBoardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyBoardOffsetHeight * 0.84,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyBoardOffsetHeight]);

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNumber);
      resetAndNavigate(PRODUCT_DASHBOARD_SCREEN);
    } catch (error) {
      Alert.alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

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
      // console.log(translationX, translationY, direction);

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
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={'on-drag'}
              contentContainerStyle={styles.subContainer}
              style={{
                transform: [
                  {
                    translateY: animatedValue,
                  },
                ],
              }}>
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/flashBasketLogo.jpeg')}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  Freshness with ⚡peed
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Login or signup
                </CustomText>
                <CustomInput
                  onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                  value={phoneNumber}
                  left={
                    <CustomText
                      style={styles.phoneNumber}
                      fontFamily={Fonts.SemiBold}
                      variant="h6">
                      +91
                    </CustomText>
                  }
                />
                <CustomButton
                  onPress={handleAuth}
                  title="Continue"
                  disabled={phoneNumber.length != 10}
                  loading={loading}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={RFValue(6)}>
              By continuing, you agree to Terms
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneNumber: {
    margin: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
});
