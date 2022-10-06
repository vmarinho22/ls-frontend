import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import theme from '../theme';

const App: any = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </React.Suspense>
        <ToastContainer />
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
