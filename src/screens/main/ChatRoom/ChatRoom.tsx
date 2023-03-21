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
import {
  MessageProps,
  useDownloadPhoto,
  useMessaging,
  useProfile,
} from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';

type ChatRoomProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>;

const ChatRoom = (props: ChatRoomProps) => {
  const { theme } = useTheme();
  const { session } = React.useContext(AuthContext);
  const { loading, profile } = useProfile(props.route.params.receiverId!);
  const { loading: downloading, photoUri } = useDownloadPhoto(
    profile?.avatar_url!
  );
  const { messages, createMessage } = useMessaging(
    session?.user.id!,
    profile?.id!
  );

  const [inputFocused, setInputFocused] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const scrollViewRef = React.useRef<ScrollView>();

  const _handleFocus = () => {
    setInputFocused(!inputFocused);
  };

  const _handleSend = (message: string) => {
    createMessage(message);
    setMessage('');
  };

  if (loading || downloading) {
    return <SplashScreen />;
  }

  const MessageBubble = ({ message }: { message: MessageProps }) => {
    return (
      <View
        style={{
          alignItems:
            message.sender_id === profile?.id ? 'flex-start' : 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor:
              message.sender_id === profile?.id
                ? 'white'
                : theme.colors.primary,
            maxWidth: '75%',
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: message.sender_id === profile?.id ? 'black' : 'white',
            }}
          >
            {message.body}
          </Text>
        </View>
        <Text style={{ marginTop: 6, color: 'rgba(0,0,0,0.25)', fontSize: 12 }}>
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
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ padding: 16 }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              // Should first check the scroll position. If it's not at the bottom,
              // it shouldn't scroll. This allows prevents scrolling to the bottom
              // when new messages are received if the user is scrolling through the
              // conversation.
              scrollViewRef?.current?.scrollToEnd({ animated: false })
            }
          >
            {messages && (
              <View style={{ flex: 1, gap: 16 }}>
                {messages.map((message) => (
                  <View
                    key={message.id}
                    style={{
                      alignItems:
                        message.sender_id === profile?.id
                          ? 'flex-start'
                          : 'flex-end',
                    }}
                  >
                    <MessageBubble message={message} />
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingTop: 24,
            paddingBottom: inputFocused ? 16 : 32,
            paddingLeft: 8,
            paddingRight: 16,
            borderTopWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: 'white',
          }}
        >
          <Input
            placeholder='Send a message'
            containerStyle={{ flex: 1 }}
            value={message}
            onChangeText={(e) => setMessage(e)}
            onSubmitEditing={() => _handleSend(message)}
            onFocus={_handleFocus}
            onBlur={_handleFocus}
          />
          <View style={{ marginTop: -8 }}>
            <IconButton
              icon={{
                type: 'material-community',
                name: 'send',
                color: theme.colors.primary,
              }}
              onPress={() => _handleSend(message)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
