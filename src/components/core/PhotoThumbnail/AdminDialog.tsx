import { Dialog, Divider } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ProfileContext } from '../../../contexts';
import { Poppins } from '../../../utils';
import DeletePhotoButton from './DeletePhotoButton';
import SetAvatarButton from './SetAvatarButton';

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  path: string;
}

const AdminDialog = (props: AdminDialogProps) => {
  const { isOpen, onClose, path } = props;
  const { profile } = React.useContext(ProfileContext);

  return (
    <Dialog
      isVisible={isOpen}
      onBackdropPress={onClose}
      animationType='fade'
      overlayStyle={{ borderRadius: 16, width: 350, overflow: 'hidden' }}
    >
      <Dialog.Title
        title='Photo options'
        titleStyle={{ fontFamily: Poppins.MEDIUM }}
      />
      <View style={{ gap: 8 }}>
        {profile?.avatar_url !== path && <SetAvatarButton path={path} />}
        <DeletePhotoButton path={path} />
      </View>
      <Divider style={{ marginTop: 16 }} />
      <Dialog.Actions>
        <Dialog.Button
          title='Close'
          onPress={onClose}
          titleStyle={{ fontFamily: Poppins.REGULAR }}
        />
      </Dialog.Actions>
    </Dialog>
  );
};
export default AdminDialog;
