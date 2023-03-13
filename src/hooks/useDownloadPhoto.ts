import React from 'react';
import { ProfileContext } from '../contexts';
import { supabase } from '../supabase';

export const useDownloadPhoto = (path: string) => {
  const { profile } = React.useContext(ProfileContext);
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const [photoUri, setPhotoUri] = React.useState<string>('');

  React.useEffect(() => {
    if (profile) {
      downloadPhoto(path);
    }
  }, [profile]);

  const downloadPhoto = async (path: string) => {
    try {
      setIsDownloading(true);
      if (!profile?.avatar_url) {
        throw new Error('No profile photo to download.');
      }
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
        console.log('Error downloading image: ', error.message);
        setPhotoUri('https://i.imgur.com/9rUZBZ0.png');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, photoUri };
};
