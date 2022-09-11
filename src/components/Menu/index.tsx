import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { BiHome } from 'react-icons/bi';
import MenuItem from './MenuItem';

const Menu: FC<any> = (props: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const bgColor = useColorModeValue('black-sys', 'white-sys');
  const textColor = useColorModeValue('white-sys', 'black-sys');

  const handleExpandMenu = (): void => setIsExpanded((prev: boolean) => !prev);

  return (
    <Box
      id="menu"
      as="nav"
      width={
        isExpanded
          ? { base: '5vw', md: '8vw', lg: '6vw' }
          : { base: '3vw', md: '4vw', lg: '3vw' }
      }
      transition="0.5s ease-out"
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
      <section id="menu-links">
        <MenuItem
          id="homepage-link"
          text="Home"
          icon={<BiHome size="1.5em" />}
          isExpanded={isExpanded}
          link="/inicio"
        />
      </section>
    </Box>
  );
};

export default Menu;
