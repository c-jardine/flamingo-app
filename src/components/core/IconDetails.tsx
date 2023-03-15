import { Icon, IconProps, Text } from '@rneui/themed';
import { View } from 'react-native';

interface IconDetailsProps {
  icon: IconProps;
  content: string;
}

const IconDetails = (props: IconDetailsProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon size={20} color='rgba(0,0,0,0.5)' {...props.icon} />
      <Text>{props.content}</Text>
    </View>
  );
};

export default IconDetails;
