import Dashboard from '@components/Dashboard';
import { GetServerSideProps, NextPage } from 'next';

const UserPage: NextPage = () => {
  return (
    <Dashboard>
      <p>Página de usuários</p>
    </Dashboard>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
