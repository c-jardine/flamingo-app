import { Text } from '@rneui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '../../../components/core';
import { ChatItemProps, useChats, useSession } from '../../../hooks';
import ChatDisplay from './ChatDisplay';

const Chat = () => {
  const { session } = useSession();
  const { loading, chats } = useChats('87921096-97e5-4076-bfd2-ef39302cbfbe');

  if (loading || !chats) {
    return <Text>LOADING...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header noNav title='Messages' subtitle='No new messages' />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ChatItemProps }) => (
          <ChatDisplay {...item} />
        )}
      />
    </View>
  );
};

export default Chat;
