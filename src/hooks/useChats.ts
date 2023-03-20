import React from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../contexts';
import { supabase } from '../supabase';
import { ChatListItemProps, MessageProps } from '../types';

export const useChats = () => {
  const { session } = React.useContext(AuthContext);
  const [chats, setChats] = React.useState<ChatListItemProps[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const channel = supabase.channel(`messages_channel:${session?.user.id!}`);

    // Fetch the initial chat list
    if (session) {
      getChats();

      // Subscribe to the messages channel
      channel
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
          },
          (payload: { new: MessageProps }) => {
            // Update the chat list when a new chat is created
            const conversationIndex = chats.findIndex(
              (chat: ChatListItemProps) =>
                chat.id === payload.new.conversation_id
            );
            const updatedChats = [...chats];
            updatedChats[conversationIndex].latest_message = payload.new.text;
            updatedChats[conversationIndex].latest_message_time =
              payload.new.created_at;
            setChats(updatedChats);
          }
        )
        .subscribe();
    }

    // Unsubscribe from the chat channel when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [session]);

  const getChats = async () => {
    try {
      setLoading(true);
      const { data: chats, error } = await supabase.rpc('get_chats', {
        profile_id: session?.user.id!,
      });

      if (error) {
        throw new Error(`Error fetching chats: ${error.message}`);
      }

      setChats(chats);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { chats, loading };
};
