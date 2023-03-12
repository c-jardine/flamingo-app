import { useTheme } from '@rneui/themed';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainLayout = (props: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: '#ffe1ea' }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View
          style={{
            height: Dimensions.get('screen').height,
            overflow: 'hidden',
          }}
        >
          {props.children}
        </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};
export default MainLayout;
