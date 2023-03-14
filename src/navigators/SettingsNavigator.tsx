import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  About,
  Notifications,
  PhotoManagement,
  Preferences,
  PrivacyAndSecurity,
  Support,
} from '../screens/main';
import FriendManagement from '../screens/main/Settings/FriendManagement';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='FriendManagement' component={FriendManagement} />
      <Stack.Screen name='PhotoManagement' component={PhotoManagement} />
      <Stack.Screen name='PrivacyAndSecurity' component={PrivacyAndSecurity} />
      <Stack.Screen name='Preferences' component={Preferences} />
      <Stack.Screen name='Notifications' component={Notifications} />
      <Stack.Screen name='Support' component={Support} />
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  );
};
export default SettingsNavigator;
