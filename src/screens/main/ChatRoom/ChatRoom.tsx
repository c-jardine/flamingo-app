import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, Text, useTheme } from '@rneui/themed';
import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { IconButton } from '../../../components/buttons';
import { Header } from '../../../components/core';
import { SplashScreen } from '../../../components/utils';
import { useDownloadPhoto, useProfile } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';

type ChatRoomProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>;

const ChatRoom = (props: ChatRoomProps) => {
  const { theme } = useTheme();
  const { loading, profile } = useProfile(props.route.params.id!);
  const { loading: downloading, photoUri } = useDownloadPhoto(
    profile?.avatar_url!
  );

  if (loading || downloading) {
    return <SplashScreen />;
  }
  return (
    <View
      style={{
        height: Dimensions.get('screen').height,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && { flex: 1 }}
      >
        <View
          style={{
            backgroundColor: 'white',
          }}
        >
          <Header title={profile?.first_name!} subtitle='Not online' />
        </View>
        {photoUri && (
          <View style={{ position: 'absolute', top: 64, right: 16 }}>
            <Image
              source={{ uri: photoUri }}
              style={{ aspectRatio: 1, width: 50, borderRadius: 25 }}
            />
          </View>
        )}
        <View style={{ flexGrow: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              perspiciatis, quas mollitia et repellat iure aliquam, sint animi
              eaque illum soluta? At excepturi earum voluptates libero labore
              quidem aspernatur delectus.
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingTop: 24,
            paddingBottom: 32,
            paddingLeft: 8,
            paddingRight: 16,
            borderTopWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: 'white',
          }}
        >
          <Input
            multiline
            placeholder='Send a message'
            containerStyle={{ flex: 1 }}
          />
          <View style={{ marginTop: -8 }}>
            <IconButton
              icon={{
                type: 'material-community',
                name: 'send',
                color: theme.colors.primary,
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
