import React from 'react';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { AuthContext } from '../../../contexts';

const DetailsFormDisplay = () => {
  const { profile } = React.useContext(AuthContext);

  return (
    <View style={{ marginTop: 16, gap: 12 }}>
      {profile?.job_title && (
        <IconDetails
          content={profile.job_title}
          icon={{ type: 'material-community', name: 'briefcase-outline' }}
        />
      )}
      {profile?.education && (
        <IconDetails
          content={profile.education}
          icon={{ type: 'material-community', name: 'school-outline' }}
        />
      )}
      {profile?.political_affiliation && (
        <IconDetails
          content={profile.political_affiliation}
          icon={{ type: 'material-community', name: 'scale-balance' }}
        />
      )}
      {profile?.religion && (
        <IconDetails
          content={profile.religion}
          icon={{ type: 'material-community', name: 'hands-pray' }}
        />
      )}
      {profile?.personality_type && (
        <IconDetails
          content={profile.personality_type}
          icon={{
            type: 'material-community',
            name: 'head-dots-horizontal-outline',
          }}
        />
      )}
      {profile?.is_drinker && (
        <IconDetails
          content='Drinker'
          icon={{ type: 'material-community', name: 'liquor' }}
        />
      )}
      {profile?.is_smoker && (
        <IconDetails
          content='Smoker'
          icon={{ type: 'material-community', name: 'smoking' }}
        />
      )}
      {profile?.is_stoner && (
        <IconDetails
          content='Stoner'
          icon={{ type: 'material-community', name: 'cannabis' }}
        />
      )}
    </View>
  );
};
export default DetailsFormDisplay;
