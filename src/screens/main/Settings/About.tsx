import { View } from 'react-native';
import { Header } from '../../../components/core';
import Constants from 'expo-constants';

const About = () => {
  return (
    <View>
      <Header
        title='About'
        subtitle={`Version: ${Constants.manifest?.version}`}
      />
    </View>
  );
};
export default About;
