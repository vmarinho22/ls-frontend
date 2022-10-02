import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import ThemeToggle from '@components/ThemeToggle';
import defaultToastOptions from '@config/toast/index';
import { UserSession } from '@globalTypes/user';
import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { toast } from 'react-toastify';

interface LogoutResponse {
  ok: boolean;
}

const TopBar: FC<unknown> = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserSession>();

  useEffect(() => {
    const userOfSession: UserSession = JSON.parse(
      sessionStorage.getItem('user') ?? '{}'
    );

    if (userOfSession !== null) {
      setUser(userOfSession);
    }
  }, []);

  const handleRequestLogout = async (): Promise<void> => {
    const response: AxiosResponse<LogoutResponse> = await axios.post(
      '/api/logout',
      {}
    );

    if (response.data.ok) {
      await router.push('/login');
    }
  };

  const handleLogout = async (): Promise<void> => {
    sessionStorage.clear();

    await handleRequestLogout();

    void toast.promise(
      async () => await handleRequestLogout(),
      {
        pending: 'Saindo...',
        success: `Até breve ${user?.name?.split(' ')[0] ?? ''} :)`,
        error: 'Ocorreu um erro interno, tente novamente mais tarde...',
      },
      defaultToastOptions
    );
  };

  return (
    <Flex
      as="header"
      justify="flex-end"
      width="100%"
      padding="5px 15px 0px 0px"
      gap={6}
    >
      <ThemeToggle />
      <Flex gap={2} alignItems="center">
        <Box>
          <Link href="/perfil">
            <a>
              <Avatar
                size="sm"
                name={user?.name ?? 'Usuário'}
                src={user?.profilePicture ?? ''}
              />
            </a>
          </Link>
        </Box>
        <Box>
          <Link href="/perfil">
            <a>
              <Text fontSize="sm">{user?.name ?? 'Usuário'}</Text>
              <Text fontSize="10px">{user?.role ?? 'Cargo'}</Text>
            </a>
          </Link>
        </Box>
        <Box>
          <Menu isLazy>
            <MenuButton
              _hover={{
                color: 'blue-sys.100',
              }}
            >
              <HiChevronDown size="1.1em" />
            </MenuButton>
            <MenuList>
              <Link href="/perfil">
                <a>
                  <MenuItem fontSize="12px">Ver perfil</MenuItem>
                </a>
              </Link>
              <MenuDivider />
              <MenuItem fontSize="12px" onClick={handleLogout}>
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TopBar;
