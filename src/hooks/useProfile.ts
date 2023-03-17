import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';

export const useProfile = (id: string) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);

  React.useEffect(() => {
    if (id) {
      try {
        setIsLoading(true);

        (async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id', id)
            .limit(1)
            .single();

          if (error) {
            throw new Error('Error getting profile');
          }

          setProfile(data as unknown as ProfileProps);
        })();
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  return { isLoading, profile };
};
