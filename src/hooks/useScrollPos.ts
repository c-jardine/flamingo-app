import React, { RefObject } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

export const useScrollPos = (ref: RefObject<FlatList | ScrollView>) => {
  const [isNearBottom, setIsNearBottom] = React.useState<boolean>(true);

  const scrollToBottom = () => {
    isNearBottom && ref.current?.scrollToEnd({ animated: false });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsNearBottom(
      e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentOffset.y >=
        e.nativeEvent.contentSize.height - 20
    );
  };

  return { scrollToBottom, handleScroll };
};
