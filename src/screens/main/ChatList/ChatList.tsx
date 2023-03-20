import { useTheme } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Header } from '../../../components/core';
import { useChats } from '../../../hooks';
import { ChatListItemProps } from '../../../types';
import ChatDisplay from './ChatItem';

const ChatList = () => {
  const { theme } = useTheme();
  const { loading, chats } = useChats();

  return (
    <View style={{ flex: 1 }}>
      <Header noNav title='Messages' subtitle='No new messages' />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: ChatListItemProps }) => (
            <ChatDisplay {...item} />
          )}
        />
      )}
    </View>
  );
};

export default ChatList;
