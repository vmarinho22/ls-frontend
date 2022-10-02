import UserActions from '@components/Actions/UserActions';
import SimpleTable from '@components/Tables/SimpleTable';
import { User } from '@globalTypes/user';
import useTable from '@hooks/useTable';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { useEffect } from 'react';

interface Props {
  users: User[];
}

const heading = ['Nome completo', 'E-mail', 'Permissão', 'Status', ''];

const UserPage: NextPage<Props> = ({ users }: Props) => {
  const { tableData, setTableData } = useTable();

  useEffect(() => {
    setTableData(
      users.map((user: User, index: number) => ({
        name: user.profile?.name,
        email: user.email,
        permission: user.permission?.title,
        blocked: user.isBlocked ? 'Bloqueado' : 'Não bloqueado',
        actions: (
          <UserActions
            userIndex={index}
            id={user.id}
            isBlock={user.isBlocked}
          />
        ),
      }))
    );
  }, [setTableData, users]);

  const tableHead = heading.map((item: string) => ({ title: item }));

  return (
    <TemplateDashboard
      title="Usuários"
      about="Aqui você pode gerenciar os usuários da aplicação."
    >
      <SimpleTable
        title="users"
        heading={tableHead}
        data={tableData}
        showIndex
      />
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
