import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    'blue-sys': { 100: '#1098F7', 200: '#044c7f' },
    'cream-sys': '#B89E97',
    'light-pink-grey-sys': '#DECCCC',
  },
  styles: {
    global: {
      body: {
        bg: mode('#FFFAFB', '#0f0f0f'),
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme(config);

export default theme;
