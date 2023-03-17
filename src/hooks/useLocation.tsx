import * as Location from 'expo-location';
import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { useSession } from './useSession';

export const useLocation = () => {
  const { session } = useSession();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        if (session) {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setError('Permission to access location was denied');
            return;
          }

          let userPosition = await Location.getCurrentPositionAsync({});
          setLocation(userPosition);

          const { error } = await supabase.from('location').upsert([
            {
              id: session.user.id,
              created_at: new Date(userPosition.timestamp),
              location: `POINT(${userPosition.coords.longitude} ${userPosition.coords.latitude})`,
            },
          ]);

          if (error) {
            throw new Error('Location error');
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  return { loading, error, location };
};
