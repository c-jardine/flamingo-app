import React from 'react';
import { View } from 'react-native';
import { PhotoThumbnails } from '../../../../components/core';
import { ProfileContext } from '../../../../contexts';

const PhotoManagement = () => {
  const { profile } = React.useContext(ProfileContext);

  return (
    <View style={{ flex: 1 }}>
      <PhotoThumbnails folderName={profile?.id!} />
    </View>
  );
};
export default PhotoManagement;
