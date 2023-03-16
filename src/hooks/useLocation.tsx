import * as Location from 'expo-location';
import React from 'react';
import { supabase } from '../supabase';
import { useSession } from './useSession';

export const useLocation = () => {
  const { session } = useSession();
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (session) {
        const { error } = await supabase.from('location').upsert([
          {
            id: session.user.id,
            // created_at: new Date(location.timestamp),
            location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
          },
        ]);
        console.log(error);
      }
    })();
  }, [session]);

  return { location, error };
};
