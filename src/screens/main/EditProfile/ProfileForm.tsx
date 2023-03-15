import { Divider, Text } from '@rneui/themed';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { DatePicker, KInput, ModalSelect } from '../../../components/inputs';
import { useSession } from '../../../hooks';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';

const ProfileForm = () => {
  const { session } = useSession();
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<ProfileProps>();

  return (
    <>
      <View style={{ paddingVertical: 32 }}>
        <KInput
          label='Email'
          value={session?.user.email}
          disabled
          rightIcon={{
            type: 'ionicon',
            name: 'checkmark',
            color: 'green',
            style: { marginTop: 0 },
          }}
        />

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='first_name'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              autoComplete='name-given'
              label='First name'
              placeholder='Flamingo'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.first_name?.message as string}
              errorStyle={{
                display: errors.first_name ? 'flex' : 'none',
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='last_name'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              autoComplete='name-family'
              label='Last name'
              placeholder='Jones'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.last_name?.message as string}
              errorStyle={{
                display: errors.last_name ? 'flex' : 'none',
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='tagline'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Tagline'
              placeholder='Looking for fun'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.tagline?.message as string}
              errorStyle={{
                display: errors.tagline ? 'flex' : 'none',
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontFamily: Poppins.MEDIUM, color: 'black' }}>
              Birthday
            </Text>
            {watch('birthday') ? (
              <Controller
                name='birthday'
                control={control}
                render={({ field }) => <DatePicker {...field} />}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
          {errors.birthday && (
            <Text
              style={{
                marginTop: 12,
                color: 'red',
                fontSize: 12,
                paddingHorizontal: 10,
              }}
            >
              {errors.birthday?.message}
            </Text>
          )}
        </View>

        <Divider style={{ marginVertical: 16 }} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 8,
          }}
        >
          <Text style={{ fontFamily: Poppins.MEDIUM, color: 'black' }}>
            Gender
          </Text>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => {
              return <ModalSelect {...field} />;
            }}
          />
        </View>

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='bio'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Bio'
              placeholder='Tell people about yourself'
              multiline
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.bio?.message as string}
              errorStyle={{
                display: errors.bio ? 'flex' : 'none',
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='hobbies'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Hobbies'
              placeholder='What do you do for fun?'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.hobbies?.message as string}
              errorStyle={{
                display: errors.hobbies ? 'flex' : 'none',
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='interests'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              label='Interests'
              placeholder='What makes you, you?'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.interests?.message as string}
              errorStyle={{
                display: errors.interests ? 'flex' : 'none',
              }}
            />
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        <Controller
          name='website'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <KInput
              keyboardType='url'
              autoCapitalize='none'
              autoCorrect={false}
              label='Website'
              placeholder='Enter your website url'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.website?.message as string}
              errorStyle={{
                display: errors.website ? 'flex' : 'none',
              }}
            />
          )}
        />
      </View>
    </>
  );
};
export default ProfileForm;
