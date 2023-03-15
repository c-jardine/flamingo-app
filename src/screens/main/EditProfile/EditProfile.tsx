import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider, Icon, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../../../components/buttons';
import { Header } from '../../../components/core';
import { ProfileContext } from '../../../contexts';
import { EditProfileParamList } from '../../../navigators/EditProfileNavigator';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';
import AvatarUpload from './AvatarUpload';
import DetailsFormDisplay from './DetailsFormDisplay';
import ProfileFormDisplay from './ProfileFormDisplay';
import { profileFormSchema } from './profileFormSchema';

type EditProfileProps = NativeStackScreenProps<
  EditProfileParamList,
  'EditProfile'
>;

const EditProfile = (props: EditProfileProps) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { profile, updateProfile } = React.useContext(ProfileContext);

  const methods = useForm<ProfileProps>({
    defaultValues: React.useMemo(() => {
      if (profile) {
        return profile;
      }
    }, [profile]),
    resolver: yupResolver(profileFormSchema),
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
      navigation.goBack();
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title='Edit profile' />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={Platform.OS === 'ios' && { flex: 1 }}
        >
          <ScrollView>
            <View style={{ paddingVertical: 32, gap: 16 }}>
              <View style={{ paddingHorizontal: 16, gap: 16 }}>
                <Text style={{ fontFamily: Poppins.SEMIBOLD, fontSize: 24 }}>
                  Avatar
                </Text>
                <AvatarUpload />
              </View>

              <Divider style={{ marginVertical: 8 }} />

              <View style={{ paddingHorizontal: 16 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontFamily: Poppins.SEMIBOLD, fontSize: 24 }}>
                    Personal info
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileForm')}
                  >
                    <Icon type='ionicon' name='create-outline' />
                  </TouchableOpacity>
                </View>
                <ProfileFormDisplay />
              </View>

              <Divider style={{ marginVertical: 8 }} />

              <View style={{ paddingHorizontal: 16 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontFamily: Poppins.SEMIBOLD, fontSize: 24 }}>
                    Details
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsForm')}
                  >
                    <Icon type='ionicon' name='create-outline' />
                  </TouchableOpacity>
                </View>
                <DetailsFormDisplay />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 32,
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <PrimaryButton
            variant='ghost'
            title='Cancel'
            onPress={navigation.goBack}
          />
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
