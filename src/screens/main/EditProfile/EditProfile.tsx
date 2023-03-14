import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { sub } from 'date-fns';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import * as yup from 'yup';
import { PrimaryButton } from '../../../components/buttons';
import { ProfileContext } from '../../../contexts';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { ProfileProps } from '../../../types';
import ProfileForm from './ProfileForm';

const schema = yup
  .object({
    first_name: yup
      .string()
      .required('Required')
      .min(2, 'Must be at least 2 characters!')
      .max(32, 'Must be less than 32 characters'),
    last_name: yup.string().max(32, 'Must be less than 32 characters'),
    tagline: yup.string().max(64, 'Too many characters'),
    birthday: yup
      .date()
      .min(sub(new Date(), { years: 100 }), 'Must be less than 100 years old')
      .max(sub(new Date(), { years: 18 }), 'Must be at least 18 years old'),
    bio: yup.string().max(256, 'Too many characters'),
    hobbies: yup.string().max(256, 'Too many characters'),
    interests: yup.string().max(256, 'Too many characters'),
  })
  .required();

type EditProfileProps = NativeStackScreenProps<
  MainStackParamList,
  'EditProfile'
>;

const EditProfile = (props: EditProfileProps) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { profile, updateProfile } = React.useContext(ProfileContext);
  const { goBack } = useNavigation();

  const methods = useForm<ProfileProps>({
    defaultValues: React.useMemo(() => {
      if (profile) {
        return profile;
      }
    }, [profile]),
    resolver: yupResolver(schema),
  });

  /**
   * Reset the form when profile data loads.
   */
  React.useEffect(() => {
    if (profile) {
      const initProfile = {
        ...profile,
        birthday: profile.birthday ?? new Date(),
      };
      methods.reset(initProfile);
    }
  }, [profile]);

  /**
   * Handle profile updating.
   * @param data The data to update the profile with.
   */
  const _updateProfile = (data: ProfileProps) => {
    try {
      setLoading(true);
      updateProfile(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      goBack();
    }
  };

  return (
    <FormProvider {...methods}>
      <View
        style={{
          height: Dimensions.get('screen').height,
          overflow: 'hidden',
          backgroundColor: theme.colors.secondary,
          paddingBottom: 32,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 64,
            paddingHorizontal: 16,
            overflow: 'hidden',
            backgroundColor: 'white',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={Platform.OS === 'ios' && { flex: 1 }}
          >
            <ScrollView>
              <ProfileForm />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 32,
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <PrimaryButton variant='ghost' title='Cancel' onPress={goBack} />
          <PrimaryButton
            title={loading ? 'Loading ...' : 'Update'}
            onPress={methods.handleSubmit(_updateProfile)}
            disabled={loading}
            disabledStyle={{ backgroundColor: theme.colors.background }}
          />
        </View>
      </View>
    </FormProvider>
  );
};

export default EditProfile;
