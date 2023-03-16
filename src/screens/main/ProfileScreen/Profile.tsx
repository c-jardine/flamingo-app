import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, Image, Text, useTheme } from '@rneui/themed';
import { differenceInYears } from 'date-fns';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { IconButton } from '../../../components/buttons';
import { TextSection } from '../../../components/core';
import { SplashScreen } from '../../../components/utils';
import { ProfileContext } from '../../../contexts';
import { useDisclosure, useDownloadPhoto } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { Poppins } from '../../../utils';

type ProfileProps = NativeStackScreenProps<MainStackParamList, 'Profile'>;

const Profile = (props: ProfileProps) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const { profile } = React.useContext(ProfileContext);
  const { isDownloading, photoUri } = useDownloadPhoto(profile?.avatar_url!);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const gallery = [{ uri: photoUri }];

  const [imageOpacity, setImageOpacity] = React.useState<number>(0);

  const _handleScrollPos = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const relativePosition =
      event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.width;
    if (relativePosition <= 1) {
      setImageOpacity(1 - relativePosition + 0.15);
    }
  };

  if (!profile) {
    return <SplashScreen />;
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
      <TouchableOpacity onPress={onOpen}>
        {isDownloading || !photoUri ? (
          <View
            style={{
              aspectRatio: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </View>
        ) : (
          <Image
            source={{
              uri: photoUri,
            }}
            style={{
              aspectRatio: 1,
              width: '100%',
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}
          />
        )}
      </TouchableOpacity>
      <ImageView
        images={gallery}
        imageIndex={0}
        visible={isOpen}
        onRequestClose={onClose}
        FooterComponent={({ imageIndex }) => {
          return (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 32,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 112,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingHorizontal: 16,
                }}
              >
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{ color: 'rgba(255,255,255,0.35)', fontSize: 16 }}
                  >
                    {imageIndex + 1} / {gallery.length}
                  </Text>
                </View>
              </View>
              <IconButton
                icon={{ type: 'ionicon', name: 'heart' }}
                onPress={() => console.log('like')}
              />
            </View>
          );
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingBottom: 32,
          minHeight:
            Dimensions.get('screen').height - Dimensions.get('screen').width,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={_handleScrollPos}
          scrollEventThrottle={5}
        >
          <View
            style={{
              paddingHorizontal: 32,
            }}
          >
            <View
              style={{
                marginVertical: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: Poppins.SEMIBOLD,
                }}
              >
                {profile?.first_name},{' '}
                {differenceInYears(new Date(), new Date(profile?.birthday!))}
              </Text>
              <Text style={{ marginTop: 8, color: 'rgba(0,0,0,0.5)' }}>
                {profile?.tagline}
              </Text>
            </View>
            <View style={{ gap: 32 }}>
              <TextSection header='About' content={profile?.bio as string} />
              <TextSection
                header='Interests'
                content={profile?.interests as string}
              />
              <TextSection
                header='Hobbies'
                content={profile?.hobbies as string}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Profile;
