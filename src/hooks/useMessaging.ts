import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
import { MessageProps } from '../types';

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
        // Update messages array when new messages are inserted into the
        // database.
        // TODO: Make sure this doesn't trigger unless the message is received
        // TODO: in the relevant conversation.
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
          // Update the messages array when new messages are deleted from the
          // database.
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
                (message) => message.message_id !== payload.old.message_id
              ),
            ]);
          }
        )
        .subscribe();

      // Cleanup.
      return () => {
        channel.unsubscribe();
      };
    }
  }, [senderId, recipientId]);

  // Get all messages between two users.
  // TODO: This should eventually be paginated.
  const getMessages = async (user1Id: string, user2Id: string) => {
    if (user1Id && user2Id) {
      try {
        // Get the messages from the database.
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

  // Create a new message.
  const createMessage = async (message: string) => {
    if (senderId && recipientId) {
      try {
        // Trim empty spaces.
        const formattedMessage = message.trim();

        // The message shouldn't be empty.
        if (!formattedMessage || formattedMessage === '') {
          return;
        }

        // Create the message in the database.
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
