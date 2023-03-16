import { useTheme } from '@rneui/themed';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNearbyUsers } from '../../../hooks';
import PhotoThumbnail from './PhotoThumbnail';

const Home = () => {
  const { theme } = useTheme();
  const { isLoading, profiles } = useNearbyUsers(1000);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {profiles?.map((profile) => (
        <View
          key={profile.id}
          style={{
            width: Dimensions.get('screen').width / 2,
            height: Dimensions.get('screen').width * 0.6,
          }}
        >
          <PhotoThumbnail path={profile.avatar_url!} profile={profile} />
        </View>
      ))}
    </SafeAreaView>
  );
};
export default Home;
