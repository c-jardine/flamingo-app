import React from 'react';
import Animated, { BounceIn } from 'react-native-reanimated';
import { AuthContext } from '../../../contexts';
import { useDisclosure, usePhotoManager } from '../../../hooks';
import { MenuButton, PrimaryButton } from '../../buttons';

interface DeletePhotoButtonProps {
  path: string;
}

const DeletePhotoButton = (props: DeletePhotoButtonProps) => {
  const { profile, updateProfile } = React.useContext(AuthContext);
  const { actions } = usePhotoManager();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!isOpen) {
    return (
      <MenuButton small onPress={onOpen}>
        Delete
      </MenuButton>
    );
  }

  const deletePhoto = () => {
    actions.deletePhotos([props.path]);
    onClose();
  };

  return (
    <Animated.View
      entering={BounceIn.duration(500)}
      style={{ flexDirection: 'row', gap: 8 }}
    >
      <PrimaryButton
        variant='ghost'
        title='Cancel'
        containerStyle={{ flex: 1 }}
        onPress={onClose}
      />
      <PrimaryButton
        title='Delete'
        containerStyle={{ flex: 1 }}
        onPress={deletePhoto}
      />
    </Animated.View>
  );
};
export default DeletePhotoButton;
