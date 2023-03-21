import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, Text, useTheme } from '@rneui/themed';
import { format, isToday } from 'date-fns';
import React from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

  const [isNearBottom, setIsNearBottom] = React.useState<boolean>(true);

  const [inputFocused, setInputFocused] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const flatListRef = React.useRef<FlatList>(null);

  const _handleFocus = () => {
    setInputFocused(!inputFocused);
  };

  const _handleSend = (message: string) => {
    createMessage(message);
    setMessage('');
  };

  const _handleScrollToBottom = () => {
    messages.length &&
      isNearBottom &&
      flatListRef.current?.scrollToEnd({ animated: false });
  };

  const _handleScrollPos = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    messages.length &&
      setIsNearBottom(
        e.nativeEvent.layoutMeasurement.height +
          e.nativeEvent.contentOffset.y >=
          e.nativeEvent.contentSize.height - 20
      );
  };

  if (loading || downloading) {
    return <SplashScreen />;
  }

  const MessageBubble = (props: MessageProps) => {
    return (
      <View
        style={{
          alignItems:
            props.sender_id === profile?.id ? 'flex-start' : 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor:
              props.sender_id === profile?.id ? 'white' : theme.colors.primary,
            maxWidth: '75%',
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: props.sender_id === profile?.id ? 'black' : 'white',
            }}
          >
            {props.body}
          </Text>
        </View>
        <Text style={{ marginTop: 6, color: 'rgba(0,0,0,0.25)', fontSize: 12 }}>
          {isToday(new Date(props.created_at))
            ? `${format(new Date(props.created_at), 'hh:mm a')}`
            : `${format(new Date(props.created_at), 'MM/dd/yyyy | hh:mm a')}`}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        height: Dimensions.get('screen').height,
        backgroundColor: 'white',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && { flex: 1 }}
      >
        <View style={{ marginTop: -64 }}>
          <Header title={profile?.first_name!} subtitle='Not online' />
          {photoUri && (
            <View style={{ position: 'absolute', top: 64, right: 16 }}>
              <Image
                source={{ uri: photoUri }}
                style={{ aspectRatio: 1, width: 50, borderRadius: 25 }}
              />
            </View>
          )}
        </View>
        {messages && (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item: MessageProps) => item.id}
            renderItem={({ item }: { item: MessageProps }) => (
              <MessageBubble {...item} />
            )}
            style={{ backgroundColor: 'rgba(0,0,0,0.035)' }}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            onContentSizeChange={_handleScrollToBottom}
            onLayout={_handleScrollToBottom}
            onScroll={_handleScrollPos}
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
    </SafeAreaView>
  );
};

export default ChatRoom;
