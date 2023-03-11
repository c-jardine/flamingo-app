import React from 'react';
import { Alert } from 'react-native';
import { Profile } from '../components/types';
import { useSession } from '../hooks';
import { supabase } from '../supabase';

interface ProfileContextProps {
  profile: Profile | null;
  updateProfile: (profileData: Profile) => void;
}

export const ProfileContext = React.createContext<ProfileContextProps>({
  profile: null,
  updateProfile: (profileData: Profile) => Promise<void>,
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const { session } = useSession();

  React.useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(
          `avatar_url, birthday, first_name, gender, last_name, profile_is_valid, website`
        )
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
    }
  };

  const updateProfile = async (profileData: Profile) => {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const updates: Profile = {
        id: session?.user.id,
        avatar_url: profileData.avatar_url,
        birthday: profileData.birthday,
        first_name: profileData.first_name,
        gender: profileData.gender,
        last_name: profileData.last_name,
        updated_at: new Date(),
        profile_is_valid: true,
        website: profileData.website,
      };

      let { data, error } = await supabase
        .from('profiles')
        .upsert(updates)
        .select();

      if (error) {
        throw error;
      }

      data && setProfile(data[0] as Profile);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
