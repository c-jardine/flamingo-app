import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSession } from '../hooks';
import { Login } from '../screens/auth';
import { EditProfile, Profile } from '../screens/main';

export type MainStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Login: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const { session } = useSession();

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {session && session.user ? (
          <>
            <MainStack.Screen
              name='Profile'
              component={Profile}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name='EditProfile'
              component={EditProfile}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <MainStack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
