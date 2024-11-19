import {Colors, Fonts} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
interface Props {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body';

  fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: Object) => void;
}

const CustomText: FC<Props> = ({
  variant = 'body',
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedSize: number;

  switch (variant) {
    case 'h1':
      computedSize = RFValue(fontSize || 22);
      break;
    case 'h2':
      computedSize = RFValue(fontSize || 20);
      break;
    case 'h3':
      computedSize = RFValue(fontSize || 18);
      break;
    case 'h4':
      computedSize = RFValue(fontSize || 16);
      break;
    case 'h5':
      computedSize = RFValue(fontSize || 14);
      break;
    case 'h6':
      computedSize = RFValue(fontSize || 12);
      break;
    case 'h7':
      computedSize = RFValue(fontSize || 12);
      break;
    case 'h8':
      computedSize = RFValue(fontSize || 10);
      break;
    case 'h9':
      computedSize = RFValue(fontSize || 9);
      break;
    case 'body':
      computedSize = RFValue(fontSize || 12);
      break;
  }
  const fontFamilyStyle = {
    fontFamily,
  };

  return (
    <Text
      onLayout={onLayout}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      style={[
        styles.text,
        {
          color: Colors.text,
          fontSize: computedSize,
        },
        fontFamilyStyle,
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {textAlign: 'left'},
});
