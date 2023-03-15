import { CheckBox, TextProps } from '@rneui/themed';
import React from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

const Checkbox = React.forwardRef<
  TextProps,
  ControllerRenderProps<FieldValues, string>
>((props, ref) => {
  const handleCheck = () => {
    props.onChange(!props.value);
  };
  return <CheckBox checked={props.value} onPress={handleCheck} />;
});

export default Checkbox;
