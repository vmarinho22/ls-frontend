/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Flex, Switch, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeToggle: FC<any> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex gap={1} align="center">
      <BiSun size="1.5em" />
      <Switch
        colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}
        id="isChecked"
        isChecked={colorMode !== 'light'}
        onChange={toggleColorMode}
      />
      <BiMoon size="1.5em" />
    </Flex>
  );
};

export default ThemeToggle;
