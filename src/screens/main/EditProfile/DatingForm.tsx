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
import { AuthContext } from '../../../contexts';
import { ProfileProps } from '../../../types';
import { datingFormSchema } from './profileFormSchema';

const DatingForm = () => {
  const { goBack } = useNavigation();
  const { profile, updateProfile } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileProps>({
    defaultValues: {
      relationship_type: '',
    },
    resolver: yupResolver(datingFormSchema),
  });

  React.useEffect(() => {
    if (profile) {
      const initProfile = {
        relationship_type: profile.relationship_type ?? '',
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
      <Header title='Dating' />
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
              name='relationship_type'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KInput
                  multiline
                  label='Relationship type'
                  placeholder="Enter the kind of relationship you're looking for, such as monogamy, polygamy, etc."
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.relationship_type?.message as string}
                  errorStyle={{
                    display: errors.relationship_type ? 'flex' : 'none',
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
export default DatingForm;
