import {Colors, Fonts} from '@utils/Constants';
import {ComponentProps, FC, ReactNode} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
interface InputProps {
  left: ReactNode;
  onClear: () => void;
  right?: boolean;
}

const CustomInput: FC<InputProps & ComponentProps<typeof TextInput>> = ({
  left,
  onClear,
  right = true,
  ...props
}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        style={styles.inputContainer}
        placeholderTextColor={'#ccc'}
        {...props}
      />
      <View style={styles.icon}>
        {props.value?.length !== 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={RFValue(16)} color={'#ccc'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  text: {width: '10%', marginLeft: 10},
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 10,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
  inputContainer: {
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBottom: 15,
    height: '100%',
    color: Colors.text,
    bottom: -1,
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
