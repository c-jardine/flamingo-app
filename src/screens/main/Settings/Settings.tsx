import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider, Image, Text, useTheme } from '@rneui/themed';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { MenuButton, PrimaryButton } from '../../../components/buttons';
import { ProfileContext } from '../../../contexts';
import { useDownloadPhoto } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { TabsParamList } from '../../../navigators/MainTabs';
import { supabase } from '../../../supabase';
import { Poppins } from '../../../utils';

type SettingsProps = NativeStackScreenProps<
  TabsParamList & MainStackParamList,
  'Settings'
>;

const Settings = (props: SettingsProps) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const { profile } = React.useContext(ProfileContext);
  const { photoUri } = useDownloadPhoto(profile?.avatar_url!);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          paddingTop: 64,
          paddingBottom: 32,
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <View style={{ aspectRatio: 1, width: 96 }}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          )}
        </View>
        <View style={{ flex: 1, gap: 8, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: Poppins.SEMIBOLD }}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', { id: profile?.id! })
              }
            >
              <Text style={{ fontFamily: Poppins.REGULAR }}>View profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfileNavigator')}
            >
              <Text style={{ fontFamily: Poppins.REGULAR }}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />
      <ScrollView>
        <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: Poppins.SEMIBOLD, fontSize: 20 }}>
              Profile management
            </Text>
          </View>
          <MenuButton onPress={() => navigation.navigate('FriendManagement')}>
            Manage friends
          </MenuButton>
          <Divider />
          <MenuButton onPress={() => navigation.navigate('PhotoManagement')}>
            Your photos
          </MenuButton>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 24,
            }}
          >
            <Text style={{ fontFamily: Poppins.SEMIBOLD, fontSize: 20 }}>
              Settings
            </Text>
          </View>
          <MenuButton onPress={() => navigation.navigate('PrivacyAndSecurity')}>
            Privacy & security
          </MenuButton>
          <Divider />
          <MenuButton onPress={() => navigation.navigate('Preferences')}>
            Preferences
          </MenuButton>
          <Divider />
          <MenuButton onPress={() => navigation.navigate('Notifications')}>
            Notifications
          </MenuButton>
          <Divider />
          <MenuButton onPress={() => navigation.navigate('Support')}>
            Support
          </MenuButton>
          <Divider />
          <MenuButton onPress={() => navigation.navigate('About')}>
            About
          </MenuButton>
          <Divider />
          <PrimaryButton
            title='Sign out'
            onPress={() => supabase.auth.signOut()}
            style={{ marginTop: 24 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Settings;
