import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider, Icon, Text } from '@rneui/themed';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../../../components/core';
import { EditProfileParamList } from '../../../navigators/EditProfileNavigator';
import { Poppins } from '../../../utils';
import AvatarUpload from './AvatarUpload';
import DetailsFormDisplay from './DetailsFormDisplay';
import InterestsFormDisplay from './InterestsFormDisplay';
import ProfileFormDisplay from './ProfileFormDisplay';

type EditProfileProps = NativeStackScreenProps<
  EditProfileParamList,
  'EditProfile'
>;

const EditProfile = (props: EditProfileProps) => {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title='Edit profile' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && { flex: 1 }}
      >
        <ScrollView>
          <View style={{ paddingTop: 16, paddingBottom: 32, gap: 16 }}>
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
                  <Icon type='material-community' name='square-edit-outline' />
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
                  <Icon type='material-community' name='square-edit-outline' />
                </TouchableOpacity>
              </View>
              <DetailsFormDisplay />
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
                  Interests
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('InterestsForm')}
                >
                  <Icon type='material-community' name='square-edit-outline' />
                </TouchableOpacity>
              </View>
              <InterestsFormDisplay />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;
