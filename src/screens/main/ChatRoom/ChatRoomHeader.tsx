import { Image } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { Header } from '../../../components/core';
import { useDownloadPhoto } from '../../../hooks';
import { ProfileProps } from '../../../types';

const ChatRoomHeader = (props: {
  profile: ProfileProps;
  isTyping: boolean;
}) => {
  const { profile, isTyping } = props;

  // Download the user's avatar.
  const { photoUri } = useDownloadPhoto(profile?.avatar_url!);

  return (
    <View>
      <Header
        title={profile?.first_name!}
        subtitle={isTyping ? 'Typing...' : 'Offline'}
      />
      {photoUri && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            justifyContent: 'center',
            right: 16,
          }}
        >
          <Image
            source={{ uri: photoUri }}
            style={{ aspectRatio: 1, width: 50, borderRadius: 25 }}
          />
        </View>
      )}
    </View>
  );
};

export default ChatRoomHeader;
