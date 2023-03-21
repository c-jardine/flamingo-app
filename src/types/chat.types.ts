export interface ConversationProps {
  id: string;
  created_at: string;
  user1_id: string;
  user2_id: string;
}
export interface MessageProps {
  id: string;
  created_at: string;
  conversation_id: string;
  sender_id: string;
  text: string;
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
