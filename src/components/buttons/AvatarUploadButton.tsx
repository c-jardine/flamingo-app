import { Dialog, Image, useTheme } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { ProfileContext } from '../../contexts';
import { useDownloadPhoto, usePhotoUpload } from '../../hooks';
import { Avatar } from '../core';
import IconButton from './IconButton';
import PrimaryButton from './PrimaryButton';

const AvatarUploadButton = () => {
  const { profile } = React.useContext(ProfileContext);
  const { photoUri: avatar } = useDownloadPhoto(profile?.avatar_url!);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  return (
    <View style={{ paddingBottom: isEditing ? 0 : 32 }}>
      <EditableAvatar />
    </View>
  );
};

const EditableAvatar = () => {
  const { state, actions, photoUri } = usePhotoUpload();

  const _handleUpload = async () => {
    try {
      await actions.uploadPhoto();
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
        <Avatar />
      </View>
      <IconButton
        icon={{
          type: 'ionicon',
          name: 'camera',
          size: 24,
        }}
        onPress={actions.takePhoto}
      />
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
            disabled={!photoUri || state.isUploading}
            loading={state.isUploading}
          />
        </View>
      </Dialog>
    </View>
  );
};

const LoadingAvatar = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  );
};

export default AvatarUploadButton;
