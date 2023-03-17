import { Image, Text, useTheme } from '@rneui/themed';
import { differenceInYears } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { useDownloadPhoto } from '../../../hooks';
import { ProfileProps } from '../../../types';
import { Poppins } from '../../../utils';

const METERS_TO_FEET = 3.281;
const FEET_IN_MILES = 5280;

interface PhotoThumbnailProps {
  path: string;
  profile: ProfileProps;
}

const PhotoThumbnail = (props: PhotoThumbnailProps) => {
  const { theme } = useTheme();
  const { loading, photoUri } = useDownloadPhoto(props.path);

  const formatDistance = (distance: number) => {
    const dist = distance * METERS_TO_FEET;
    if (dist < 20) {
      return 'a few feet away';
    } else if (dist < 50) {
      return '< 50 feet away';
    } else if (dist < 100) {
      return '< 100 feet away';
    } else if (dist < 500) {
      return '< 500 feet away';
    } else if (dist < 1000) {
      return '< 1000 feet away';
    } else if (dist < 5280) {
      return '< 1 mile away';
    } else {
      const miles = dist / FEET_IN_MILES;
      return `${Intl.NumberFormat().format(Math.round(miles))} ${
        miles === 1 ? 'mile' : 'miles'
      } away`;
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {loading || !photoUri ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.05)',
          }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            source={{ uri: photoUri }}
            style={{ width: '100%', height: '100%' }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: 8,
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
          >
            <Text
              style={{
                fontFamily: Poppins.MEDIUM,
                fontSize: 18,
                color: 'white',
              }}
            >
              {props.profile.first_name},{' '}
              {differenceInYears(
                new Date(),
                new Date(props.profile?.birthday!)
              )}
            </Text>
            <Text
              style={{
                fontFamily: Poppins.REGULAR,
                fontSize: 14,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {formatDistance(props.profile.distance!)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default PhotoThumbnail;
