import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';

export type ChatItemProps = {
  id: string;
  other_profile_id: string;
  other_first_name: string;
  other_last_name: string;
  other_avatar_url: string;
  latest_message: string;
  latest_message_time: string;
};

export const useChats = (profileId: string) => {
  const [chats, setChats] = React.useState<ChatItemProps[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const channel = supabase.channel(`conversation:${profileId}`);

    // Fetch the initial chat list
    (async () => {
      try {
        setLoading(true);
        const { data: chats, error } = await supabase.rpc('get_chats', {
          profile_id: profileId,
        });

        if (error) {
          throw new Error('Error fetching chats');
        }

        setChats(chats);

        // Subscribe to conversation channel
        channel
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              // filter: `conversation_id=eq.8b9a564b-143b-4fff-8529-3781e4980dfc`,
            },
            (payload) => {
              // Update the chat list when a new chat is created
              const conversationIndex = chats.findIndex(
                (chat: ChatItemProps) => chat.id === payload.new.conversation_id
              );
              const updatedChats = [...chats];
              updatedChats[conversationIndex].latest_message = payload.new.text;
              updatedChats[conversationIndex].latest_message_time =
                payload.new.created_at;
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

    // Unsubscribe from the chat channel when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [profileId]);

  return { chats, loading };
};
