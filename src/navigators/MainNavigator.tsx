import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSession } from '../hooks';
import { Login } from '../screens/auth';
import {
  About,
  FriendManagement,
  Notifications,
  PhotoManagement,
  Preferences,
  PrivacyAndSecurity,
  Profile,
  Support,
} from '../screens/main';
import EditProfileNavigator from './EditProfileNavigator';
import MainTabs from './MainTabs';

export type MainStackParamList = {
  Tabs: undefined;
  Profile: undefined;
  EditProfileNavigator: undefined;
  Login: undefined;
  FriendManagement: undefined;
  PhotoManagement: undefined;
  PrivacyAndSecurity: undefined;
  Preferences: undefined;
  Notifications: undefined;
  Support: undefined;
  About: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const { session } = useSession();

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          <>
            <MainStack.Screen name='Tabs' component={MainTabs} />
            <MainStack.Screen name='Profile' component={Profile} />
            <MainStack.Screen
              name='EditProfileNavigator'
              component={EditProfileNavigator}
            />
            <MainStack.Screen
              name='FriendManagement'
              component={FriendManagement}
            />
            <MainStack.Screen
              name='PhotoManagement'
              component={PhotoManagement}
            />
            <MainStack.Screen
              name='PrivacyAndSecurity'
              component={PrivacyAndSecurity}
            />
            <MainStack.Screen name='Preferences' component={Preferences} />
            <MainStack.Screen name='Notifications' component={Notifications} />
            <MainStack.Screen name='Support' component={Support} />
            <MainStack.Screen name='About' component={About} />
          </>
        ) : (
          <MainStack.Screen name='Login' component={Login} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
