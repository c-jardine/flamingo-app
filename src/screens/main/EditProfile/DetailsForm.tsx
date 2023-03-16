import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Icon, Text } from '@rneui/themed';
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
import { Checkbox, KInput } from '../../../components/inputs';
import { ProfileContext } from '../../../contexts';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';
import PersonalityTypeSelector from './PersonalityTypeSelector';
import { detailsFormSchema } from './profileFormSchema';

const DetailsForm = () => {
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
      job_title: '',
      education: '',
      personality_type: '',
      political_affiliation: '',
      religion: '',
      is_drinker: false,
      is_smoker: false,
      is_stoner: false,
    },
    resolver: yupResolver(detailsFormSchema),
  });

  React.useEffect(() => {
    if (profile) {
      const initProfile = {
        job_title: profile.job_title ?? '',
        education: profile.education ?? '',
        personality_type: profile.personality_type ?? '',
        political_affiliation: profile.political_affiliation ?? '',
        religion: profile.religion ?? '',
        is_drinker: profile.is_drinker ?? false,
        is_smoker: profile.is_smoker ?? false,
        is_stoner: profile.is_stoner ?? false,
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
      <Header title='About you' />
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
              name='job_title'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  label='Job title'
                  placeholder='Graphic Designer'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.job_title?.message as string}
                  errorStyle={{
                    display: errors.job_title ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />

            <Controller
              name='education'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  label='Education'
                  placeholder='B.S. Computer Science @ Ohio State University'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.education?.message as string}
                  errorStyle={{
                    display: errors.education ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />

            <Controller
              name='political_affiliation'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  label='Political affiliation'
                  placeholder='Democrat'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.political_affiliation?.message as string}
                  errorStyle={{
                    display: errors.political_affiliation ? 'flex' : 'none',
                  }}
                />
              )}
            />
            <Divider style={{ marginVertical: 16 }} />

            <Controller
              name='religion'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  label='Religion'
                  placeholder='Describe your faith'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.religion?.message as string}
                  errorStyle={{
                    display: errors.religion ? 'flex' : 'none',
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
                Personality type
              </Text>
              <Controller
                name='personality_type'
                control={control}
                render={({ field }) => {
                  return <PersonalityTypeSelector {...field} />;
                }}
              />
            </View>
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
                  Drinker
                </Text>
                <Controller
                  name='is_drinker'
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              </View>
              {errors.is_drinker && (
                <Text
                  style={{
                    marginTop: 12,
                    color: 'red',
                    fontSize: 12,
                    paddingHorizontal: 10,
                  }}
                >
                  {errors.is_drinker?.message}
                </Text>
              )}
            </View>
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
                  Smoker
                </Text>
                <Controller
                  name='is_smoker'
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              </View>
              {errors.is_smoker && (
                <Text
                  style={{
                    marginTop: 12,
                    color: 'red',
                    fontSize: 12,
                    paddingHorizontal: 10,
                  }}
                >
                  {errors.is_smoker?.message}
                </Text>
              )}
            </View>
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
                  Stoner
                </Text>
                <Controller
                  name='is_stoner'
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              </View>
              {errors.is_stoner && (
                <Text
                  style={{
                    marginTop: 12,
                    color: 'red',
                    fontSize: 12,
                    paddingHorizontal: 10,
                  }}
                >
                  {errors.is_stoner?.message}
                </Text>
              )}
            </View>
            <Divider style={{ marginVertical: 16 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default DetailsForm;
