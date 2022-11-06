import { Box, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';

const TopBar = dynamic(async () => await import('@components/TopBar'), {
  ssr: false,
});
const Menu = dynamic(async () => await import('@components/Menu'), {
  ssr: false,
});

interface Props {
  children?: ReactNode;
}

const Dashboard: FC<Props> = ({ children }: Props) => {
  return (
    <main id="dashboard">
      <Flex gap={4} width="100%">
        <Menu />
        <Box width="100%">
          <TopBar />
          {children}
        </Box>
      </Flex>
    </main>
  );
};

export default Dashboard;
