import { createTheme } from '@rneui/themed';
import { Poppins } from '../utils';

export const theme = createTheme({
  lightColors: {
    background: 'white',
    background2: '#ffe1ea',
    primary: '#f82e4b',
    secondary: '#ffe1ea',
  },
  darkColors: {
    background: 'black',
    background2: '#ffe1ea',
    primary: '#f82e4b',
    secondary: '#ffe1ea',
  },
  mode: 'light',
  components: {
    Button: {
      titleStyle: {
        fontFamily: Poppins.REGULAR,
        fontSize: 16,
      },
      buttonStyle: {
        paddingVertical: 12,
        borderRadius: 16,
      },
    },
    Input: {
      labelStyle: {
        fontFamily: Poppins.MEDIUM,
      },
      inputStyle: {
        fontSize: 15,
        // padding: 12,
        fontFamily: Poppins.REGULAR,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
        borderRadius: 8,
      },
      errorStyle: {
        fontFamily: Poppins.REGULAR,
        display: 'none',
        color: 'red',
        fontSize: 12,
      },
    },
    Text: {
      style: { fontSize: 16 },
    },
  },
});
