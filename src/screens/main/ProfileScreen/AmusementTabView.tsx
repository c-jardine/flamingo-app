import { View } from 'react-native';
import { TextSection } from '../../../components/core';
import { ProfileProps } from '../../../types';

interface AmusementTabViewProps {
  profile: ProfileProps;
}

const AmusementTabView = (props: AmusementTabViewProps) => {
  const { profile } = props;

  return (
    <View style={{ marginTop: 32, gap: 32, paddingHorizontal: 16 }}>
      <View style={{ gap: 32 }}>
        {profile.interests && (
          <TextSection header='Interests' content={profile.interests} />
        )}

        {profile.hobbies && (
          <TextSection header='Hobbies' content={profile.hobbies} />
        )}

        {profile.books && (
          <TextSection header='Books' content={profile.books} />
        )}

        {profile.movies && (
          <TextSection header='Movies' content={profile.movies} />
        )}

        {profile.music && (
          <TextSection header='Music' content={profile.music} />
        )}

        {profile.tv_shows && (
          <TextSection header='TV Shows' content={profile.tv_shows} />
        )}
      </View>
    </View>
  );
};
export default AmusementTabView;
