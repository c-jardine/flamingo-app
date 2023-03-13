import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Profile } from '../components/types';
import { supabase } from '../supabase';

export const usePhotoUpload = () => {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);
  const [photoUri, setPhotoUri] = React.useState<string>('');

  const clear = () => {
    setPhotoUri('');
  };

  const takePhoto = async () => {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.75,
      });

      if (!photo.canceled) {
        setPhotoUri(photo.assets[0].uri);
      } else {
        clear();
      }
    } catch (error) {
      setError(error);
    }
  };

  const uploadPhoto = async (
    profile: Profile,
    updateProfile: (data: Profile) => void
  ) => {
    try {
      setIsUploading(true);
      const fileExt = photoUri?.split('.').pop();

      const photoData = {
        uri: photoUri,
        type: `image/${fileExt}`,
        name: 'avatar',
      } as unknown as File;

      const formData = new FormData();
      formData.append('file', photoData);

      const filePath = `${profile?.id}/${Math.random()}.${fileExt}`;

      let { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, formData);

      if (error) {
        throw error;
      }

      updateProfile({ ...profile, avatar_url: data?.path } as Profile);
    } catch (error) {
      setError(error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    state: { isUploading, error },
    actions: { takePhoto, uploadPhoto, clear },
    photoUri,
  };
};
