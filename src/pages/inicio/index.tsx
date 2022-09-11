import Dashboard from '@components/Dashboard/index';
import { GetServerSideProps, NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Dashboard>
      <p>Marinho React Component</p>
    </Dashboard>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
