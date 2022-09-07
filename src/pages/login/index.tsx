import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Wave from 'react-wavify';
import Button from '../../components/Button';

interface Form {
  username: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const [form, setForm] = useState<Form>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (): void => setShowPassword((prev) => !prev);

  const handleUpdateForm = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    console.log('enviado', form);
  };

  return (
    <Container maxW="2xl">
      <Head>
        <title>Login - Learning Sys</title>
      </Head>
      <Flex align="center" justify="center" width="100%" minHeight="100vh">
        <VStack align="left">
          <Heading color="blue-sys.100">Aqui você pode fazer Login</Heading>
          <Text color="gray.100" opacity="0.5">
            Entre conosco
          </Text>
          <br />
          <form>
            <VStack spacing={3}>
              <FormControl isRequired>
                <FormLabel htmlFor="username" color="gray.100" opacity="0.5">
                  E-mail ou username
                </FormLabel>
                <Input id="username" type="text" onChange={handleUpdateForm} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password" color="gray.100" opacity="0.5">
                  Senha
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleUpdateForm}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Search database"
                      icon={
                        showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />
                      }
                      onMouseDown={handleShowPassword}
                      onMouseUp={handleShowPassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <br />
              <Button value="Entrar" width="100%" click={handleSubmit} />
              <Link href="/recuperar-senha">
                <a target="blank">
                  <Text color="gray.100" opacity="0.5">
                    Esqueci minha senha
                  </Text>
                </a>
              </Link>
            </VStack>
          </form>
        </VStack>
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

export default LoginPage;
