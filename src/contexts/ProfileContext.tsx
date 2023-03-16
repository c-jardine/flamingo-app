import React from 'react';
import { Alert } from 'react-native';
import { useSession } from '../hooks';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';

interface ProfileContextProps {
  profile: ProfileProps | null;
  updateProfile: (profileData: ProfileProps) => void;
}

export const ProfileContext = React.createContext<ProfileContextProps>({
  profile: null,
  updateProfile: (profileData: ProfileProps) => Promise<void>,
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);
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
          `id, avatar_url, bio, birthday, books, education, first_name, gender, hobbies, interests, is_drinker, is_smoker, is_stoner, job_title, last_name, movies, music, personality_type, political_affiliation, profile_is_valid, relationship_type, religion, tagline, tv_shows, website`
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

  const updateProfile = async (profileData: ProfileProps) => {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const updates: ProfileProps = {
        ...profile,
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

      data && setProfile(data[0] as ProfileProps);
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
