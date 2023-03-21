import React from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../contexts';
import { supabase } from '../supabase';
import { ChatListItemProps, ConversationProps, MessageProps } from '../types';

export const useChats = () => {
  const { session } = React.useContext(AuthContext);
  const [chats, setChats] = React.useState<ChatListItemProps[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getChats = async () => {
    let chats = [];
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_chats', {
        profile_id: session?.user.id!,
      });

      if (error) {
        throw new Error(`Error fetching chats: ${error.message}`);
      }

      chats = data;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }

    return chats;
  };

  React.useEffect(() => {
    const channel = supabase.channel(`messages_channel:${session?.user.id!}`);

    if (session) {
      // Fetch the initial chat list
      (async () => {
        try {
          setLoading(true);
          const data = await getChats();

          setChats(data);

          // Subscribe to the messages channel
          channel
            .on(
              'postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
                table: 'conversations',
              },
              (payload: {new: ConversationProps}) => {
                setChats((prevChats) => [payload.new, ...prevChats]);
              }
            )
            .on(
              'postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
              },
              (payload: { new: MessageProps }) => {
                const updatedChats = [...data];

                // Get the index of the chat being updated.
                const conversationIndex = chats.findIndex(
                  (chat: ChatListItemProps) =>
                    chat.id === payload.new.conversation_id
                );

                // Create a new array of chats and update the message and message time.
                updatedChats[conversationIndex].latest_message =
                  payload.new.text;
                updatedChats[conversationIndex].latest_message_time =
                  payload.new.created_at;

                // Move the updated chat to the beginning of the array.
                const items = updatedChats.splice(conversationIndex, 1);
                updatedChats.splice(0, 0, ...items);

                setChats(updatedChats);
              }
            )
            .subscribe();
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
        } finally {
          setLoading(false);
        }
      })();
    }

    // Unsubscribe from the chat channel when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [session]);

  return { chats, loading };
};
