import { Session } from '@supabase/supabase-js';
import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';

interface AuthContextProps {
  session: Session | null;
  profile: ProfileProps | null;
  updateProfile: (profileData: ProfileProps) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  session: null,
  profile: null,
  updateProfile: (profileData: ProfileProps) => Promise<void>,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
    <AuthContext.Provider value={{ session, profile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
