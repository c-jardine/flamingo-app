import { Text, useTheme } from '@rneui/themed';
import { format } from 'date-fns';
import { View } from 'react-native';
import { IconDetails } from '../../../components/core';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';

interface PersonalTabViewProps {
  profile: ProfileProps;
}

const PersonalTabView = (props: PersonalTabViewProps) => {
  const { profile } = props;
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: 32, gap: 32, paddingHorizontal: 16 }}>
      <View style={{ gap: 8 }}>
        {profile.job_title && (
          <IconDetails
            light
            icon={{
              type: 'material-community',
              name: 'briefcase-outline',
            }}
            content={profile.job_title}
          />
        )}
        {profile.education && (
          <IconDetails
            light
            icon={{ type: 'material-community', name: 'school-outline' }}
            content={profile.education}
          />
        )}
        {profile.birthday && (
          <IconDetails
            light
            icon={{
              type: 'material-community',
              name: 'cake-variant-outline',
            }}
            content={format(new Date(profile.birthday), 'MMMM dd')}
          />
        )}
        {profile.website && (
          <IconDetails
            light
            icon={{
              type: 'material-community',
              name: 'web',
            }}
            content={profile.website}
          />
        )}
      </View>

      {profile.tagline && (
        <View
          style={{
            backgroundColor: `${theme.colors.primary}22`,
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: `${theme.colors.primary}22`,
          }}
        >
          <Text
            style={{
              fontFamily: Poppins.REGULAR,
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
              flex: 1,
            }}
          >
            {profile.tagline}
          </Text>
        </View>
      )}

      {profile.bio && (
        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: Poppins.REGULAR,
          }}
        >
          {profile.bio}
        </Text>
      )}
    </View>
  );
};
export default PersonalTabView;
