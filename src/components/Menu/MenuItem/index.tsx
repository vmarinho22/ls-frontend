import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  id?: string | number;
  icon: ReactNode;
  text: string;
  isExpanded: boolean;
  link: string;
}

const MenuItem: FC<Props> = ({
  icon,
  text,
  isExpanded = false,
  link,
}: Props) => {
  return (
    <Link href={link}>
      <Flex
        id="id"
        align="center"
        gap={0}
        justify="space-evenly"
        cursor="pointer"
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
