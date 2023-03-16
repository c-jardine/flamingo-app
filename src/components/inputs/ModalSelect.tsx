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

  const [icon, setIcon] = React.useState<string>('circle-outline');

  const handleSelect = (name: string) => {
    onChange(name);

    switch (name) {
      case 'Male':
        setIcon('gender-male');
        break;
      case 'Female':
        setIcon('gender-female');
        break;
      case 'Transgender':
        setIcon('gender-transgender');
        break;
      case 'Non-binary':
        setIcon('gender-non-binary');
        break;
      default:
        setIcon('circle-outline');
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
            type: 'material-community',
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
            gap: 8,
          }}
        >
          <PrimaryButton
            variant={value === 'Male' ? 'solid' : 'outline'}
            title='Male'
            onPress={() => handleSelect('Male')}
          />
          <PrimaryButton
            variant={value === 'Female' ? 'solid' : 'outline'}
            title='Female'
            onPress={() => handleSelect('Female')}
          />
          <PrimaryButton
            variant={value === 'Transgender' ? 'solid' : 'outline'}
            title='Transgender'
            onPress={() => handleSelect('Transgender')}
          />
          <PrimaryButton
            variant={value === 'Non-binary' ? 'solid' : 'outline'}
            title='Non-binary'
            onPress={() => handleSelect('Non-binary')}
          />
        </View>
      </Dialog>
    </>
  );
});
export default ModalSelect;
