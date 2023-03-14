import { Dialog, Image } from '@rneui/themed';
import React from 'react';
import { Alert, View } from 'react-native';
import { IconButton, PrimaryButton } from '../../../components/buttons';
import { ProfileContext } from '../../../contexts';
import { useDownloadPhoto, usePhotoManager } from '../../../hooks';
import { ProfileProps } from '../../../types';
import AvatarUploadLoader from './AvatarUploadLoader';

const AvatarUpload = () => {
  const { profile, updateProfile } = React.useContext(ProfileContext);
  const { isDownloading, photoUri } = useDownloadPhoto(profile?.avatar_url!);

  return (
    <>
      {isDownloading || !photoUri ? (
        <AvatarUploadLoader />
      ) : (
        <AvatarInput
          photoUri={photoUri}
          profile={profile!}
          updateProfile={updateProfile}
        />
      )}
    </>
  );
};

const AvatarInput = (props: {
  profile: ProfileProps;
  photoUri: string;
  updateProfile: (data: ProfileProps) => void;
}) => {
  const { profile, photoUri: avatar, updateProfile } = props;
  const { state, actions, photoUri } = usePhotoManager();

  const _handleUpload = async () => {
    try {
      await actions.uploadPhoto(profile, updateProfile);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      actions.clear();
    }
  };

  return (
    <View style={{ position: 'relative', alignItems: 'center' }}>
      <View
        style={{
          aspectRatio: 1,
          width: '50%',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: avatar }}
          accessibilityLabel='Avatar'
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={{ marginTop: -24 }}>
        <IconButton
          icon={{
            type: 'ionicon',
            name: 'camera',
            size: 24,
          }}
          onPress={actions.takePhoto}
        />
      </View>
      <Dialog
        isVisible={!!photoUri}
        overlayStyle={{ borderRadius: 16, width: 350 }}
      >
        <Dialog.Title title='Confirm' />
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Image
            source={{ uri: photoUri }}
            accessibilityLabel='Photo to upload'
            style={{ aspectRatio: 1, width: '100%', borderRadius: 16 }}
          />
        </View>
        <View
          style={{
            marginTop: 32,
            flexDirection: 'row',
            gap: 16,
            paddingHorizontal: 8,
          }}
        >
          <PrimaryButton
            variant='ghost'
            containerStyle={{ flex: 1 }}
            title='Cancel'
            onPress={actions.clear}
          />
          <PrimaryButton
            containerStyle={{ flex: 1 }}
            title='Save'
            onPress={_handleUpload}
            disabled={!photoUri || state.isLoading}
            loading={state.isLoading}
          />
        </View>
      </Dialog>
    </View>
  );
};

export default AvatarUpload;
