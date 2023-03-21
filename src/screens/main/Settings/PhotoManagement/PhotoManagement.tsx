import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoThumbnails } from '../../../../components/core';
import { AuthContext } from '../../../../contexts';

const PhotoManagement = () => {
  const { profile } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PhotoThumbnails folderName={profile?.id!} />
    </SafeAreaView>
  );
};
export default PhotoManagement;
