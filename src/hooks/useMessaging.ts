import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';

export interface MessageProps {
  id: string;
  created_at: string;
  updated_at: string;
  conversation: IdleDeadline;
  sender_id: string;
  recipient_id: string;
  body: string;
  read: boolean;
}

// Custom hook to listen for changes to messages in a conversation
export const useMessaging = (senderId: string, recipientId: string) => {
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  const [conversationId, setConversationId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (senderId && recipientId) {
      // Get initial messages.
      getMessages(senderId, recipientId);

      // Subscribe to message events.
      const channel = supabase
        .channel(`messages:${senderId}/${recipientId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
          },
          (payload: { new: MessageProps }) => {
            // Append the new message to the array.
            setMessages((previousMessages) => [
              ...previousMessages,
              payload.new,
            ]);
          }
        )
        .on(
          //@ts-ignore
          'postgres_changes',
          {
            event: 'DELETE',
            schema: 'public',
            table: 'messages',
          },
          (payload: { old: MessageProps }) => {
            // Filter out the deleted message.
            setMessages((previousMessages) => [
              ...previousMessages.filter(
                (message) => message.id !== payload.old.id
              ),
            ]);
          }
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }
  }, [senderId, recipientId]);

  const getMessages = async (user1Id: string, user2Id: string) => {
    if (user1Id && user2Id) {
      try {
        const { data, error } = await supabase.rpc('chat_get_messages', {
          user1_id: user1Id,
          user2_id: user2Id,
        });

        if (error) {
          throw new Error(`Error getting messages: ${error.message}`);
        }

        setMessages(data);
        setConversationId(data[0].conversation_id);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    }
  };

  const createMessage = async (message: string) => {
    if (senderId && recipientId) {
      try {
        const formattedMessage = message.trim();

        if (!formattedMessage || formattedMessage === '') {
          return;
        }

        const { error } = await supabase.rpc('chat_create_message', {
          sender_id: senderId,
          recipient_id: recipientId,
          body: message,
        });

        if (error) {
          throw new Error(`Error creating message: ${error.message}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    }
  };

  return { conversationId, messages, createMessage };
};
