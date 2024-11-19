import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default function useKeyboardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const keyboardAndroidShowListner = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keyboardAndroidHideListner = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );
    const keyboardIosShowListner = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keyboardIosHideListner = Keyboard.addListener(
      'keyboardWillHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );

    return () => {
      keyboardAndroidShowListner.remove();
      keyboardAndroidHideListner.remove();
      keyboardIosHideListner.remove();
      keyboardIosShowListner.remove();
    };
  }, []);
  return keyboardOffsetHeight;
}
