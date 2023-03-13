import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface MenuButtonProps {
  children: string | React.ReactNode;
  onPress: () => void;
}

const MenuButton = (props: MenuButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
      }}
      onPress={props.onPress}
    >
      <Text>{props.children}</Text>
      <Icon
        type='ionicon'
        name='chevron-forward-outline'
        color='rgba(0,0,0,0.5)'
        style={{ marginRight: 16 }}
      />
    </TouchableOpacity>
  );
};
export default MenuButton;
