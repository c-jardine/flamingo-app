import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Poppins } from '../../utils';

interface MenuButtonProps {
  children: string | React.ReactNode;
  small?: boolean;
  onPress: () => void;
}

const MenuButton = (props: MenuButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: props.small ? 13.5 : 26,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontFamily: Poppins.REGULAR }}>{props.children}</Text>
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
