import { Session } from '@supabase/supabase-js';
import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { Profile } from '../components/types';

export const useProfile = (session: Session) => {
  const [profileLoading, setProfileLoading] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setProfileLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  return { profileLoading, profile };
};
