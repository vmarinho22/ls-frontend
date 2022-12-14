import { userState } from '@atoms/user';
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
import defaultToastOptions from '@config/toast';
import { Profile, type User } from '@globalTypes/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import yup from '@services/yup';
import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Wave from 'react-wavify';
import { useSetRecoilState } from 'recoil';
import { useMediaQuery } from 'usehooks-ts';

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
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const handleShowPassword = (): void => setShowPassword((prev) => !prev);

  const handleSendUserToAPI = async (data: Form): Promise<FetchResponse> => {
    const fetchData = await axios.post('/api/login', data);

    return fetchData.data;
  };

  const handleValidateUser = async (data: Form): Promise<number | null> => {
    const response: FetchResponse = await handleSendUserToAPI(data);

    if (response.user !== 0) {
      sessionStorage.setItem('token', response.access_token);
      return response.user;
    }

    return null;
  };

  const handleSetUserInApp = async (data: Form): Promise<void> => {
    const fetchedUser: number | null = await handleValidateUser(data);
    if (fetchedUser != null) {
      const data: User = await axiosService.get(`/users/${fetchedUser}`);
      if (data.isBlocked) {
        throw new Error(`Essa conta está bloqueada. Contate o  administrador`);
      }

      const profile: Profile = await axiosService.get(`/profiles/${data.id}`);

      setUser({
        id: data.id,
        name: profile.name,
        email: data.email,
        profilePicture: profile.userPicture,
        role: profile.role.title,
        isSuperAdmin: data.isSuperAdmin,
        about: profile.about,
        permission: {
          id: data?.permission?.id,
          title: data?.permission?.title,
        },
      });
      toast.success(
        `Bem vindo(a) ${profile.name.split(' ')[0]}`,
        defaultToastOptions
      );
      void router.push('/inicio');
    }
  };

  const onSubmit: SubmitHandler<Form> = async (data: Form): Promise<void> => {
    try {
      await handleSetUserInApp(data);
    } catch (err: any) {
      toast.error(err?.message, defaultToastOptions);
    }
  };

  return (
    <Container maxW="6xl">
      <Head>
        <title>Login - Learning Sys</title>
      </Head>
      <Flex mt="3px" direction="row-reverse">
        <ThemeToggle />
      </Flex>
      <Flex
        direction={['column', 'row']}
        align="center"
        justify="center"
        width="100%"
        minHeight="96.9vh"
      >
        <ScaleFade initialScale={0.9} in={true}>
          <Image
            src="/logo-completa.png"
            alt="Learning Sys - Sistema de gestão de treinamentos"
            width={350}
            height={350}
          />
        </ScaleFade>
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
                  <Link href="/recuperar-senha" target="_blank">
                    <Text color={color} opacity={opacity}>
                      Esqueci minha senha
                    </Text>
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
              height: isMobile ? 80 : 40,
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

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user != null) {
      if ('id' in user) {
        return {
          redirect: {
            permanent: true,
            destination: '/inicio',
          },
        };
      }
    }

    return {
      props: {},
    };
  },
  sessionOptions
);
