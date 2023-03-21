import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';

export const useTyping = (
  userId: string,
  otherUserId: string,
  conversationId: string,
  message: string
) => {
  const [isTyping, setIsTyping] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (userId && conversationId) {
      const timeoutId = setTimeout(async () => {
        try {
          const { error } = await supabase.from('user_conversations').upsert({
            user_id: userId,
            conversation_id: conversationId,
            typing: false,
          });

          if (error) {
            throw new Error(`Error stopping typing status: ${error.message}`);
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
        }
      }, 3000);

      const channel = supabase
        .channel(`typing-channel:${conversationId}/${userId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'user_conversations',
            filter: `user_id=eq.${otherUserId}`,
          },
          (payload) => setIsTyping(payload.new.typing)
        )
        .subscribe();

      return () => {
        clearTimeout(timeoutId);
        channel.unsubscribe();
      };
    }
  }, [userId, conversationId, message]);

  const onTyping = async () => {
    try {
      const { error } = await supabase.from('user_conversations').upsert({
        user_id: userId,
        conversation_id: conversationId,
        typing: true,
      });

      if (error) {
        throw new Error(`Error starting typing status: ${error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  return { isTyping, onTyping };
};
