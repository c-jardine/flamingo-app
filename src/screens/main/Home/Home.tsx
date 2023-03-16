import { Text } from '@rneui/themed';
import { formatDistanceStrict } from 'date-fns';
import { Dimensions, View } from 'react-native';
import { useLocation, useNearbyUsers } from '../../../hooks';
import { Poppins } from '../../../utils';
import PhotoThumbnail from './PhotoThumbnail';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { location, error } = useLocation();
  const { isLoading, profiles } = useNearbyUsers();

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
          <PhotoThumbnail path={profile.avatar_url!} />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: 8,
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
          >
            <Text
              style={{
                fontFamily: Poppins.MEDIUM,
                fontSize: 18,
                color: 'white',
              }}
            >
              {profile.first_name}
            </Text>
            <Text
              style={{
                fontFamily: Poppins.REGULAR,
                fontSize: 14,
                color: 'white',
              }}
            >
              {formatDistanceStrict(new Date(profile.birthday!), new Date())}
            </Text>
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};
export default Home;
