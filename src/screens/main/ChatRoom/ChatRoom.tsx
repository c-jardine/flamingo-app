import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { supabase } from '../../../supabase';

type ChatRoomProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>;

const ChatRoom = (props: ChatRoomProps) => {
  const { senderId, receiverId } = props.route.params;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const conversationId = `${senderId}-${receiverId}`;

  useEffect(() => {
    setLoading(true);
    // Subscribe to new messages in the conversation
    const chatChannel = supabase.channel(`chat:${conversationId}`);
    chatChannel.subscribe((payload) => {
      console.log('BANANA', payload);
      setMessages((prevState) => [...prevState, payload.new]);
    });

    // Load existing messages in the conversation
    (async () => {
      try {
        const { data: messages, error } = await supabase.rpc('get_messages', {
          sender_id: senderId,
          receiver_id: receiverId,
        });
        if (error) {
          throw new Error('Error loading messages');
        }
        setMessages(messages);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      // Unsubscribe from the channel when component unmounts
      chatChannel.unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    if (newMessage === '') return;
    const { data, error } = await supabase.from('messages').insert([
      {
        conversation_id: conversationId,
        user_id: senderId,
        message: newMessage,
      },
    ]);
    if (error) console.log('Error sending message:', error);
    else setNewMessage('');
    setLoading(false);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {messages && messages.map((m) => <Text>{m.user_id}</Text>)}
      {/* {
        messages && messages.map((msg) => <Text>{msg.message}</Text>)
        <FlatList
          data={messages}
          keyExtractor={(item) => item.message_id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.message}</Text>
            </View>
          )}
        />
      } */}
      <View>
        <TextInput
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title='Send' onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatRoom;
