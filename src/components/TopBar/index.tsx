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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const TopBar: FC<unknown> = () => {
  // TODO: Puxar dados do perfil do usuário ( quando existir)
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    sessionStorage.clear();

    await router.push('/login');
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
              <Avatar size="sm" name="Usuário" />
            </a>
          </Link>
        </Box>
        <Box>
          <Link href="/perfil">
            <a>
              <Text fontSize="sm">Usuário</Text>
              <Text fontSize="10px">Cargo</Text>
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
