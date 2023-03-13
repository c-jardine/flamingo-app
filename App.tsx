import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { ProfileProvider } from './src/contexts';
import { MainNavigator } from './src/screens';
import { theme } from './src/theme/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <ProfileProvider>
        <MainNavigator />
      </ProfileProvider>
      <StatusBar style='auto' />
    </ThemeProvider>
  );
}
