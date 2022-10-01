import UserActions from '@components/Actions/UserActions';
import SimpleTable from '@components/Tables/SimpleTable';
import { User } from '@globalTypes/user';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';

interface Props {
  users: User[];
}

const heading = ['Nome completo', 'E-mail', 'Permissão', 'Status', ''];

const UserPage: NextPage<Props> = ({ users }: Props) => {
  const tableHead = heading.map((item: string) => ({ title: item }));

  const data = users.map((user: User) => ({
    name: user.profile?.name,
    email: user.email,
    permission: user.permission?.title,
    blocked: user.isBlocked ? 'Bloqueado' : 'Não bloqueado',
    actions: <UserActions id={user.id} isBlock={user.isBlocked} />,
  }));

  return (
    <TemplateDashboard
      title="Usuários"
      about="Aqui você pode gerenciar os usuários da aplicação."
    >
      <SimpleTable title="users" heading={tableHead} data={data} showIndex />
    </TemplateDashboard>
  );
};

export default UserPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const users: User[] = await axiosService.get('/users', {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    });

    return {
      props: {
        users,
      },
    };
  },
  sessionOptions
);
