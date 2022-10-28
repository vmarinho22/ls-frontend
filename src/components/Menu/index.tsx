import { Box, Center, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { BiHome } from 'react-icons/bi';
import { HiOutlineIdentification, HiOutlineUsers } from 'react-icons/hi';
import { TbLockOpen } from 'react-icons/tb';
import MenuItem from './MenuItem';

const Menu: FC<any> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { asPath } = useRouter();

  const bgColor = useColorModeValue('black-sys.200', 'white-sys.100');
  const textColor = useColorModeValue('white-sys.100', 'black-sys.200');

  const handleExpandMenu = (): void => setIsExpanded((prev: boolean) => !prev);

  return (
    <Box
      id="menu"
      as="nav"
      width={
        isExpanded
          ? ['90%', '50%', '18%']
          : { base: '10%', md: '5%', lg: '4%', xl: '3%' }
      }
      transition="0.3s ease-out"
      padding="1em 3px 0px 3px"
      bg={bgColor}
      color={textColor}
      borderRight="2px solid"
      borderColor="blue-sys.100"
      minHeight="100vh"
      onMouseEnter={handleExpandMenu}
      onMouseLeave={handleExpandMenu}
    >
      <Box id="logo">
        {/* TODO: Colocar logo aqui */}
        <Center>
          <Text>{`L${isExpanded ? 'OGO' : ''}`}</Text>
        </Center>
      </Box>
      <Box mb="3.5rem" />
      <Box id="menu-links" as="section">
        <VStack align="left" gap={2}>
          <MenuItem
            id="menu-home"
            text="Home"
            icon={<BiHome size="1.3em" />}
            isExpanded={isExpanded}
            isCurrent={asPath.includes('/inicio')}
            link="/inicio"
          />
          <MenuItem
            id="menu-users"
            text="Usuários"
            icon={<HiOutlineUsers size="1.3em" />}
            isExpanded={isExpanded}
            isCurrent={asPath.includes('/users')}
            link="/users"
          />
          <MenuItem
            id="menu-permissions"
            text="Permissões"
            icon={<TbLockOpen size="1.3em" />}
            isExpanded={isExpanded}
            isCurrent={asPath.includes('/permissions')}
            link="/permissions"
          />
          <MenuItem
            id="menu-roles"
            text="Cargos"
            icon={<HiOutlineIdentification size="1.3em" />}
            isExpanded={isExpanded}
            isCurrent={asPath.includes('/roles')}
            link="/roles"
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default Menu;
