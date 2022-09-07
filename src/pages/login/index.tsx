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
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Wave from 'react-wavify';
import Button from '../../components/Button';
import ThemeToggle from '../../components/ThemeToggle';

interface Form {
  username: string;
  password: string;
}

interface FormError {
  username: boolean;
  password: boolean;
}

const LoginPage: NextPage = () => {
  const [form, setForm] = useState<Form>({ username: '', password: '' });
  const [formError, setFormError] = useState<FormError>({
    username: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (): void => setShowPassword((prev) => !prev);

  const handleUpdateForm = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handleUpdateFormError = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setFormError((prev) => ({ ...prev, [target.id]: target.value === '' }));
  };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    console.log('enviado', form);
  };

  const color = useColorModeValue('gray.900', 'gray.100');
  const opacity = useColorModeValue('1', '0.5');

  return (
    <Container maxW="6xl">
      <Head>
        <title>Login - Learning Sys</title>
      </Head>
      <Flex mt="3px" direction="row-reverse">
        <ThemeToggle />
      </Flex>
      <Flex align="center" justify="center" width="100%" minHeight="96.9vh">
        <VStack align="left">
          <Heading color="blue-sys.100">Aqui você pode fazer Login</Heading>
          <Text color={color} opacity={opacity}>
            Entre conosco
          </Text>
          <br />
          <form>
            <VStack spacing={3}>
              <FormControl isRequired isInvalid={formError.username}>
                <FormLabel htmlFor="username" color={color} opacity={opacity}>
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
                <FormLabel htmlFor="password" color={color} opacity={opacity}>
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
                        showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />
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
              <Button value="Entrar" width="100%" click={handleSubmit} />
              <Link href="/recuperar-senha">
                <a target="blank">
                  <Text color={color} opacity={opacity}>
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
