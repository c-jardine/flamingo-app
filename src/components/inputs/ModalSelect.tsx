import { Dialog, Text, TextProps } from '@rneui/themed';
import React from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { useDisclosure } from '../../hooks';
import { PrimaryButton } from '../buttons';
import { HighlightIcon } from '../icons';

const ModalSelect = React.forwardRef<
  TextProps,
  ControllerRenderProps<FieldValues, string>
>((props, ref) => {
  const { value, onChange } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [icon, setIcon] = React.useState<string>('ellipse-outline');

  const handleSelect = (name: string) => {
    onChange(name);

    switch (name) {
      case 'Male':
        setIcon('male');
        break;
      case 'Female':
        setIcon('female');
        break;
      case 'Non-binary':
        setIcon('transgender');
        break;
      default:
        setIcon('ellipse-outline');
    }

    onClose();
  };
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 8,
          shadowColor: 'black',
          shadowOffset: { height: 4, width: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        onPress={onOpen}
      >
        <HighlightIcon
          backgroundColor='#ede9fe'
          icon={{
            type: 'ionicon',
            name: icon,
            color: '#a78bfa',
          }}
        />
        <Text style={{ color: 'rgba(0,0,0,0.5)' }}>{value}</Text>
      </TouchableOpacity>
      <Dialog
        isVisible={isOpen}
        onBackdropPress={onClose}
        overlayStyle={{ borderRadius: 16, width: 350 }}
      >
        <Dialog.Title title='Gender' />
        <View
          style={{
            marginTop: 8,
          }}
        >
          <PrimaryButton
            variant={props.value === 'Male' ? 'solid' : 'outline'}
            title='Male'
            onPress={() => handleSelect('Male')}
            containerStyle={{ height: 64 }}
          />
          <PrimaryButton
            variant={props.value === 'Female' ? 'solid' : 'outline'}
            title='Female'
            onPress={() => handleSelect('Female')}
            containerStyle={{ height: 64 }}
          />
          <PrimaryButton
            variant={props.value === 'Non-binary' ? 'solid' : 'outline'}
            title='Non-binary'
            onPress={() => handleSelect('Non-binary')}
            containerStyle={{ height: 64 }}
          />
        </View>
      </Dialog>
    </>
  );
});
export default ModalSelect;
