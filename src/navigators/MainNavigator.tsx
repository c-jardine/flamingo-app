import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSession } from '../hooks';
import { Login } from '../screens/auth';
import { EditProfile, Profile } from '../screens/main';
import MainTabs from './MainTabs';

export type MainStackParamList = {
  Tabs: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Login: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const { session } = useSession();

  console.log(session)

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {!session && (
          <MainStack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
        )}
        <>
          <MainStack.Screen
            name='Tabs'
            component={MainTabs}
            options={{ headerShown: false }}
          />
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
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
