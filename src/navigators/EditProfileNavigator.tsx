import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfile } from '../screens/main/EditProfile';
import AmusementForm from '../screens/main/EditProfile/AmusementForm';
import DetailsForm from '../screens/main/EditProfile/DetailsForm';
import ProfileForm from '../screens/main/EditProfile/ProfileForm';

export type EditProfileParamList = {
  EditProfile: undefined;
  ProfileForm: undefined;
  DetailsForm: undefined;
  AmusementForm: undefined;
};

const Stack = createNativeStackNavigator<EditProfileParamList>();

const EditProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='ProfileForm' component={ProfileForm} />
      <Stack.Screen name='DetailsForm' component={DetailsForm} />
      <Stack.Screen name='AmusementForm' component={AmusementForm} />
    </Stack.Navigator>
  );
};
export default EditProfileNavigator;
