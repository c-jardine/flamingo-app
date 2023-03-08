import { useTheme } from '@rneui/themed';
import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Platform,
} from 'react-native';

const MainLayout = (props: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#ffe1ea' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props.children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default MainLayout;
