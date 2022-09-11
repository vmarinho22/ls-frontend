import { Box, Flex } from '@chakra-ui/react';
import Menu from '@components/Menu';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Dashboard: FC<Props> = ({ children }: Props) => {
  return (
    <main id="dashboard">
      <Flex gap={2}>
        <Menu />
        <Box width="auto">{children}</Box>
      </Flex>
    </main>
  );
};

export default Dashboard;
