import { ButtonProps } from '@rneui/base';
import { Button, useTheme } from '@rneui/themed';

const PrimaryButton = (
  props: ButtonProps & { variant?: 'solid' | 'outline' | 'ghost' }
) => {
  const { theme } = useTheme();

  const btnVariant = props.variant ?? 'solid';
  return (
    <Button
      containerStyle={{
        flex: 1,
      }}
      buttonStyle={{
        backgroundColor:
          btnVariant === 'solid'
            ? theme.colors.primary
            : 'transparent',
        borderWidth: 2,
        borderColor: btnVariant !== 'ghost' ? theme.colors.primary : 'transparent',
      }}
      titleStyle={{
        color:
          btnVariant === 'solid' ? theme.colors.white : theme.colors.primary,
      }}
      {...props}
    />
  );
};
export default PrimaryButton;
