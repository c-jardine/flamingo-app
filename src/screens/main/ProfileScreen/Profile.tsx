import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, useTheme } from '@rneui/themed';
import { differenceInYears } from 'date-fns';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SplashScreen } from '../../../components/utils';
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
  const { isLoading, profile } = useProfile(props.route.params.id);
  const { isDownloading, photoUri } = useDownloadPhoto(profile?.avatar_url!);
  const [selectedTab, setSelectedTab] = React.useState<string>('personal');

  const disclosure = useDisclosure();
  const gallery = [{ uri: photoUri }];

  if (isDownloading || !photoUri || isLoading || !profile) {
    return <SplashScreen />;
  }

  return (
    <ProfileLayout backgroundImg={photoUri}>
      <View
        style={{
          paddingTop: 96,
          paddingBottom: 8,
        }}
      >
        <View
          style={{
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
          <View style={{ flex: 1, marginTop: 32 }}>
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
