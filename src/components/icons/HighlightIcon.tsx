import { Icon, IconProps } from '@rneui/themed';
import { View } from 'react-native';

interface HighlightIconProps {
  icon: Pick<IconProps, 'type' | 'name' | 'color'>;
  backgroundColor: string;
}

const HighlightIcon = (props: HighlightIconProps) => {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        padding: 4,
        borderRadius: 8,
      }}
    >
      <Icon
        type={props.icon.type}
        name={props.icon.name}
        color={props.icon.color}
      />
    </View>
  );
};
export default HighlightIcon;
