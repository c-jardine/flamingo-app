import { Text } from '@rneui/themed';
import { View } from 'react-native';
import { Poppins } from '../../utils';

interface TextSectionProps {
  header: string;
  content: string;
}

const TextSection = (props: TextSectionProps) => {
  const { header, content } = props;
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          fontFamily: Poppins.SEMIBOLD,
        }}
      >
        {header}
      </Text>
      <Text
        style={{
          marginTop: 8,
          fontSize: 14,
          color: 'rgba(0,0,0,0.5)',
          fontFamily: Poppins.REGULAR,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default TextSection;
