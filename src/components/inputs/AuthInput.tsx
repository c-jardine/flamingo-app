import { InputProps } from '@rneui/base';
import { Input, useTheme, useThemeMode } from '@rneui/themed';
import React from 'react';

const AuthInput = (props: InputProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  const _handleFocus = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Input
      selectionColor={theme.colors.primary}
      labelStyle={{
        color: mode === 'light' ? 'black' : 'rgba(255,255,255,0.65)',
      }}
      inputContainerStyle={{
        borderColor: !isSelected
          ? mode === 'light'
            ? 'rgba(0,0,0,0.20)'
            : 'rgba(255,255,255,0.20)'
          : theme.colors.primary,
      }}
      inputStyle={{
        color: mode === 'light' ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)',
      }}
      onFocus={_handleFocus}
      onBlur={_handleFocus}
      {...props}
    />
  );
};
export default AuthInput;
