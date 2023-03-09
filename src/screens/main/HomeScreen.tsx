import { Button, Text } from '@rneui/themed';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ProfileContext } from '../../contexts';
import { supabase } from '../../supabase';

const HomeScreen = () => {
  const { profile } = React.useContext(ProfileContext);
  return (
    <SafeAreaView>
      <Text>Welcome home, {profile?.full_name}!</Text>
      <Button title='Sign out' onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
};
export default HomeScreen;
