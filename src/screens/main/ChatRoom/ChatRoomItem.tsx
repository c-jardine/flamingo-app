import { Text, useTheme } from '@rneui/themed';
import { format, isToday, isYesterday } from 'date-fns';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { MessageProps } from '../../../hooks';
import { ProfileProps } from '../../../types';

const ChatRoomItem = (props: MessageProps & { profile: ProfileProps }) => {
  const { theme } = useTheme();
  const { profile } = props;
  const [date, setDate] = React.useState<string>(props.created_at);
  const [timeShown, setTimeShown] = React.useState<boolean>(false);
  const isSender = props.sender_id === profile?.id;

  React.useEffect(() => {
    const dateObj = new Date(props.created_at);
    if (isToday(dateObj)) {
      setDate(`${format(dateObj, 'hh:mm a')}`);
    } else if (isYesterday(dateObj)) {
      setDate(`Yesterday at ${format(dateObj, 'hh:mm a')}`);
    } else {
      setDate(`${format(dateObj, 'MM/dd/yyyy, hh:mm a')}`);
    }
  }, []);

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
