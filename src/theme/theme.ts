import { createTheme } from '@rneui/themed';
import { Poppins } from '../utils';

export const theme = createTheme({
  lightColors: {
    background: 'white',
    background2: '#ffe1ea',
    primary: '#f82e4b',
  },
  darkColors: {
    background: 'black',
    background2: '#ffe1ea',
    primary: '#f82e4b',
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
        fontSize: 14,
        // padding: 12,
        fontFamily: Poppins.REGULAR,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
        borderRadius: 8,
      },
      errorStyle: {
        display: 'none'
      }
    },
    Text: {
      style: {
        fontSize: 16,
      },
    },
  },
});
