import React from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../contexts';
import { supabase } from '../supabase';
import { ChatListItemProps } from '../types';

export const useConversations = (page: number) => {
  const { session } = React.useContext(AuthContext);
  const [conversations, setConversations] = React.useState<
    ChatListItemProps[] | null
  >(null);

  React.useEffect(() => {
    if (session?.user.id) {
      getConversations();
    }

    const channel = supabase
      .channel(`conversation-${session?.user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
        },
        async (payload) => {
          try {
            const { data, error } = await supabase
              .from('messages')
              .select()
              .eq('id', payload.new.last_message_id)
              .single();

            if (error) {
              throw new Error(
                `Error getting new message (conversation subscriber: ${error.message}`
              );
            }

            updateConversations(payload.old.id, data.body, data.created_at);
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert(error.message);
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [session]);

  /**
   * Moves the element matching conversationId to the beginning of the
   * conversations state array and also updates the last message and last
   * message date. This is used in conjunction with the realtime conversations
   * subscriber.
   * @param conversationId The conversation id to be updated.
   * @param lastMessage The new message.
   * @param lastMessageDate The new message date.
   * @returns
   */
  const updateConversations = (
    conversationId: string,
    lastMessage: string,
    lastMessageDate: string
  ) => {
    if (conversations) {
      const conversationIndex = conversations?.findIndex(
        (conversation) => conversation.conversation_id === conversationId
      );

      if (conversationIndex === -1) {
        return;
      }

      const updatedConversation = {
        ...conversations[conversationIndex],
        last_message: lastMessage,
        last_message_date: lastMessageDate,
      };

      const updatedConversations = [
        updatedConversation,
        ...conversations.slice(0, conversationIndex),
        ...conversations.slice(conversationIndex + 1),
      ];

      setConversations(updatedConversations);
    }
  };

  const getConversations = async () => {
    try {
      const { data, error } = await supabase.rpc('chat_get_conversations', {
        user_id: session!.user.id,
        page_num: page,
      });

      if (error) {
        throw new Error(`Error getting conversations: ${error.message}`);
      }

      setConversations(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  return { conversations };
};
