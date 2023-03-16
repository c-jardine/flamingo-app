import { Button, Dialog, Text, TextProps, useTheme } from '@rneui/themed';
import React from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { HighlightIcon } from '../../../components/icons';
import { useDisclosure } from '../../../hooks';
import { Poppins } from '../../../utils';

const PersonalityTypeSelector = React.forwardRef<
  TextProps,
  ControllerRenderProps<FieldValues, string>
>((props, ref) => {
  const { theme } = useTheme();
  const { value, onChange } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (name: string) => {
    onChange(name);
    onClose();
  };

  const KButton = ({ name }: { name: string }) => {
    return (
      <Button
        containerStyle={{ flex: 1 }}
        buttonStyle={[
          { borderWidth: 2 },
          value === name
            ? { backgroundColor: theme.colors.primary }
            : {
                backgroundColor: theme.colors.white,
                borderColor: 'rgba(0,0,0,0.25)',
              },
        ]}
        titleStyle={[
          { fontSize: 12 },
          value === name
            ? { color: theme.colors.white }
            : {
                color: theme.colors.black,
              },
        ]}
        title={name}
        onPress={() => handleSelect(name)}
      />
    );
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
          backgroundColor='#dbeafe'
          icon={{
            type: 'material-community',
            name: 'head-dots-horizontal-outline',
            color: '#60a5fa',
          }}
        />
        <Text style={{ color: 'rgba(0,0,0,0.5)' }}>
          {value || 'Not selected'}
        </Text>
      </TouchableOpacity>
      <Dialog
        isVisible={isOpen}
        onBackdropPress={onClose}
        overlayStyle={{ borderRadius: 16, width: 350 }}
      >
        <Dialog.Title title='Personality type' />
        <ScrollView>
          <View style={{ gap: 16 }}>
            <View style={{ gap: 8 }}>
              <Text style={{ fontFamily: Poppins.MEDIUM }}>Analyst</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                <KButton name='INTJ' />
                <KButton name='INTP' />
                <KButton name='ENTJ' />
                <KButton name='ENTP' />
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ fontFamily: Poppins.MEDIUM }}>Diplomat</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                <KButton name='INFJ' />
                <KButton name='INFP' />
                <KButton name='ENFJ' />
                <KButton name='ENFP' />
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ fontFamily: Poppins.MEDIUM }}>Sentinel</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                <KButton name='ISTJ' />
                <KButton name='ISFJ' />
                <KButton name='ESTJ' />
                <KButton name='ESFJ' />
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ fontFamily: Poppins.MEDIUM }}>Explorer</Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                <KButton name='ISTP' />
                <KButton name='ISFP' />
                <KButton name='ESTP' />
                <KButton name='ESFP' />
              </View>
            </View>
          </View>
        </ScrollView>
        <Dialog.Actions>
          <Dialog.Button title='Close' />
        </Dialog.Actions>
      </Dialog>
    </>
  );
});
export default PersonalityTypeSelector;
