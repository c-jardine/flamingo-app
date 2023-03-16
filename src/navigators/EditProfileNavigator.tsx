import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfile } from '../screens/main/EditProfile';
import DetailsForm from '../screens/main/EditProfile/DetailsForm';
import InterestsForm from '../screens/main/EditProfile/InterestsForm';
import ProfileForm from '../screens/main/EditProfile/ProfileForm';

export type EditProfileParamList = {
  EditProfile: undefined;
  ProfileForm: undefined;
  DetailsForm: undefined;
  InterestsForm: undefined;
};

const Stack = createNativeStackNavigator<EditProfileParamList>();

const EditProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='ProfileForm' component={ProfileForm} />
      <Stack.Screen name='DetailsForm' component={DetailsForm} />
      <Stack.Screen name='InterestsForm' component={InterestsForm} />
    </Stack.Navigator>
  );
};
export default EditProfileNavigator;