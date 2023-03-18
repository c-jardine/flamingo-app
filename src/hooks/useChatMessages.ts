import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase';
export const useChatMessages = (senderId: string, receiverId: string) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log('SENDER', senderId);
    console.log('RECEIVER', receiverId);
    senderId &&
      receiverId &&
      (async () => {
        try {
          const { data, error } = await supabase.rpc('get_messages', {
            sender_id: senderId,
            receiver_id: receiverId,
          });

          if (error) {
            console.log(error);
            throw new Error('Error retrieving messages');
          }

          console.log(data);
          setMessages(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
            Alert.alert(error.message);
          }
        }
      })();
  }, [senderId, receiverId]);

  return { loading, error, messages };
};
