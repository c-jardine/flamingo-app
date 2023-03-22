import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input, useTheme } from '@rneui/themed';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../../../components/buttons';
import { SplashScreen } from '../../../components/utils';
import { AuthContext } from '../../../contexts';
import { useMessaging, useProfile, useTyping } from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomScroller from './ChatRoomScroller';

type ChatRoomProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>;

const ChatRoom = (props: ChatRoomProps) => {
  const { theme } = useTheme();

  // Authenticated user is the sender.
  const { session: sender } = React.useContext(AuthContext);

  // Get the recipient's profile.
  const { loading, profile } = useProfile(props.route.params.receiverId!);

  // Get the conversation's messages.
  const {
    loading: conversationLoading,
    conversationId,
    messages,
    createMessage,
  } = useMessaging(sender?.user.id!, profile?.id!);

  // Input state.
  // TODO: Replace with react-hook-form.
  const [message, setMessage] = React.useState<string>('');

  // Get typing status and handler.
  const { isTyping, onTyping } = useTyping(
    sender?.user.id!,
    profile?.id!,
    conversationId!,
    message
  );

  // Input submission handler.
  const _handleSend = (message: string) => {
    createMessage(message);
    setMessage('');
  };

  if (loading || conversationLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: Dimensions.get('screen').height,
        backgroundColor: 'white',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header bar */}
        <ChatRoomHeader profile={profile!} isTyping={isTyping} />

        {/* Message content */}
        <ChatRoomScroller messages={messages} profile={profile!} />

        {/* Input bar */}
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingVertical: 16,
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
            onChangeText={(e) => {
              setMessage(e);
              onTyping();
            }}
            onSubmitEditing={() => _handleSend(message)}
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
    </SafeAreaView>
  );
};

export default ChatRoom;
