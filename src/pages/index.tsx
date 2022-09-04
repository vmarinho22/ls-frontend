import { Box, Container, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';

const Home: NextPage = () => {
  return (
    <Container maxWidth="container.xl">
      <Flex
        align="center"
        justify="center"
        minHeight="100vh"
        direction="column"
        gap={6}
      >
        <Box>Logo aqui</Box>
        <Link href="/login">
          <Button value="Entrar" />
        </Link>
      </Flex>
    </Container>
  );
};

export default Home;
