import { Icon, IconProps, Text } from '@rneui/themed';
import { View } from 'react-native';

interface IconDetailsProps {
  icon: IconProps;
  content: string;
  light?: boolean;
}

const IconDetails = (props: IconDetailsProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon
        size={24}
        color={props.light ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'}
        {...props.icon}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={{
          flex: 1,
          color: props.light ? 'rgba(255,255,255,0.65)' : 'black',
        }}
      >
        {props.content}
      </Text>
    </View>
  );
};

export default IconDetails;
