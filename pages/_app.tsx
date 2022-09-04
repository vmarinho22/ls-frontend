import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import '../styles/globals.css';

const App: FunctionComponent<any> = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
