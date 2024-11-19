import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {DELIVERY_DASHBOARD_SCREEN} from '@navigation/ScreenNames';
import {resetAndNavigate} from '@utils/Navigation.utils';
import {deliverLogin} from '@service/authService';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {screeHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/UI/CustomText';
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/UI/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/UI/CustomButton';

export default function DeliveryLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await deliverLogin(email, password);
      console.log('res', res);

      res && resetAndNavigate(DELIVERY_DASHBOARD_SCREEN);
    } catch (error) {
      Alert.alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'on-drag'}>
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Login
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Bold}>
            faster than flash
          </CustomText>

          <CustomInput
            onClear={() => setEmail('')}
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                color={'#F8890E'}
                size={RFValue(18)}
                style={{marginLeft: 10}}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />
          <CustomInput
            onClear={() => setPassword('')}
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key-sharp"
                color={'#F8890E'}
                size={RFValue(18)}
                style={{marginLeft: 10}}
              />
            }
            placeholder="Password"
            secureTextEntry
            right={false}
          />

          <CustomButton
            disabled={email.length === 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screeHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0,
  },
});
