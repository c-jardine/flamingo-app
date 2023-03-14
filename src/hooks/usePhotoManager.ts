import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { ProfileProps } from '../types';

export const usePhotoManager = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    profile: ProfileProps,
    updateProfile: (data: ProfileProps) => void
  ) => {
    try {
      setIsLoading(true);
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

      updateProfile({ ...profile, avatar_url: data?.path } as ProfileProps);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePhotos = async (photos: string[]) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.storage.from('avatars').remove(photos);

      if (error) {
        throw new Error('Error deleting photos:', error);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: { isLoading, error },
    actions: { takePhoto, uploadPhoto, deletePhotos, clear },
    photoUri,
  };
};
