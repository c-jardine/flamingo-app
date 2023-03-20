import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, Text, useTheme } from '@rneui/themed';
import { format, isToday } from 'date-fns';
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
import { AuthContext } from '../../../contexts';
import { useDownloadPhoto, useProfile } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';

type ChatRoomProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>;

const ChatRoom = (props: ChatRoomProps) => {
  const { theme } = useTheme();
  const { session } = React.useContext(AuthContext);
  const { loading, profile } = useProfile(props.route.params.receiverId!);
  const { loading: downloading, photoUri } = useDownloadPhoto(
    profile?.avatar_url!
  );
  // const { messages } = useChatMessages(session?.user.id!, profile?.id!);

  if (loading || downloading) {
    return <SplashScreen />;
  }

  const MessageBubble = ({ message }) => {
    return (
      <View
        style={{
          alignItems:
            message.user_id === profile?.id ? 'flex-start' : 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor:
              message.user_id === profile?.id ? 'white' : theme.colors.primary,
            maxWidth: '75%',
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: message.user_id === profile?.id ? 'black' : 'white',
            }}
          >
            {message.message}
          </Text>
        </View>
        <Text style={{ marginTop: 6, color: 'rgba(0,0,0,0.25)' }}>
          {isToday(new Date(message.created_at))
            ? `${format(new Date(message.created_at), 'hh:mm a')}`
            : `${format(new Date(message.created_at), 'MM/dd/yyyy | hh:mm a')}`}
        </Text>
      </View>
    );
  };

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
            {/* <View style={{ gap: 32 }}>
              {messages?.map((message) => (
                <View
                  style={{
                    alignItems:
                      message.user_id === profile?.id
                        ? 'flex-start'
                        : 'flex-end',
                  }}
                >
                  <MessageBubble message={message} />
                </View>
              ))}
            </View> */}
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
