export interface ConversationProps {
  id: string;
  created_at: string;
  user1_id: string;
  user2_id: string;
}
export interface MessageProps {
  message_id: string;
  conversation_id: string;
  created_at: string;
  updated_at: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  read: boolean;
}

export type ChatListItemProps = {
  id: string;
  other_profile_id: string;
  other_first_name: string;
  other_last_name: string;
  other_avatar_url: string;
  latest_message: string;
  latest_message_time: string;
};
