import TemplateDashboard from '@templates/TemplateDashboard';
import { GetServerSideProps, NextPage } from 'next';

const UserPage: NextPage = () => {
  return (
    <TemplateDashboard title="Usuários">
      <p>Marinho React Component</p>
    </TemplateDashboard>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
