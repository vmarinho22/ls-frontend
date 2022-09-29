import { Box, Flex } from '@chakra-ui/react';
import Menu from '@components/Menu';
import TopBar from '@components/TopBar';
import { FC, ReactNode } from 'react';

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
