import { GetServerSideProps, NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <div>
      <p>Marinho React Component</p>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
