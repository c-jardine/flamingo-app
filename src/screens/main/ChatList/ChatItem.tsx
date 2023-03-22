import { useDownloadPhoto } from '../../../hooks';
import { ChatListItemProps } from '../../../types';
import ChatItemContent from './ChatItemContent';
import ChatItemSkeleton from './ChatItemSkeleton';

const ChatItem = (props: ChatListItemProps) => {
  const { loading, photoUri } = useDownloadPhoto(props.other_user_avatar_url);

  if (loading || !photoUri) {
    return <ChatItemSkeleton />;
  }

  return <ChatItemContent {...props} photoUri={photoUri} />;
};
export default ChatItem;
