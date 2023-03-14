import { useNavigation } from '@react-navigation/native';
import { Icon, Text, useTheme } from '@rneui/themed';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { usePhotoAlbum } from '../../hooks';
import { Poppins } from '../../utils';
import PhotoThumbnail from './PhotoThumbnail/PhotoThumbnail';

interface PhotoThumbnailsProps {
  folderName: string;
}

const PhotoThumbnails = (props: PhotoThumbnailsProps) => {
  const { theme } = useTheme();
  const { photos } = usePhotoAlbum(props.folderName);
  const { goBack } = useNavigation();

  return (
    <>
      <View
        style={{
          paddingTop: 64,
          paddingBottom: 16,
          overflow: 'hidden',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <TouchableOpacity
          onPress={goBack}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 55,
            left: 16,
            padding: 8,
            borderRadius: 32,
          }}
        >
          <Icon type='ionicon' name='chevron-back-outline' />
        </TouchableOpacity>
        <Text
          style={{
            marginBottom: 0,
            fontFamily: Poppins.SEMIBOLD,
            fontSize: 18,
            paddingHorizontal: 16,
            textAlign: 'center',
          }}
        >
          Photo management
        </Text>
        <Text
          style={{
            fontFamily: Poppins.REGULAR,
            fontSize: 14,
            textAlign: 'center',
            color: theme.colors.primary,
          }}
        >
          {photos.length} photos
        </Text>
      </View>

      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 16 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {photos.map((photo, index) => (
              <View key={index} style={{ width: '33.3333%', padding: 2 }}>
                <PhotoThumbnail path={`${props.folderName}/${photo.name}`} />
              </View>
            ))}
            <View
              style={{
                padding: 2,
                aspectRatio: 1,
                width: '33.3333%',
              }}
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: theme.colors.primary,
                }}
              >
                <View
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    backgroundColor: theme.colors.white,
                  }}
                >
                  <Icon
                    type='ionicon'
                    name='camera'
                    color={theme.colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default PhotoThumbnails;
