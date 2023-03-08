import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { Profile } from '../components/types';
import { supabase } from '../supabase';

export const updateProfile = async (session: Session, data: Profile) => {
  try {
    if (!session?.user) throw new Error('No user on the session!');

    const updates = {
      id: session?.user.id,
      full_name: data.full_name,
      website: data.website,
      avatar_url: data.avatar_url,
      updated_at: new Date(),
    };

    let { data: d, error } = await supabase.from('profiles').upsert(updates);

    console.log('DATA', d);
    console.log('ERROR', error);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
};
