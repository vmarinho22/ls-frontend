import { toast } from 'react-toastify';
const defaultToastOptions = (): any => {
  let theme;

  if (typeof window !== 'undefined') {
    theme =
      localStorage?.getItem('chakra-ui-color-mode') === 'light'
        ? 'dark'
        : 'light';
  }

  return {
    theme: theme ?? 'light',
    position: toast.POSITION.BOTTOM_CENTER,
  };
};

export default defaultToastOptions();
