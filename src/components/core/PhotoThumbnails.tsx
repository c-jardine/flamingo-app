import { useNavigation } from '@react-navigation/native';
import { Icon, useTheme } from '@rneui/themed';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { usePhotoAlbum } from '../../hooks';
import Header from './Header';
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
      <Header
        title='Photo management'
        subtitle={`${photos.length} ${
          photos.length === 1 ? 'photo' : 'photos'
        }`}
      />

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
