import { Image } from '@rneui/themed';
import React from 'react';
import { Animated, View } from 'react-native';

const SplashScreen = () => {
  const anim = React.useRef(new Animated.Value(1));

  React.useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.25,
          duration: 2000,
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          transform: [{ scale: anim.current }],
        }}
      >
        <Image
          source={{ uri: 'https://i.imgur.com/Sfn2JIY.png' }}
          containerStyle={{
            aspectRatio: 1,
            width: '100%',
            height: 125,
          }}
        />
      </Animated.View>
    </View>
  );
};
export default SplashScreen;
