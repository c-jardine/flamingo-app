import { Divider, Text, useTheme } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFormContext,
} from 'react-hook-form';
import { View } from 'react-native';
import { useSession } from '../../hooks';
import { Poppins } from '../../utils';
import { DatePicker, KInput } from '../inputs';
import { Profile } from '../types';

type ProfileFormProps = {
  session: Session;
  control: Control<Profile, any>;
  errors: FieldErrors<Profile>;
};

const ProfileForm = () => {
  // const { session, control, errors } = props;
  const { session } = useSession();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { theme } = useTheme();

  return (
    <>
      <Text style={{ fontSize: 32, fontWeight: '700' }}>Profile</Text>
      <Text style={{ marginBottom: 32 }}>
        Finish setting up your profile to continue. You can always update it
        later.
      </Text>
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
        rules={{
          required: { value: true, message: 'Required' },
          minLength: { value: 2, message: 'Must be at least 2 characters' },
          maxLength: {
            value: 32,
            message: 'Must be less than 32 characters',
          },
        }}
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
        rules={{
          minLength: { value: 2, message: 'Must be at least 2 characters' },
          maxLength: {
            value: 32,
            message: 'Must be less than 32 characters',
          },
        }}
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
        <Controller
          name='birthday'
          control={control}
          rules={{
            required: { value: true, message: 'Required' },
          }}
          render={({ field }) => {
            return <DatePicker {...field} />;
          }}
        />
      </View>

      <Divider style={{ marginVertical: 16 }} />

      {/* <View
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
          // rules={{
          // }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: 'white',
                    padding: 8,
                    borderRadius: 8,
                    shadowColor: 'black',
                    shadowOffset: { height: 4, width: 0 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                  }}
                  onPress={showDatePicker}
                >
                  <HighlightIcon
                    backgroundColor='#e0f2fe'
                    icon={{
                      type: 'ionicon',
                      name: 'calendar-outline',
                      color: '#38bdf8',
                    }}
                  />
                  <Text style={{ color: 'rgba(0,0,0,0.5)' }}>
                    {format(add(new Date(value), { days: 1 }), 'MMM. dd, yyyy')}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode='date'
                  date={add(new Date(value), { days: 1 })}
                  onConfirm={(date) => handleConfirm(date, onChange)}
                  onCancel={hideDatePicker}
                />
              </>
            );
          }}
        />
      </View> */}

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
    </>
  );
};
export default ProfileForm;
