import TemplateDashboard from '@templates/TemplateDashboard';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <TemplateDashboard title="Inicio">
      <p>Marinho React Component</p>
    </TemplateDashboard>
  );
};

export default HomePage;
