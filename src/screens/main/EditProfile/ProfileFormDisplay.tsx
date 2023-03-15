import { format } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { ProfileContext } from '../../../contexts';

const ProfileFormDisplay = () => {
  const { profile } = React.useContext(ProfileContext);

  return (
    <View style={{ marginTop: 16, gap: 12 }}>
      <IconDetails
        content={`${profile?.first_name} ${profile?.last_name}`}
        icon={{ type: 'ionicon', name: 'person-outline' }}
      />
      <IconDetails
        content={format(new Date(profile?.birthday!), 'MMMM dd, yyyy')}
        icon={{ type: 'ionicon', name: 'calendar-outline' }}
      />
      <IconDetails
        content={profile?.gender!}
        icon={{ type: 'ionicon', name: 'ellipse-outline' }}
      />
    </View>
  );
};
export default ProfileFormDisplay;
