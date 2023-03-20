import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, Image, Text, useTheme } from '@rneui/themed';
import { differenceInYears } from 'date-fns';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SplashScreen } from '../../../components/utils';
import { AuthContext } from '../../../contexts';
import { useDisclosure, useDownloadPhoto, useProfile } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { Poppins } from '../../../utils';
import AmusementTabView from './AmusementTabView';
import PersonalTabView from './PersonalTabView';
import ProfileLayout from './ProfileLayout';
import ProfilePhotoViewer from './ProfilePhotoViewer';
import Tabs from './Tabs';

type ProfileProps = NativeStackScreenProps<MainStackParamList, 'Profile'>;

const TABS = [
  {
    name: 'personal',
    label: 'Personal',
    icon: { name: 'account' },
    view: PersonalTabView,
  },
  {
    name: 'details',
    label: 'Details',
    icon: { name: 'card-account-details' },
    view: AmusementTabView,
  },
];

const Profile = (props: ProfileProps) => {
  const { theme } = useTheme();
  const { session } = React.useContext(AuthContext);
  const { loading, profile } = useProfile(props.route.params.id);
  const { loading: downloading, photoUri } = useDownloadPhoto(
    profile?.avatar_url!
  );
  const [selectedTab, setSelectedTab] = React.useState<string>('personal');

  const disclosure = useDisclosure();
  const gallery = [{ uri: photoUri }];

  if (loading || downloading || !profile) {
    return <SplashScreen />;
  }

  return (
    <ProfileLayout backgroundImg={photoUri}>
      <View
        style={{
          paddingTop: 32,
          paddingBottom: 8,
        }}
      >
        {profile.id !== session?.user.id && (
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                width: 56,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 32,
                backgroundColor: 'rgba(248,46,75,0.25)',
              }}
            >
              <Icon
                type='material-community'
                name='heart'
                size={24}
                color='rgba(248,46,75,0.5)'
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ChatRoom', {
                  senderId: session?.user.id!,
                  receiverId: profile.id!,
                })
              }
              style={{
                width: 56,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 32,
                backgroundColor: 'rgba(105,106,255,0.25)',
              }}
            >
              <Icon
                type='material-community'
                name='message'
                size={24}
                color='rgba(105,106,255,0.5)'
              />
              <View
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.colors.primary,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            marginTop: 32,
            flexDirection: 'row',
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity onPress={disclosure.onOpen}>
            <Image
              source={{ uri: photoUri }}
              style={{ aspectRatio: 1, width: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, marginTop: 28 }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: Poppins.SEMIBOLD,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {profile?.first_name},{' '}
              {differenceInYears(new Date(), new Date(profile?.birthday!))}
            </Text>
          </View>
        </View>

        <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
      </View>

      <View>
        {React.createElement(
          TABS.filter((tab) => tab.name === selectedTab)[0].view!,
          { profile }
        )}
      </View>
      <ProfilePhotoViewer gallery={gallery} disclosure={disclosure} />
    </ProfileLayout>
  );
};
export default Profile;
