import { Button, Text } from '@rneui/themed';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AvatarUploadButton, PrimaryButton } from '../../components/buttons';
import { Profile } from '../../components/types';
import { ProfileContext } from '../../contexts';
import { supabase } from '../../supabase';
import { ProfileForm } from '../../components/forms';
import { FormProvider, useFormContext } from 'react-hook-form';
import { ProfileCreationScreen } from '../auth';

const HomeScreen = ({navigation}) => {
  const { profile, updateProfile } = React.useContext(ProfileContext);
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');

  const methods = useFormContext<Profile>();
  return (
    <SafeAreaView>
      <Text>Welcome home, {profile?.first_name}!</Text>
      <Button
        title='Edit profile'
        onPress={() => navigation.navigate('ProfileCreation')}
      />
      <Button title='Sign out' onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
};
export default HomeScreen;
