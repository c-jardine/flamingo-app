import { useTheme } from '@rneui/themed';
import React from 'react';
import { Dimensions, View } from 'react-native';

const MainLayout = (props: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        height: Dimensions.get('screen').height,
        overflow: 'hidden',
        backgroundColor: theme.colors.secondary,
      }}
    >
      {props.children}
    </View>
  );
};
export default MainLayout;
