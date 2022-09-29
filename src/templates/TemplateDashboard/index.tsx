import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Dashboard from '@components/Dashboard/index';
import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  about?: string;
  children?: ReactNode;
}

const TemplateDashboard: FC<Props> = ({ title, about, children }: Props) => {
  const textColor = useColorModeValue('#aaaaaa', '#8a8a8a');

  return (
    <Box id="template-default">
      <Head>
        <title>{`${title} - Learning Sys`}</title>
      </Head>
      <Dashboard>
        <VStack spacing={4} align="left">
          <Heading fontStyle="italic" size={{ xl: 'xl', lg: 'lg', md: 'md' }}>
            {title}
          </Heading>
          <Text color={textColor}>{about}</Text>
          {children}
        </VStack>
      </Dashboard>
    </Box>
  );
};

export default TemplateDashboard;
