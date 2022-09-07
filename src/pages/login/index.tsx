import {
  Box,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Wave from 'react-wavify';
import Button from '../../components/Button';
import ThemeToggle from '../../components/ThemeToggle';
import axios from '../../services/axios';
import { User } from '../../types/type';
import defaultToastOptions from './../../config/toast/index';

interface Form {
  username: string;
  password: string;
}

interface FormError {
  username: boolean;
  password: boolean;
}

interface FetchResponse {
  user: number;
  access_token: string;
}

const LoginPage: NextPage = () => {
  const [form, setForm] = useState<Form>({ username: '', password: '' });
  const [formError, setFormError] = useState<FormError>({
    username: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const color = useColorModeValue('gray.900', 'gray.100');
  const opacity = useColorModeValue('1', '0.5');
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem('user');

    if (user != null) {
      void router.push('/inicio');
    }
  }, [router]);

  const handleShowPassword = (): void => setShowPassword((prev) => !prev);

  const handleUpdateForm = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handleUpdateFormError = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setFormError((prev) => ({ ...prev, [target.id]: target.value === '' }));
  };

  const handleSendUserToAPI = async (): Promise<FetchResponse> => {
    const data: FetchResponse = await axios.post('/auth/login', form);

    return data;
  };

  const handleValidateUser = async (): Promise<number | null> => {
    const response: FetchResponse = await handleSendUserToAPI();

    if (response.user !== 0) {
      sessionStorage.setItem('token', response.access_token);
      return response.user;
    }

    return null;
  };

  const handleSetUser = async (): Promise<void> => {
    const user: number | null = await handleValidateUser();
    if (user != null) {
      const data: User = await axios.get(`/users/${user}`);
      // TODO: puxar perfil do usuário
      if (data.isBlocked) {
        throw new Error(`User ${user} está bloqueado`);
      }

      sessionStorage.setItem(
        'user',
        JSON.stringify({
          id: user,
          email: data.email,
        })
      );

      void router.push('/inicio');
    }
  };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    void toast.promise(
      handleSetUser,
      {
        pending: 'Entrando...',
        success: 'Bem vindo!',
        error: 'Usuário e/ou senha incorretos',
      },
      defaultToastOptions
    );
  };

  return (
    <Container maxW="6xl">
      <Head>
        <title>Login - Learning Sys</title>
      </Head>
      <Flex mt="3px" direction="row-reverse">
        <ThemeToggle />
      </Flex>
      <Flex align="center" justify="center" width="100%" minHeight="96.9vh">
        <ScaleFade initialScale={0.6} in={true}>
          <VStack align="left">
            <Heading color="blue-sys.100">Aqui você pode fazer Login</Heading>
            <Text color={color} opacity={opacity}>
              Entre conosco
            </Text>
            <br />
            <form>
              <ScaleFade initialScale={0.6} in={true}>
                <VStack spacing={3}>
                  <FormControl isRequired isInvalid={formError.username}>
                    <FormLabel
                      htmlFor="username"
                      color={color}
                      opacity={opacity}
                    >
                      E-mail ou username
                    </FormLabel>
                    <Input
                      id="username"
                      type="text"
                      onChange={handleUpdateForm}
                      onBlur={handleUpdateFormError}
                    />
                    {formError.username && (
                      <FormErrorMessage>
                        O campo usuário não pode ser vazio
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={formError.password}>
                    <FormLabel
                      htmlFor="password"
                      color={color}
                      opacity={opacity}
                    >
                      Senha
                    </FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleUpdateForm}
                        onBlur={handleUpdateFormError}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label="Search database"
                          icon={
                            showPassword ? (
                              <HiOutlineEye />
                            ) : (
                              <HiOutlineEyeOff />
                            )
                          }
                          onMouseDown={handleShowPassword}
                          onMouseUp={handleShowPassword}
                        />
                      </InputRightElement>
                    </InputGroup>
                    {formError.password && (
                      <FormErrorMessage>
                        A senha não pode ser vazia
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <br />
                  <Button
                    value="Entrar"
                    width="100%"
                    click={handleSubmit}
                    isDisabled={Object.values(formError).some((item) => item)}
                  />
                  <Link href="/recuperar-senha">
                    <a target="blank">
                      <Text color={color} opacity={opacity}>
                        Esqueci minha senha
                      </Text>
                    </a>
                  </Link>
                </VStack>
              </ScaleFade>
            </form>
          </VStack>
        </ScaleFade>
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
