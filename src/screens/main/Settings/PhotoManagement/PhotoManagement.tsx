import React from 'react';
import { Dimensions, View } from 'react-native';
import { PhotoThumbnails } from '../../../../components/core';
import { ProfileContext } from '../../../../contexts';

const PhotoManagement = () => {
  const { profile } = React.useContext(ProfileContext);

  return (
    <View
      style={{
        height: Dimensions.get('screen').height,
        overflow: 'hidden',
      }}
    >
      <PhotoThumbnails folderName={profile?.id!} />
    </View>
  );
};
export default PhotoManagement;
