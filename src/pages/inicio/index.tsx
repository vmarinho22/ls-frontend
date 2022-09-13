import TemplateDashboard from '@templates/TemplateDashboard';
import { GetServerSideProps, NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <TemplateDashboard title="Inicio">
      <p>Marinho React Component</p>
    </TemplateDashboard>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
