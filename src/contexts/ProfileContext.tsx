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
          `id, avatar_url, bio, birthday, first_name, gender, hobbies, interests, last_name, profile_is_valid, website`
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
        ...profileData,
        id: session?.user.id,
        updated_at: new Date(),
        profile_is_valid: true,
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
