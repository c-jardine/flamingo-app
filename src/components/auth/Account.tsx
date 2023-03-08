import { useTheme } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useDisclosure, useProfile } from '../../hooks';
import { updateProfile } from '../../utils';
import { PrimaryButton } from '../buttons';
import { SignOutDialog } from '../dialogs';
import { ProfileForm } from '../forms';
import { Profile } from '../types';

export default function Account({ session }: { session: Session }) {
  const { theme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile(session);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    defaultValues: React.useMemo(() => {
      if (profile) {
        return profile;
      }
    }, [profile]),
  });

  /**
   * Reset the form when profile data loads.
   */
  React.useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile]);

  /**
   * Handle profile updating.
   * @param data The data to update the profile with.
   */
  const _updateProfile = async (data: Profile) => {
    setLoading(true);
    await updateProfile(session, data);
    setLoading(false);
  };

  return (
    <>
      <View
        style={{
          paddingTop: 96,
          paddingBottom: 32,
          paddingHorizontal: 16,
          backgroundColor: 'white',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <ProfileForm session={session} control={control} errors={errors} />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          marginTop: 32,
          flexDirection: 'row',
          gap: 16,
        }}
      >
        <PrimaryButton variant='ghost' title='Sign Out' onPress={onOpen} />
        <PrimaryButton
          title={loading ? 'Loading ...' : 'Update'}
          onPress={handleSubmit(_updateProfile)}
          disabled={loading}
          disabledStyle={{ backgroundColor: theme.colors.background }}
        />
      </View>
      <SignOutDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
}
