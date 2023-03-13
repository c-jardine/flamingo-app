import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { sub } from 'date-fns';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import * as yup from 'yup';
import { PrimaryButton } from '../../components/buttons';
import { ProfileForm } from '../../components/forms';
import { Profile } from '../../components/types';
import { ProfileContext } from '../../contexts';
import { useDisclosure } from '../../hooks';
import { MainLayout } from '../../layouts';

const schema = yup
  .object({
    first_name: yup
      .string()
      .required()
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

const EditProfileScreen = () => {
  const { theme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { profile, updateProfile } = React.useContext(ProfileContext);
  const { goBack } = useNavigation();

  const methods = useForm<Profile>({
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
  const _updateProfile = (data: Profile) => {
    try {
      setLoading(true);
      updateProfile(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error);
      }
    } finally {
      goBack();
    }
  };

  return (
    <MainLayout>
      <FormProvider {...methods}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
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
    </MainLayout>
  );
};

export default EditProfileScreen;