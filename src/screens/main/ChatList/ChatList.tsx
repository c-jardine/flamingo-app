import { useTheme } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../../components/core';
import { useConversations } from '../../../hooks';
import { ChatListItemProps } from '../../../types';
import ChatItem from './ChatItem';

const ChatList = () => {
  const { theme } = useTheme();
  const { conversations } = useConversations(1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header noNav title='Messages' subtitle='No new messages' />
      {!conversations ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.conversation_id}
          renderItem={({ item }: { item: ChatListItemProps }) => (
            <ChatItem {...item} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatList;
