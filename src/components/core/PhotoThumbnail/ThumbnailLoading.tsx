import { useTheme } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';

const ThumbnailLoading = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        aspectRatio: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.secondary,
      }}
    >
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
};
export default ThumbnailLoading;
