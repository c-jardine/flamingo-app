import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from '@rneui/themed';
import { Home, Settings } from '../screens/main';

const Tabs = createBottomTabNavigator();

const MainTabs = () => {
  const { theme } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='ionicon'
              name='home'
              color={focused ? theme.colors.primary : 'black'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='EditProfile'
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='ionicon'
              name='settings'
              color={focused ? theme.colors.primary : 'black'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
export default MainTabs;
