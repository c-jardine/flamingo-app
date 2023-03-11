import { Dialog, Text } from '@rneui/themed';
import { View } from 'react-native';
import { supabase } from '../../supabase';
import { PrimaryButton } from '../buttons';
import { DisclosureProps } from '../types';

const SignOutDialog = (props: DisclosureProps) => {
  const { isOpen, onClose } = props;
  return (
    <Dialog
      isVisible={isOpen}
      onBackdropPress={onClose}
      overlayStyle={{ borderRadius: 16, width: 350 }}
    >
      <Dialog.Title title='Confirm' />
      <Text>Are you sure you want to sign out?</Text>
      <View
        style={{
          paddingHorizontal: 16,
          marginTop: 32,
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <PrimaryButton
          variant='ghost'
          title='Sign out'
          onPress={() => supabase.auth.signOut()}
        />
        <PrimaryButton title='Cancel' onPress={onClose} />
      </View>
    </Dialog>
  );
};
export default SignOutDialog;
