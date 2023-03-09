import { Text } from '@rneui/themed';
import { add, format, sub } from 'date-fns';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDisclosure } from '../../hooks';
import { HighlightIcon } from '../icons';

const DatePicker = (props: ControllerRenderProps<FieldValues, string>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(props)

  const handleConfirm = (date: Date, onChange: (event: Date) => void) => {
    onChange(
      sub(date, {
        days: 1,
      })
    );
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
          backgroundColor='#e0f2fe'
          icon={{
            type: 'ionicon',
            name: 'calendar-outline',
            color: '#38bdf8',
          }}
        />
        <Text style={{ color: 'rgba(0,0,0,0.5)' }}>
          {format(add(new Date(props.value), { days: 1 }), 'MMM. dd, yyyy')}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isOpen}
        mode='date'
        date={add(new Date(props.value), { days: 1 })}
        onConfirm={(date) => handleConfirm(date, props.onChange)}
        onCancel={onClose}
      />
    </>
  );
};
export default DatePicker;
