import { Box, Container, Flex, ScaleFade } from '@chakra-ui/react';
import Button from '@components/Button';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Wave from 'react-wavify';

const Home: NextPage = () => {
  return (
    <Container maxW="2xl">
      <Head>
        <title>Learning Sys</title>
      </Head>
      <Flex
        width="100%"
        align="center"
        justify="center"
        minHeight="100vh"
        direction="column"
        gap={6}
      >
        <ScaleFade initialScale={0.9} in={true}>
          <Box>Logo aqui</Box>
        </ScaleFade>
        <Link href="/login">
          <a>
            <ScaleFade initialScale={0.9} in={true}>
              <Button value="Clique para Entrar" />
            </ScaleFade>
          </a>
        </Link>
        <Box width="100%" position="absolute" bottom="0">
          <Wave
            style={{ display: 'block' }}
            fill="#1098F7"
            paused={false}
            options={{
              height: 40,
              amplitude: 40,
              speed: 0.15,
              points: 5,
            }}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
