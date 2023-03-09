import { Divider, Text, useTheme } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { AuthInput } from '../inputs';
import { Profile } from '../types';

type ProfileFormProps = {
  session: Session;
  control: Control<Profile, any>;
  errors: FieldErrors<Profile>;
};

const ProfileForm = (props: ProfileFormProps) => {
  const { session, control, errors } = props;
  const { theme } = useTheme();
  return (
    <>
      <Text style={{ fontSize: 32, fontWeight: '700' }}>Profile</Text>
      <Text style={{ marginBottom: 32 }}>
        Finish setting up your profile to continue. You can always update it later.
      </Text>
      <AuthInput label='Email' value={session?.user.email} disabled />

      <Divider style={{ marginVertical: 16 }} />

      <Controller
        name='full_name'
        control={control}
        rules={{
          required: { value: true, message: 'Required' },
          minLength: { value: 4, message: 'Must be at least 4 characters' },
          maxLength: {
            value: 32,
            message: 'Must be less than 32 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <AuthInput
              autoComplete='name'
              label='Name'
              placeholder='Enter your name'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.full_name?.message}
              errorStyle={{
                display: errors.full_name ? 'flex' : 'none',
              }}
            />
          </>
        )}
      />

      <Divider style={{ marginVertical: 16 }} />

      <Controller
        name='website'
        control={control}
        rules={{
          required: false,
          maxLength: {
            value: 40,
            message: 'Must be less than 40 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <AuthInput
              keyboardType='url'
              autoCapitalize='none'
              autoCorrect={false}
              label='Website'
              placeholder='Enter your website url'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.website?.message}
              errorStyle={{
                display: errors.full_name ? 'flex' : 'none',
              }}
            />
          </>
        )}
      />
    </>
  );
};
export default ProfileForm;
