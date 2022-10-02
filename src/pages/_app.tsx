import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableProvider from 'src/context/tables';
import UserProvider from 'src/context/user';
import '../styles/globals.css';
import theme from '../theme';

const App: any = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <TableProvider>
          <Component {...pageProps} />
        </TableProvider>
      </UserProvider>
      <ToastContainer />
    </ChakraProvider>
  );
};

export default App;
