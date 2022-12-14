import TrainingsHome from '@components/Views/TrainingsHome';
import TemplateDashboard from '@templates/TemplateDashboard';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <TemplateDashboard
      title="Inicio"
      about="Aqui você pode ver um resumo do treinamentos a vencer, últimos treinamento e muitos mais..."
    >
      <br />
      <TrainingsHome />
    </TemplateDashboard>
  );
};

export default HomePage;
