import { Text } from '@rneui/themed';
import { View } from 'react-native';
import { useLocation } from '../../../hooks';

const Home = () => {
  const { location, error } = useLocation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
};
export default Home;
