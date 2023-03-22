import React from 'react';
import { FlatList, View } from 'react-native';
import { useScrollPos } from '../../../hooks';
import { MessageProps, ProfileProps } from '../../../types';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomScroller = (props: {
  messages: MessageProps[];
  profile: ProfileProps;
}) => {
  const { messages, profile } = props;

  // Handle scroll position. This enables automatic scrolling to the bottom of
  // the chat, while also prevent automatic scrolling while the user is
  // scrolling up through the messages.
  const flatListRef = React.useRef<FlatList>(null);
  const { scrollToBottom, handleScroll } = useScrollPos(flatListRef);

  return (
    <View style={{flex: 1}}>
      {messages.length > 0 && (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item: MessageProps) => item.id}
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
    </View>
  );
};

export default ChatRoomScroller;
