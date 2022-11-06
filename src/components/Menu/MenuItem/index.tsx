import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

interface Props {
  id?: string;
  icon: ReactNode;
  text: string;
  isExpanded: boolean;
  link: string;
  isCurrent: boolean;
}

const MenuItem: FC<Props> = ({
  id = 'menu-item',
  icon,
  text,
  isExpanded = false,
  link = '/',
  isCurrent = false,
}: Props) => {
  return (
    <Link href={link}>
      <Flex
        id={id}
        align="center"
        gap={2}
        justify={isExpanded ? 'flex-start' : 'center'}
        cursor="pointer"
        padding={
          isCurrent
            ? `5px 0px 5px ${isExpanded ? '1rem' : '0px'}`
            : `0px 0px 0px ${isExpanded ? '1rem' : '0px'}`
        }
        fontWeight={600}
        _hover={{
          color: 'blue-sys.200',
        }}
        bg={isCurrent ? '#e9e9e9' : 'transparent'}
        borderRadius={isCurrent ? '10px' : '0'}
        transition="0.5s ease"
      >
        <Box
          padding="3px"
          border="1px solid rgba( 255, 255, 255, 0.18 )"
          borderRadius={10}
          color={isCurrent ? 'white-sys.200' : 'blue-sys.100'}
          bg={isCurrent ? 'blue-sys.100' : 'rgba( 255, 255, 255, 0.25 )'}
          boxShadow={
            isCurrent ? 'none' : '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'
          }
          backdropFilter="blur( 4px )"
        >
          <Link href={link}>{icon ?? <HiDotsHorizontal />}</Link>
        </Box>
        <Box display={isExpanded ? 'flex' : 'none'}>
          <Text opacity={isExpanded ? '100' : '0'}>{text}</Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default MenuItem;
