import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text } from '@rneui/themed';
import { format } from 'date-fns';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../contexts';
import { MainStackParamList } from '../../../navigators/MainNavigator';
import { ChatListItemProps } from '../../../types';
import { Poppins, formatDate } from '../../../utils';

interface ChatItemContentProps extends ChatListItemProps {
  photoUri: string;
}

const ChatItemContent = (props: ChatItemContentProps) => {
  const { session } = React.useContext(AuthContext);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainStackParamList, 'ChatRoom'>>();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        padding: 16,
      }}
      onPress={() =>
        navigate('ChatRoom', {
          senderId: session?.user.id!,
          receiverId: props.other_user_id!,
        })
      }
    >
      <View
        style={{
          aspectRatio: 1,
          width: 60,
          borderRadius: 30,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: props.photoUri }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: Poppins.SEMIBOLD, fontSize: 18 }}>
          {props.other_user_first_name} {props.other_user_last_name}
        </Text>
        <Text style={{ fontFamily: Poppins.REGULAR, color: 'rgba(0,0,0,0.5)' }}>
          {props.last_message}
        </Text>
        {props.last_message_date && (
          <Text
            style={{
              fontFamily: Poppins.REGULAR,
              fontSize: 12,
              color: 'rgba(0,0,0,0.35)',
              alignSelf: 'flex-end',
            }}
          >
            {formatDate(props.last_message_date)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ChatItemContent;
