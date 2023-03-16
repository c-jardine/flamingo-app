import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';
import { useSession } from './useSession';

export const useNearbyUsers = () => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [profiles, setProfiles] = React.useState<ProfileProps[]>([]);

  React.useEffect(() => {
    session &&
      (async () => {
        try {
          setIsLoading(true);

          const { data, error } = await supabase
            .from('profiles')
            .select()
            .neq('id', session?.user.id);

          if (error) {
            throw new Error();
          }

          setProfiles(data as ProfileProps[]);
          console.log('DATA', data);
        } catch (error) {
          if (error instanceof Error) {
            console.log('ERROR', error.message);
            Alert.alert(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      })();
  }, [session]);

  return { isLoading, profiles };
};
