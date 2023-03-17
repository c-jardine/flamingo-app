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
      </View>
    </View>
  );
};
export default AmusementTabView;
