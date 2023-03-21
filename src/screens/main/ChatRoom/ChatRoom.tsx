import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, useTheme } from '@rneui/themed';
import React from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../../../components/buttons';
import { Header } from '../../../components/core';
import { SplashScreen } from '../../../components/utils';
import { AuthContext } from '../../../contexts';
import {
  MessageProps,
  useDownloadPhoto,
  useMessaging,
  useProfile,
  useScrollPos,
  useTyping,
} from '../../../hooks';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import ChatRoomItem from './ChatRoomItem';

type ChatRoomProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>;

const ChatRoom = (props: ChatRoomProps) => {
  const { theme } = useTheme();
  const { session } = React.useContext(AuthContext);
  const { loading, profile } = useProfile(props.route.params.receiverId!);
  const { loading: downloading, photoUri } = useDownloadPhoto(
    profile?.avatar_url!
  );
  const { conversationId, messages, createMessage } = useMessaging(
    session?.user.id!,
    profile?.id!
  );

  const [message, setMessage] = React.useState<string>('');
  const { isTyping, onTyping } = useTyping(
    session?.user.id!,
    profile?.id!,
    conversationId!,
    message
  );

  const flatListRef = React.useRef<FlatList>(null);
  const { scrollToBottom, handleScroll } = useScrollPos(flatListRef);

  const _handleSend = (message: string) => {
    createMessage(message);
    setMessage('');
  };

  if (loading || downloading) {
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
        <View>
          <Header
            title={profile?.first_name!}
            subtitle={isTyping ? 'Typing...' : 'Offline'}
          />
          {photoUri && (
            <View
              style={{
                position: 'absolute',
                height: '100%',
                justifyContent: 'center',
                right: 16,
              }}
            >
              <Image
                source={{ uri: photoUri }}
                style={{ aspectRatio: 1, width: 50, borderRadius: 25 }}
              />
            </View>
          )}
        </View>
        {messages.length > 0 && (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item: MessageProps) => item.message_id}
            renderItem={({ item }: { item: MessageProps }) => (
              <ChatRoomItem {...item} profile={profile!} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            contentContainerStyle={{ padding: 16 }}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            onScroll={handleScroll}
          />
        )}
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
