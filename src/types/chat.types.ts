export interface ConversationProps {
  id: string;
  created_at: string;
  user1_id: string;
  user2_id: string;
}
export interface MessageProps {
  id: string;
  created_at: string;
  updated_at: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  read: boolean;
}

export type ChatListItemProps = {
  conversation_id: string;
  other_user_id: string;
  other_user_first_name: string;
  other_user_last_name: string;
  other_user_avatar_url: string;
  last_message: string;
  last_message_date: string;
};
