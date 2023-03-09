import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SplashScreen } from '../components/utils';
import { ProfileContext } from '../contexts';
import { useSession } from '../hooks';
import { HomeScreen, LoginScreen, ProfileCreationScreen } from './';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { session } = useSession();
  const { profile } = React.useContext(ProfileContext);

  // if (!session || !profile) return <SplashScreen />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          profile?.profile_is_valid ? (
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name='ProfileCreation'
              component={ProfileCreationScreen}
              options={{ headerShown: false }}
            />
          )
        ) : (
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
