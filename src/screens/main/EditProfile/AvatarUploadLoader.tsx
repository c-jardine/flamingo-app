import { useTheme } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';

const AvatarUploadLoader = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  );
};
export default AvatarUploadLoader;
