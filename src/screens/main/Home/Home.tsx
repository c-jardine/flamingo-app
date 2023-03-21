import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNearbyUsers } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import PhotoThumbnail from './PhotoThumbnail';

type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home = (props: HomeProps) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const { loading, profiles } = useNearbyUsers(10000000);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
      {profiles?.map((profile) => (
        <TouchableOpacity
          key={profile.id}
          style={{
            width: Dimensions.get('screen').width / 2,
            height: Dimensions.get('screen').width * 0.6,
          }}
          onPress={() => navigation.navigate('Profile', { id: profile.id! })}
        >
          <PhotoThumbnail path={profile.avatar_url!} profile={profile} />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};
export default Home;
