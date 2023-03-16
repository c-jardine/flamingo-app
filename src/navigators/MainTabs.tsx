import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from '@rneui/themed';
import { Home, Settings } from '../screens/main';

export type TabsParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

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
              type='material-community'
              name='home'
              color={focused ? theme.colors.primary : 'black'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              type='material-community'
              name='cog'
              color={focused ? theme.colors.primary : 'black'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
export default MainTabs;
