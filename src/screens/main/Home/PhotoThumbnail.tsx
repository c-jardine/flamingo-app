import { Image, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ProfileContext } from '../../../contexts';
import { useDisclosure, useDownloadPhoto } from '../../../hooks';

interface PhotoThumbnailProps {
  path: string;
}

const PhotoThumbnail = (props: PhotoThumbnailProps) => {
  const { theme } = useTheme();
  const { isDownloading, photoUri } = useDownloadPhoto(props.path);
  const { profile } = React.useContext(ProfileContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isDownloading || !photoUri ? (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
      ) : (
        <>
          <TouchableOpacity onPress={onOpen}>
            <View
              style={{
                display: profile?.avatar_url === props.path ? 'flex' : 'none',
                backgroundColor: theme.colors.primary,
                position: 'absolute',
                bottom: '-75%',
                right: '-75%',
                zIndex: 1,
                width: '100%',
                height: '100%',
                transform: [{ rotate: '45deg' }],
              }}
            />
            <Image
              source={{ uri: photoUri }}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default PhotoThumbnail;
