import { Button, ButtonProps, useTheme } from '@rneui/themed';

const PrimaryButton = (
  props: ButtonProps & { variant?: 'solid' | 'outline' | 'ghost' }
) => {
  const { theme } = useTheme();

  const btnVariant = props.variant ?? 'solid';
  return (
    <Button
      {...props}
      containerStyle={props.containerStyle}
      buttonStyle={{
        backgroundColor:
          btnVariant === 'solid' ? theme.colors.primary : 'transparent',
        borderWidth: 2,
        borderColor:
          btnVariant !== 'ghost' ? theme.colors.primary : 'transparent',
      }}
      titleStyle={[
        props.titleStyle,
        {
          color:
            btnVariant === 'solid' ? theme.colors.white : theme.colors.primary,
        },
      ]}
    />
  );
};
export default PrimaryButton;
