import { Text } from '@rneui/themed';
import { View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { IconButton } from '../../../components/buttons';
import { DisclosureProps } from '../../../types';

interface ProfilePhotoViewerProps {
  gallery: any[];
  disclosure: DisclosureProps;
}

const ProfilePhotoViewer = (props: ProfilePhotoViewerProps) => {
  const { gallery, disclosure } = props;
  return (
    <ImageView
      images={gallery}
      imageIndex={0}
      visible={disclosure.isOpen}
      onRequestClose={disclosure.onClose}
      FooterComponent={({ imageIndex }) => {
        return (
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 32,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 112,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: 16 }}>
                  {imageIndex + 1} / {gallery.length}
                </Text>
              </View>
            </View>
            <IconButton
              icon={{ type: 'ionicon', name: 'heart' }}
              onPress={() => console.log('like')}
            />
          </View>
        );
      }}
    />
  );
};
export default ProfilePhotoViewer;
