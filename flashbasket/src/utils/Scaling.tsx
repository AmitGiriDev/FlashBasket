import {Dimensions, Platform} from 'react-native';

export const screeWidth: number = Dimensions.get('window').width;
export const screeHeight: number = Dimensions.get('window').height;

export const NoticeHeight =
  Platform.OS === 'ios' ? screeHeight * 0.12 : screeHeight * 0.07;
export const NoticeWidth =
  Platform.OS === 'ios' ? screeWidth * 0.12 : screeWidth * 0.07;
