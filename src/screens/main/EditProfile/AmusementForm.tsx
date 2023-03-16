import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Icon } from '@rneui/themed';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Header } from '../../../components/core';
import { KInput } from '../../../components/inputs';
import { ProfileContext } from '../../../contexts';
import { ProfileProps } from '../../../types';
import { amusementFormSchema } from './profileFormSchema';

const AmusementForm = () => {
  const { goBack } = useNavigation();
  const { profile, updateProfile } = React.useContext(ProfileContext);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileProps>({
    defaultValues: {
      interests: '',
      hobbies: '',
      books: '',
      movies: '',
      music: '',
      tv_shows: '',
    },
    resolver: yupResolver(amusementFormSchema),
  });

  React.useEffect(() => {
    if (profile) {
      const initProfile = {
        interests: profile.interests ?? '',
        hobbies: profile.hobbies ?? '',
        books: profile.books ?? '',
        movies: profile.movies ?? '',
        music: profile.music ?? '',
        tv_shows: profile.tv_shows ?? '',
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
      <Header title='Amusement' />
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
            <Controller
              name='interests'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='Interests'
                  placeholder='Add some things that interest you, such as arts and crafts, blogging, and cooking.'
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
              name='hobbies'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='Hobbies'
                  placeholder='Add your favorite hobbies, such as working out, playing video games, and cooking.'
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
              name='books'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='Books'
                  placeholder='Add your favorite books or book genres.'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.books?.message as string}
                  errorStyle={{
                    display: errors.books ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />

            <Controller
              name='movies'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='Movies'
                  placeholder='Add your favorite movies or movie genres.'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.movies?.message as string}
                  errorStyle={{
                    display: errors.movies ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />

            <Controller
              name='music'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='Music'
                  placeholder='Add your favorite musicians or musical genres.'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.music?.message as string}
                  errorStyle={{
                    display: errors.music ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />

            <Controller
              name='tv_shows'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='TV Shows'
                  placeholder='Add your favorite TV shows or TV show genres.'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.tv_shows?.message as string}
                  errorStyle={{
                    display: errors.tv_shows ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AmusementForm;
