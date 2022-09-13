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
import Button from '@components/Button';
import ThemeToggle from '@components/ThemeToggle';
import defaultToastOptions from '@config/toast/index';
import { type User } from '@globalTypes/user';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '@services/axios';
import yup from '@services/yup';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Wave from 'react-wavify';

interface Form {
  username: string;
  password: string;
}

interface FetchResponse {
  user: number;
  access_token: string;
}

const schema = yup.object({
  username: yup.string().required('O usuário é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

const LoginPage: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
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

  const handleSendUserToAPI = async (data: Form): Promise<FetchResponse> => {
    const fetchData: FetchResponse = await axios.post('/auth/login', data);

    return fetchData;
  };

  const handleValidateUser = async (data: Form): Promise<number | null> => {
    const response: FetchResponse = await handleSendUserToAPI(data);

    if (response.user !== 0) {
      sessionStorage.setItem('token', response.access_token);
      return response.user;
    }

    return null;
  };

  const handleSetUser = async (data: Form): Promise<void> => {
    const user: number | null = await handleValidateUser(data);
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

  const onSubmit: SubmitHandler<Form> = (data: Form): void => {
    void toast.promise(
      async () => await handleSetUser(data),
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ScaleFade initialScale={0.6} in={true}>
                <VStack spacing={3}>
                  <FormControl isRequired isInvalid={'username' in errors}>
                    <FormLabel
                      htmlFor="username"
                      color={color}
                      opacity={opacity}
                    >
                      E-mail ou username
                    </FormLabel>
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      render={({ field }) => <Input {...field} />}
                    />
                    {errors.username != null && (
                      <FormErrorMessage>
                        {errors.username.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={'password' in errors}>
                    <FormLabel
                      htmlFor="password"
                      color={color}
                      opacity={opacity}
                    >
                      Senha
                    </FormLabel>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
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
                      )}
                    />
                    {errors.password != null && (
                      <FormErrorMessage>
                        {errors.password.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <br />
                  <Button
                    value="Entrar"
                    width="100%"
                    isDisabled={Object.values(errors).some((item) => item)}
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
