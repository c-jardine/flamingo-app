import React from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../contexts';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';
import { useLocation } from './useLocation';

export const useNearbyUsers = (radius: number) => {
  const { session } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { location } = useLocation();
  const [profiles, setProfiles] = React.useState<ProfileProps[]>([]);

  React.useEffect(() => {
    session &&
      location &&
      (async () => {
        try {
          setLoading(true);

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
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
        } finally {
          setLoading(false);
        }
      })();
  }, [session, location]);

  return { loading, profiles };
};
