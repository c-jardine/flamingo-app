import React from 'react';
import { supabase } from '../supabase';

export const useDownloadPhoto = (path: string) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [photoUri, setPhotoUri] = React.useState<string>('');

  React.useEffect(() => {
    path ? downloadPhoto() : setPhotoUri('https://i.imgur.com/9rUZBZ0.png');
  }, [path]);

  const downloadPhoto = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setPhotoUri(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, photoUri };
};
