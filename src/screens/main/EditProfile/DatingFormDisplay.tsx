import React from 'react';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { AuthContext } from '../../../contexts';

const DatingFormDisplay = () => {
  const { profile } = React.useContext(AuthContext);

  return (
    <View style={{ marginTop: 16, gap: 12 }}>
      {profile?.relationship_type && (
        <IconDetails
          content={profile.relationship_type}
          icon={{ type: 'material-community', name: 'thumb-up-outline' }}
        />
      )}
    </View>
  );
};
export default DatingFormDisplay;
