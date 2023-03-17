import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { PhotoProps } from '../types';

export const usePhotoAlbum = (folderName: string) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [photos, setPhotos] = React.useState<PhotoProps[]>([]);

  React.useEffect(() => {
    if (folderName) {
      getPhotos();
    }
  }, [folderName]);

  const getPhotos = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.storage
        .from('avatars')
        .list(folderName, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) {
        throw new Error("Couldn't fetch album.");
      }

      setPhotos(data as unknown as PhotoProps[]);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { photos };
};
