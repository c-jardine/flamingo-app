import { Input, InputProps, useTheme, useThemeMode } from '@rneui/themed';
import React from 'react';

const KInput = (props: InputProps) => {
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  return (
    <Input
      selectionColor={theme.colors.primary}
      labelStyle={{
        color: mode === 'light' ? 'black' : 'rgba(255,255,255,0.65)',
      }}
      inputStyle={{
        color: mode === 'light' ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)',
      }}
      {...props}
    />
  );
};
export default KInput;
