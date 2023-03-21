import { View } from 'react-native';
import { Header } from '../../../components/core';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = () => {
  return (
    <SafeAreaView>
      <Header
        title='About'
        subtitle={`Version: ${Constants.manifest?.version}`}
      />
    </SafeAreaView>
  );
};
export default About;
