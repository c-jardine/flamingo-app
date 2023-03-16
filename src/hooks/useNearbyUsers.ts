import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';
import { useLocation } from './useLocation';
import { useSession } from './useSession';

export const useNearbyUsers = (radius: number) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { location } = useLocation();
  const [profiles, setProfiles] = React.useState<ProfileProps[]>([]);

  React.useEffect(() => {
    session &&
      location &&
      (async () => {
        try {
          setIsLoading(true);

          const { data, error } = await supabase
            .rpc('get_users_within_radius', {
              long: location?.coords.longitude,
              lat: location?.coords.latitude,
              radius,
            })
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
  }, [session, location]);

  return { isLoading, profiles };
};
