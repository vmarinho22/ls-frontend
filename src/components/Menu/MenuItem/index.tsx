import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  id?: string;
  icon: ReactNode;
  text: string;
  isExpanded: boolean;
  link: string;
}

const MenuItem: FC<Props> = ({
  id = 'menu-item',
  icon,
  text,
  isExpanded = false,
  link,
}: Props) => {
  return (
    <Link href={link}>
      <Flex
        id={id}
        align="center"
        gap={2}
        justify={isExpanded ? 'flex-start' : 'center'}
        cursor="pointer"
        paddingLeft={isExpanded ? '1rem' : 'auto'}
        fontWeight={600}
        _hover={{
          color: 'blue-sys.200',
        }}
      >
        <Box>{icon}</Box>
        <Box display={isExpanded ? 'flex' : 'none'}>
          <Text opacity={isExpanded ? '100' : '0'}>{text}</Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default MenuItem;
