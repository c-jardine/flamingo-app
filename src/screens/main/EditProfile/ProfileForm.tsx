import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Icon, Text } from '@rneui/themed';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Header } from '../../../components/core';
import { DatePicker, KInput, ModalSelect } from '../../../components/inputs';
import { AuthContext } from '../../../contexts';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';
import { profileFormSchema } from './profileFormSchema';

const ProfileForm = () => {
  const { goBack } = useNavigation();
  const { session, profile, updateProfile } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileProps>({
    defaultValues: {
      first_name: '',
      last_name: '',
      birthday: new Date(),
      gender: '',
      bio: '',
      website: '',
    },
    resolver: yupResolver(profileFormSchema),
  });

  React.useEffect(() => {
    if (profile) {
      const initProfile = {
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        birthday: profile.birthday ?? new Date(),
        gender: profile.gender ?? '',
        bio: profile.bio ?? '',
        website: profile.website ?? '',
      };
      reset(initProfile);
    }
  }, [profile]);

  const _updateProfile = (data: ProfileProps) => {
    try {
      setLoading(true);
      updateProfile(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      goBack();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title='Personal details' />
      {isDirty && (
        <Button
          title={
            <Icon type='ionicon' name='checkmark' color='white' size={18} />
          }
          disabled={loading}
          loading={loading}
          onPress={handleSubmit(_updateProfile)}
          buttonStyle={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: '#00A24A',
          }}
          containerStyle={{
            position: 'absolute',
            zIndex: 1,
            top: 55,
            right: 16,
          }}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && { flex: 1 }}
      >
        <ScrollView>
          <View
            style={{ paddingTop: 16, paddingBottom: 32, paddingHorizontal: 8 }}
          >
            <KInput label='Email' value={session?.user.email} disabled />

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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ProfileForm;
