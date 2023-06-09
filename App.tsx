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
import { AuthProvider } from './src/contexts';
import { MainNavigator } from './src/navigators';
import { theme } from './src/theme/theme';

const App = () => {
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
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
      <StatusBar style='dark' />
    </ThemeProvider>
  );
};

export default App;
