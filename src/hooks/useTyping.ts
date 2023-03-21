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
      // Start timeout when user stops typing.
      const timeoutId = setTimeout(async () => {
        try {
          // If the user stopped typing for the duration of the timeout, their
          // typing status in the database will be set as false.
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

      // Subscribe to the typing channel.
      const channel = supabase
        .channel(`typing-channel:${conversationId}/${userId}`)
        // When the database typing status changes, update the state here.
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

      // Cleanup.
      return () => {
        clearTimeout(timeoutId);
        channel.unsubscribe();
      };
    }
  }, [userId, conversationId, message]);

  // Sets the typing status for the typing user to true.
  const onTyping = async () => {
    try {
      // Update the typing status in the database.
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
