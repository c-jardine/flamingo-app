import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { MessageProps, ProfileProps } from '../../../types';
import { formatDate } from '../../../utils';

const ChatRoomItem = (props: MessageProps & { profile: ProfileProps }) => {
  const { profile } = props;
  const { theme } = useTheme();
  const [timeShown, setTimeShown] = React.useState<boolean>(false);

  const isSender = props.sender_id === profile?.id;
  const date = formatDate(props.created_at);

  return (
    <View
      style={{
        flex: 1,
        alignItems: isSender ? 'flex-start' : 'flex-end',
      }}
    >
      <TouchableOpacity
        onPress={() => setTimeShown(!timeShown)}
        style={{
          backgroundColor: isSender ? 'white' : theme.colors.primary,
          maxWidth: '75%',
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            color: isSender ? 'black' : 'white',
          }}
        >
          {props.body}
        </Text>
      </TouchableOpacity>
      {timeShown && (
        <Animated.Text
          style={{ marginTop: 6, color: 'rgba(0,0,0,0.25)', fontSize: 12 }}
        >
          {date}
        </Animated.Text>
      )}
    </View>
  );
};
export default ChatRoomItem;
