import { format, formatDistanceStrict } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { ProfileContext } from '../../../contexts';

const ProfileFormDisplay = () => {
  const { profile } = React.useContext(ProfileContext);
  const [genderIcon, setGenderIcon] = React.useState<string>('circle-outline');

  React.useEffect(() => {
    if (profile) {
      switch (profile.gender) {
        case 'Male':
          setGenderIcon('gender-male');
          break;
        case 'Female':
          setGenderIcon('gender-female');
          break;
        case 'Transgender':
          setGenderIcon('gender-transgender');
          break;
        case 'Non-binary':
          setGenderIcon('gender-non-binary');
          break;
        default:
          setGenderIcon('circle-outline');
          break;
      }
    }
  }, [profile]);

  return (
    <View style={{ marginTop: 16, gap: 12 }}>
      <IconDetails
        content={`${profile?.first_name} ${profile?.last_name}`}
        icon={{ type: 'material-community', name: 'account-outline' }}
      />
      <IconDetails
        content={`${format(
          new Date(profile?.birthday!),
          'MMMM dd, yyyy'
        )} (${formatDistanceStrict(new Date(profile?.birthday!), new Date())})`}
        icon={{ type: 'material-community', name: 'cake-variant-outline' }}
      />
      <IconDetails
        content={profile?.gender!}
        icon={{ type: 'material-community', name: genderIcon }}
      />
      <IconDetails
        content={profile?.bio!}
        icon={{
          type: 'material-community',
          name: 'card-account-details-outline',
        }}
      />
      <IconDetails
        content={profile?.website!}
        icon={{
          type: 'material-community',
          name: 'web',
        }}
      />
    </View>
  );
};
export default ProfileFormDisplay;
