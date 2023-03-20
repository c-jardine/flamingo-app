import React from 'react';
import Animated, { BounceIn } from 'react-native-reanimated';
import { AuthContext } from '../../../contexts';
import { useDisclosure } from '../../../hooks';
import { MenuButton, PrimaryButton } from '../../buttons';

interface SetAvatarButtonProps {
  path: string;
}

const SetAvatarButton = (props: SetAvatarButtonProps) => {
  const { profile, updateProfile } = React.useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setAvatar = () => {
    updateProfile({ ...profile!, avatar_url: props.path });
    onClose();
  };

  if (!isOpen) {
    return (
      <MenuButton small onPress={onOpen}>
        Set as avatar
      </MenuButton>
    );
  }

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
        title='Update'
        containerStyle={{ flex: 1 }}
        onPress={setAvatar}
      />
    </Animated.View>
  );
};
export default SetAvatarButton;
