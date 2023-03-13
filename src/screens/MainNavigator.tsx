import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSession } from '../hooks';
import { EditProfileScreen, LoginScreen, ProfileScreen } from './';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { session } = useSession();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          <>
            <Stack.Screen
              name='Home'
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='EditProfile'
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
          </>
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
