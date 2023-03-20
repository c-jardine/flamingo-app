import { Skeleton } from '@rneui/themed';
import { View } from 'react-native';

const ChatItemSkeleton = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Skeleton
        style={{
          aspectRatio: 1,
          width: 60,
          borderRadius: 30,
          overflow: 'hidden',
        }}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Skeleton style={{ height: 18, width: '75%' }} />
        <Skeleton style={{ height: 16 }} />
        <Skeleton
          style={{
            height: 12,
            width: '40%',
            alignSelf: 'flex-end',
          }}
        />
      </View>
    </View>
  );
};
export default ChatItemSkeleton;
