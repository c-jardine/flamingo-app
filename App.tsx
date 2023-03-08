import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from '@expo-google-fonts/poppins';
import { ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { Account, Auth } from './src/components/auth';
import { useSession } from './src/hooks';
import { MainLayout } from './src/layouts';
import { theme } from './src/theme/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
  const { session } = useSession();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <View>
          {session && session.user ? (
            <Account key={session.user.id} session={session} />
          ) : (
            <Auth />
          )}
        </View>
      </MainLayout>
      <StatusBar style='auto' backgroundColor='white' />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
