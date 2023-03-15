import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Tab, TabView, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { PrimaryButton } from '../../../components/buttons';
import { Header } from '../../../components/core';
import { ProfileContext } from '../../../contexts';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { ProfileProps } from '../../../types';
import DatingForm from './DatingForm';
import DetailsForm from './DetailsForm';
import EntertainmentForm from './EntertainmentForm';
import ProfileForm from './ProfileForm';
import { profileFormSchema } from './profileFormSchema';

type EditProfileProps = NativeStackScreenProps<
  MainStackParamList,
  'EditProfile'
>;

const EditProfile = (props: EditProfileProps) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { profile, updateProfile } = React.useContext(ProfileContext);
  const { goBack } = useNavigation();

  const [tabIndex, setTabIndex] = React.useState<number>(0);

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
      goBack();
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
          <Tab
            value={tabIndex}
            onChange={(e) => setTabIndex(e)}
            indicatorStyle={{
              backgroundColor: theme.colors.primary,
              height: 3,
            }}
          >
            <Tab.Item
              title='Profile'
              icon={{
                type: 'ionicon',
                name: 'person-outline',
                color: theme.colors.primary,
                style: { paddingVertical: 8 },
              }}
              titleStyle={{ display: 'none' }}
            />
            <Tab.Item
              title='Details'
              icon={{
                type: 'ionicon',
                name: 'book-outline',
                color: theme.colors.primary,
                style: { paddingVertical: 8 },
              }}
              titleStyle={{ display: 'none' }}
            />
            <Tab.Item
              title='Entertainment'
              icon={{
                type: 'ionicon',
                name: 'film-outline',
                color: theme.colors.primary,
                style: { paddingVertical: 8 },
              }}
              titleStyle={{ display: 'none' }}
            />
            <Tab.Item
              title='Dating'
              icon={{
                type: 'ionicon',
                name: 'heart-outline',
                color: theme.colors.primary,
                style: { paddingVertical: 8 },
              }}
              titleStyle={{ display: 'none' }}
            />
          </Tab>

          <TabView
            value={tabIndex}
            onChange={setTabIndex}
          >
            <TabView.Item style={{ width: '100%' }}>
              <ProfileForm />
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <DetailsForm />
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <EntertainmentForm />
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <DatingForm />
            </TabView.Item>
            <TabView.Item />
          </TabView>
        </KeyboardAvoidingView>
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
