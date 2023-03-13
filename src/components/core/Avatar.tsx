import { Image, useTheme } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ProfileContext } from '../../contexts';
import { useDownloadPhoto } from '../../hooks';

const Avatar = () => {
  const { theme } = useTheme();
  const { profile } = React.useContext(ProfileContext);
  const { isDownloading, photoUri } = useDownloadPhoto(profile?.avatar_url!);

  if (isDownloading || !photoUri) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: photoUri }}
      accessibilityLabel='Avatar'
      style={{ width: '100%', height: '100%' }}
    />
  );
};
export default Avatar;
