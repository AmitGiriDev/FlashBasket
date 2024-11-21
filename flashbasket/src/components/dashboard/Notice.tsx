import {
  View,
  Animated as RNAnimated,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {NoticeHeight} from '@utils/Scaling';
import CustomText from '@components/UI/CustomText';
import {Fonts} from '@utils/Constants';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

const Notice = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 20}}>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}>
              It's raining
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              It may take a bit longer
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  heading: {
    marginBottom: 8,
    color: '#2D3875',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  wave: {
    width: '100%',
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
