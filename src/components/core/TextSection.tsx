import { Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { Poppins } from '../../utils';

interface TextSectionProps {
  header: string;
  content: string;
}

const TextSection = (props: TextSectionProps) => {
  const { theme } = useTheme();
  const { header, content } = props;
  return (
    <View
      style={{
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(255,255,255,0.15)',
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          fontFamily: Poppins.SEMIBOLD,
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {header}
      </Text>
      <Text
        style={{
          marginTop: 8,
          fontSize: 14,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: Poppins.REGULAR,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default TextSection;
