import { useNavigation } from '@react-navigation/native';
import { Icon, Text, useTheme } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { Poppins } from '../../utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  noNav?: boolean;
}

const Header = (props: HeaderProps) => {
  const { theme } = useTheme();
  const { goBack } = useNavigation();

  return (
    <View
      style={{
        paddingTop: 64,
        paddingBottom: 16,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
      }}
    >
      {!props.noNav && (
        <TouchableOpacity
          onPress={goBack}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 55,
            left: 16,
            padding: 8,
            borderRadius: 32,
          }}
        >
          <Icon type='ionicon' name='chevron-back-outline' />
        </TouchableOpacity>
      )}
      <Text
        style={{
          marginBottom: 0,
          fontFamily: Poppins.SEMIBOLD,
          fontSize: 18,
          paddingHorizontal: 16,
          textAlign: 'center',
        }}
      >
        {props.title}
      </Text>
      {props.subtitle && (
        <Text
          style={{
            fontFamily: Poppins.REGULAR,
            fontSize: 14,
            textAlign: 'center',
            color: theme.colors.primary,
          }}
        >
          {props.subtitle}
        </Text>
      )}
    </View>
  );
};
export default Header;
