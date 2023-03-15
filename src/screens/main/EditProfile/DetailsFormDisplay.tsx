import React from 'react';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { ProfileContext } from '../../../contexts';

const DetailsFormDisplay = () => {
  const { profile } = React.useContext(ProfileContext);

  return (
    <View style={{ marginTop: 16, gap: 12 }}>
      {profile?.job_title && (
        <IconDetails
          content={profile.job_title}
          icon={{ type: 'ionicon', name: 'construct-outline' }}
        />
      )}
      {profile?.education && (
        <IconDetails
          content={profile.education}
          icon={{ type: 'ionicon', name: 'school-outline' }}
        />
      )}
      {profile?.political_affiliation && (
        <IconDetails
          content={profile.political_affiliation}
          icon={{ type: 'ionicon', name: 'home-outline' }}
        />
      )}
      {(profile?.is_drinker || profile?.is_smoker || profile?.is_stoner) && (
        <IconDetails
          content={`${profile?.is_drinker ? 'Drinker, ' : ''}${
            profile?.is_smoker ? (profile.is_stoner ? 'Smoker, ' : 'Smoker') : ''
          }${profile?.is_stoner ? 'Stoner' : ''}`}
          icon={{ type: 'ionicon', name: 'beer-outline' }}
        />
      )}
    </View>
  );
};
export default DetailsFormDisplay;
