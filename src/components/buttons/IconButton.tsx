import { Icon, IconProps } from '@rneui/themed';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface IconButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  icon: IconProps;
}

const IconButton = (props: IconButtonProps) => {
  const { onPress, icon } = props;
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 24,
        shadowColor: 'black',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: 48,
        height: 48,
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Icon {...icon} />
    </TouchableOpacity>
  );
};
export default IconButton;
