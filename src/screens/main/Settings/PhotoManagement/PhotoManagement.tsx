import React from 'react';
import { View } from 'react-native';
import { PhotoThumbnails } from '../../../../components/core';
import { AuthContext } from '../../../../contexts';

const PhotoManagement = () => {
  const { profile } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <PhotoThumbnails folderName={profile?.id!} />
    </View>
  );
};
export default PhotoManagement;
