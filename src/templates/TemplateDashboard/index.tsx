import { Box } from '@chakra-ui/react';
import Dashboard from '@components/Dashboard/index';
import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
}

const TemplateDashboard: FC<Props> = ({ title, children }: Props) => {
  return (
    <Box id="template-default">
      <Head>
        <title>{`${title} - Learning Sys`}</title>
      </Head>
      <Dashboard>{children}</Dashboard>
    </Box>
  );
};

export default TemplateDashboard;
