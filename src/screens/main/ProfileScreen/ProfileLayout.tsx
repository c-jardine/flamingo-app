import { useNavigation } from '@react-navigation/native';
import { Icon, Image } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

interface ProfileLayoutProps {
  children: React.ReactNode;
  backgroundImg: string;
}

const ProfileLayout = (props: ProfileLayoutProps) => {
  const { backgroundImg, children } = props;
  const navigation = useNavigation();
  return (
    <View>
      <StatusBar hidden />
      <View>
        <Image
          source={{
            uri: backgroundImg,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          blurRadius={2}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          minHeight:
            Dimensions.get('screen').height - Dimensions.get('screen').width,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={5}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            locations={[0, 0.75]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: Dimensions.get('screen').height,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: Dimensions.get('screen').height,
              left: 0,
              backgroundColor: 'black',
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{
              marginVertical: 32,
            }}
          >
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 16,
                padding: 8,
                borderRadius: 32,
              }}
            >
              <Icon
                type='material-community'
                name='chevron-left'
                size={32}
                color='rgba(255,255,255,0.75)'
              />
            </TouchableOpacity>
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default ProfileLayout;
