import React from 'react';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { AuthContext } from '../../../contexts';

const AmusementFormDisplay = () => {
  const { profile } = React.useContext(AuthContext);

  return (
    <View style={{ marginTop: 16, gap: 12 }}>
      {profile?.interests && (
        <IconDetails
          content={profile.interests}
          icon={{ type: 'material-community', name: 'thumb-up-outline' }}
        />
      )}
      {profile?.hobbies && (
        <IconDetails
          content={profile.hobbies}
          icon={{ type: 'material-community', name: 'run' }}
        />
      )}
      {profile?.books && (
        <IconDetails
          content={profile.books}
          icon={{
            type: 'material-community',
            name: 'book-open-page-variant-outline',
          }}
        />
      )}
      {profile?.movies && (
        <IconDetails
          content={profile.movies}
          icon={{ type: 'material-community', name: 'movie-outline' }}
        />
      )}
      {profile?.music && (
        <IconDetails
          content={profile.music}
          icon={{ type: 'material-community', name: 'music' }}
        />
      )}
      {profile?.tv_shows && (
        <IconDetails
          content={profile.tv_shows}
          icon={{
            type: 'material-community',
            name: 'television-classic',
          }}
        />
      )}
    </View>
  );
};
export default AmusementFormDisplay;
